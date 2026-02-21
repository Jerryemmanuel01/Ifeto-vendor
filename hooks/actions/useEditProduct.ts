"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AddProductSchema } from "@/utils/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useUpdateProductMutation,
  useGetCategoriesQuery,
  useGetProductQuery,
} from "@/lib/features/products/productsApi";

export const useEditProduct = (productId: string) => {
  const router = useRouter();

  // Fetch product data
  const {
    data: productData,
    isLoading: isLoadingProduct,
    error: productError,
  } = useGetProductQuery(productId, {
    skip: !productId,
  });

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  // Local state
  const [isDraft, setIsDraft] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      itemName: "",
      description: "",
      baseCost: "",
      weight: "",
      category: "",
      quantity: "",
      storageInstructions: "",
      images: [] as { file?: File; url?: string; error?: string }[],
    },
    validationSchema: AddProductSchema, // Reusing add product schema
    enableReinitialize: true, // Important for populating data after fetch
    validateOnMount: false, // Don't validate immediately on mount to avoid red fields while loading
    onSubmit: async (values) => {
      try {
        setIsUploading(true);

        const currentImages = values.images;

        // Validation check
        const validImages = currentImages.filter(
          (img) => !img.error && (img.file || img.url),
        );

        if (validImages.length === 0) {
          toast.error("Please ensure at least one valid image is present");
          setIsUploading(false);
          return;
        }

        const finalImageUrls: string[] = [];
        const newImagesToUpload = validImages.filter((img) => img.file);
        const existingImages = validImages.filter(
          (img) => !img.file && img.url,
        );

        // Keep existing URLs
        existingImages.forEach((img) => {
          if (img.url) finalImageUrls.push(img.url);
        });

        // Upload new images
        for (const imgWrapper of newImagesToUpload) {
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
          finalImageUrls.push(data.secure_url);
        }

        // Construct payload
        const payload = {
          name: values.itemName,
          description: values.description,
          baseCost: Number(values.baseCost),
          weight: Number(values.weight),
          quantity: Number(values.quantity || 1),
          categoryId: values.category,
          images: finalImageUrls,
          storageInstructions: values.storageInstructions,
          status: isDraft ? "DRAFT" : "PUBLISHED",
        };

        if (!productId) {
          throw new Error("Product ID is missing");
        }

        await updateProduct({
          id: productId,
          body: payload as any, // Casting because Partial<CreateProductRequest> might be strict
        }).unwrap();

        toast.success(
          isDraft ? "Product updated as draft" : "Product updated successfully",
        );
        router.push("/products");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update product");
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    },
  });

  // Populate form when data is fetched
  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      formik.setValues({
        itemName: product.name || "",
        description: product.description || "",
        baseCost: product.baseCost?.toString() || "",
        weight: product.weight?.toString() || "",
        category: product.categoryId || product.category?.id || "",
        quantity: product.quantity?.toString() || "",
        storageInstructions: product.storageInstructions || "",
        images: product.images?.map((url) => ({ url })) || [],
      });
      // Set draft status based on current product status if needed,
      // but usually editing implies we might change status on save.
      // Current logic relies on which button is clicked (Review vs Draft).
    }
  }, [productData]);

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
    productData: productData?.data, // Expose if helpful for UI
    isFetching: isLoadingProduct,
  };
};
