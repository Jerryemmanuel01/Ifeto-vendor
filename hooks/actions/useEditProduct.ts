"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { AddProductSchema } from "@/utils/schema"; // Reuse schema or create new UpdateProductSchema if needed
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useUpdateProductMutation,
  useGetCategoriesQuery,
  useGetProductQuery,
} from "@/lib/features/products/productsApi";

export const useEditProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: productData, isLoading: isLoadingProduct } = useGetProductQuery(
    id as string,
    { skip: !id },
  );

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const [isDraft, setIsDraft] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      itemName: productData?.data?.name || "",
      description: productData?.data?.description || "",
      baseCost: productData?.data?.baseCost || "",
      weight: productData?.data?.weight || "",
      category: productData?.data?.categoryId || "",
      quantity: productData?.data?.quantity || "",
      storageInstructions: productData?.data?.storageInstructions || "",
      // Existing images are strings, new uploads are Files. We need to handle both.
      // For initial values, we can map existing URLs to a structure formik expects
      images: (productData?.data?.images || []).map((url) => ({
        url,
        file: null, // No file object for existing images
      })) as { file: File | null; error?: string; url?: string }[],
    },
    validationSchema: AddProductSchema, // Reuse strictly or adapt
    validateOnMount: true,
    onSubmit: async (values) => {
      if (!id) return;

      try {
        setIsUploading(true);

        // Separate existing images from new ones
        const existingImageUrls = values.images
          .filter((img) => img.url && !img.file)
          .map((img) => img.url as string);

        const newImages = values.images.filter((img) => img.file && !img.error);
        const newImageUrls: string[] = [];

        // Upload new images
        for (const imgWrapper of newImages) {
          if (!imgWrapper.file) continue;

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
          newImageUrls.push(data.secure_url);
        }

        const finalImages = [...existingImageUrls, ...newImageUrls];

        if (finalImages.length === 0) {
          toast.error("Please ensure at least one valid image is present");
          setIsUploading(false);
          return;
        }

        const payload = {
          name: values.itemName,
          description: values.description,
          baseCost: Number(values.baseCost),
          weight: Number(values.weight),
          quantity: Number(values.quantity || 1),
          categoryId: values.category,
          images: finalImages,
          storageInstructions: values.storageInstructions,
          status: isDraft ? "DRAFT" : "PUBLISHED",
        };

        await updateProduct({ id, body: payload as any }).unwrap();

        toast.success("Product updated successfully");
        router.push("/products");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update product");
        console.error(error);
      } finally {
        setIsUploading(false);
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
    isLoading: isUploading || isUpdating || isLoadingProduct,
    isLoadingCategories,
    categories: categoriesData?.data || [],
    handleImageUpload,
    removeImage,
    handleSubmitDraft,
    handleSubmitReview,
    isProductLoaded: !!productData,
  };
};
