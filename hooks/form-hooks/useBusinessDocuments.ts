import { useState } from "react";
import { useUpdateBusinessDocumentsMutation } from "@/lib/features/auth/authApi";
import { useGetProfileQuery } from "@/lib/features/profile/profileApi";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";

export interface FileState {
  governmentId: File | null;
  cacDocument: File | null;
  proofOfAddress: File | null;
  passportPhoto: File | null;
}

export const useBusinessDocuments = () => {
  const [updateBusinessDocuments, { isLoading: isSubmitting }] =
    useUpdateBusinessDocumentsMutation();
  const { refetch } = useGetProfileQuery();
  const [isUploading, setIsUploading] = useState(false);
  const [cachedUrls, setCachedUrls] = useState<Record<string, string>>({});

  const [files, setFiles] = useState<FileState>({
    governmentId: null,
    cacDocument: null,
    proofOfAddress: null,
    passportPhoto: null,
  });

  const isLoading = isUploading || isSubmitting;
  const isFormValid =
    files.governmentId && files.cacDocument && files.proofOfAddress && files.passportPhoto;

  const handleFileChange = (key: keyof FileState, file: File | undefined) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showErrorToast("File size exceeds 5MB limit");
        return;
      }
      setFiles((prev) => ({ ...prev, [key]: file }));
      setCachedUrls((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const removeFile = (key: keyof FileState) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
    setCachedUrls((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsUploading(true);
    try {
      const uploadPromises = [];
      const keys: (keyof FileState)[] = [
        "governmentId",
        "cacDocument",
        "proofOfAddress",
        "passportPhoto",
      ];
      const urls: Record<string, string> = { ...cachedUrls };

      for (const key of keys) {
        const file = files[key];
        if (file && !urls[key]) {
          uploadPromises.push(
            uploadToCloudinary(file).then((url) => {
              urls[key] = url;
            }),
          );
        }
      }

      await Promise.all(uploadPromises);
      setCachedUrls(urls);

      const payload = {
        governmentIdUrl: urls.governmentId,
        cacUrl: urls.cacDocument,
        proofOfAddressUrl: urls.proofOfAddress,
        passportPhotoUrl: urls.passportPhoto,
      };

      await updateBusinessDocuments(payload).unwrap();
      showSuccessToast("Documents uploaded successfully!");
      setCachedUrls({});
      refetch();
    } catch (error: any) {
      showErrorToast(error?.message || "Failed to upload documents");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    files,
    isLoading,
    isFormValid,
    handleFileChange,
    removeFile,
    handleSubmit,
  };
};
