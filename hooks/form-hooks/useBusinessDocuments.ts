import { useState } from "react";
import { useUpdateBusinessDocumentsMutation } from "@/lib/features/auth/authApi";
import { useGetProfileQuery } from "@/lib/features/profile/profileApi";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";

export interface FileState {
  governmentId: File | null;
  cacDocument: File | null;
  proofOfAddress: File | null;
}

export const useBusinessDocuments = () => {
  const [updateBusinessDocuments, { isLoading: isSubmitting }] =
    useUpdateBusinessDocumentsMutation();
  const { refetch } = useGetProfileQuery();
  const [isUploading, setIsUploading] = useState(false);

  const [files, setFiles] = useState<FileState>({
    governmentId: null,
    cacDocument: null,
    proofOfAddress: null,
  });

  const isLoading = isUploading || isSubmitting;
  const isFormValid =
    files.governmentId && files.cacDocument && files.proofOfAddress;

  const handleFileChange = (key: keyof FileState, file: File | undefined) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showErrorToast("File size exceeds 5MB limit");
        return;
      }
      setFiles((prev) => ({ ...prev, [key]: file }));
    }
  };

  const removeFile = (key: keyof FileState) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
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
      ];
      const urls: Record<string, string> = {};

      for (const key of keys) {
        const file = files[key];
        if (file) {
          uploadPromises.push(
            uploadToCloudinary(file).then((url) => {
              urls[key] = url;
            }),
          );
        }
      }

      await Promise.all(uploadPromises);

      const payload = {
        governmentIdUrl: urls.governmentId,
        cacUrl: urls.cacDocument,
        proofOfAddressUrl: urls.proofOfAddress,
      };

      await updateBusinessDocuments(payload).unwrap();
      showSuccessToast("Documents uploaded successfully!");
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
