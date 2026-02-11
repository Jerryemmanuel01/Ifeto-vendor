"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { AddProductSchema } from "@/utils/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "@/lib/features/products/productsApi";

export const useAddProduct = () => {
  const router = useRouter();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation(); // Renamed isLoading to isCreating
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const [isDraft, setIsDraft] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // New local state

  const formik = useFormik({
    initialValues: {
      itemName: "",
      description: "",
      baseCost: "",
      weight: "",
      category: "", // This will store the category ID
      quantity: "",
      storageInstructions: "",
      images: [] as { file: File; error?: string; url?: string }[],
    },
    validationSchema: AddProductSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        setIsUploading(true); // Start loading

        // Image upload logic
        const uploadedImageUrls: string[] = [];
        const validImages = values.images.filter(
          (img) => !img.error && img.file,
        );

        if (validImages.length === 0) {
          toast.error("Please upload at least one valid image");
          setIsUploading(false); // Stop loading if validation fails
          return;
        }

        // Upload images
        for (const imgWrapper of validImages) {
          const formData = new FormData();
          formData.append("file", imgWrapper.file);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
              "ifeto_vendor_preset",
          );
          formData.append("folder", "ifeto/products");

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (!response.ok) {
            throw new Error(`Failed to upload image: ${imgWrapper.file.name}`);
          }

          const data = await response.json();
          uploadedImageUrls.push(data.secure_url);
        }

        // Construct payload
        const payload = {
          name: values.itemName,
          description: values.description,
          baseCost: Number(values.baseCost),
          weight: Number(values.weight),
          quantity: Number(values.quantity || 1),
          categoryId: values.category,
          images: uploadedImageUrls,
          storageInstructions: values.storageInstructions,
          status: isDraft ? "DRAFT" : "PUBLISHED",
        };

        await createProduct(payload as any).unwrap();

        toast.success(
          isDraft ? "Product saved as draft" : "Product submitted successfully",
        );
        router.push("/products");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create product");
        console.error(error);
      } finally {
        setIsUploading(false); // Ensure loading stops (though redirect might happen first on success)
      }
    },
  });

  const validateImage = async (file: File): Promise<string | undefined> => {
    if (
      !["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
        file.type,
      )
    ) {
      return "Unsupported format";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "Each image must be less than 5MB";
    }

    const img = new window.Image();
    img.src = URL.createObjectURL(file);

    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });

    if (img.width < 600) {
      return "Min width is 600px";
    }
  };

  const handleImageUpload = async (fileList: FileList | null) => {
    if (!fileList) return;

    const MAX_IMAGES = 5;
    const remainingSlots = MAX_IMAGES - formik.values.images.length;

    if (remainingSlots <= 0) return;

    const files = Array.from(fileList).slice(0, remainingSlots);

    const validated = await Promise.all(
      files.map(async (file) => ({
        file,
        error: await validateImage(file),
      })),
    );

    formik.setFieldValue("images", [...formik.values.images, ...validated]);
  };

  const removeImage = (index: number) => {
    const updated = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", updated);
  };

  const handleSubmitDraft = () => {
    setIsDraft(true);
    formik.handleSubmit();
  };

  const handleSubmitReview = () => {
    setIsDraft(false);
    formik.handleSubmit();
  };

  return {
    formik,
    isLoading: isUploading || isCreating, // Combined loading state
    isLoadingCategories,
    categories: categoriesData?.data || [],
    handleImageUpload,
    removeImage,
    handleSubmitDraft,
    handleSubmitReview,
  };
};
