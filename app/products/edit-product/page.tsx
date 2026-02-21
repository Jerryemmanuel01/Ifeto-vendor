"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense, useEffect, useState } from "react";
import { Form, Field, ErrorMessage, FormikProvider } from "formik";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import exportIcon from "@/assets/svgs/export.svg";
import Image from "next/image";
import Link from "next/link";
import { CustomSelect } from "@/components/general/CustomSelect";
import { useSearchParams } from "next/navigation";
import { useEditProduct } from "@/hooks/actions/useEditProduct";
import Spinner from "@/components/loaders/Spinner";
import { Loader2, TriangleAlert } from "lucide-react";
import { formatNumberWithCommas } from "@/utils/utils";

function EditProductContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || "";

  const {
    formik,
    isLoading,
    isLoadingCategories,
    categories,
    handleImageUpload,
    removeImage,
    handleSubmitDraft,
    handleSubmitReview,
    isFetching,
    productData,
  } = useEditProduct(productId);

  if (isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!productId) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">Product ID not found</p>
        <Link href="/products" className="text-primary hover:underline">
          Go back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] space-y-6 min-h-screen h-full flex flex-col">
      {/* Header code ... */}
      <div className="flex md:flex-col gap-2 md:py-6 py-3 md:px-8 px-6 shadow-custom2 flex-row">
        <Link
          href="/products"
          className="flex items-center gap-2 cursor-pointer w-fit"
        >
          <Image src={arrowLeft} alt="arrow-back" />
          <p className="text-[16px] leading-6 font-semibold text-[#787878]">
            back
          </p>
        </Link>

        <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#5A5A5A] font-semibold md:w-full md:text-start w-full text-center">
          Edit Product
        </h1>
      </div>

      <div className="w-full h-full">
        {productData?.approvalStatus === "REJECTED" && (
          <div className="md:mx-8 mx-6 mb-4 p-4 bg-[#FEF3F2] border border-[#FECDCA] rounded-[8px] flex items-start gap-3">
            {/* <Image src={danger} alt="danger" className="w-5 h-5 mt-0.5" /> */}
            <TriangleAlert className="text-[#B42318]"/>
            <div>
              <h3 className="text-[#B42318] font-semibold text-[14px] leading-5">
                Product Rejected
              </h3>
              <p className="text-[#B42318] text-[14px] leading-5 mt-1">
                <span className="font-semibold">Admin Note:</span>{" "}
                {productData.rejectionReason || "No reason provided."}
              </p>
            </div>
          </div>
        )}

        <FormikProvider value={formik}>
          <Form
            className="md:px-8 px-6 bg-[#FFFFFF] md:py-6 py-4 space-y-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label className="text-[14px] leading-5">
                Item Name <span className="text-[#B3261E]">*</span>
              </label>

              <Field
                name="itemName"
                placeholder="e.g., Organic Tomatoes"
                className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-12 w-full px-4 rounded-[6px] border ${
                  formik.touched.itemName && formik.errors.itemName
                    ? "border-[#B3261E]"
                    : "border-[#CFCFCF]"
                }`}
              />

              <ErrorMessage
                name="itemName"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[14px] leading-5">
                Description <span className="text-[#B3261E]">*</span>
              </label>

              <Field
                as="textarea"
                name="description"
                rows={4}
                maxLength={500}
                placeholder="Describe your product in detail..."
                className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] w-full px-4 py-3 rounded-[6px] resize-none border ${
                  formik.touched.description && formik.errors.description
                    ? "border-[#B3261E]"
                    : "border-[#CFCFCF]"
                }`}
              />

              <div className="flex items-center justify-between text-[14px] leading-5 text-[#667185]">
                <p>Rich text, maximum 500 characters</p>
                <p>{formik.values.description.length}/500</p>
              </div>

              <ErrorMessage
                name="description"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[14px] leading-5">
                  Base Cost (₦) <span className="text-[#B3261E]">*</span>
                </label>

                <Field name="baseCost">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="text"
                      inputMode="decimal"
                      placeholder="e.g., 2,500.00"
                      className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-12 w-full pl-4 pr-4 rounded-[6px] border ${
                        formik.touched.baseCost && formik.errors.baseCost
                          ? "border-[#B3261E]"
                          : "border-[#CFCFCF]"
                      }`}
                      value={formatNumberWithCommas(field.value)}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Remove commas first
                        value = value.replace(/,/g, "");

                        // Remove non-numeric except dot
                        value = value.replace(/[^0-9.]/g, "");

                        // Allow only one decimal point
                        const parts = value.split(".");
                        if (parts.length > 2) {
                          value = parts[0] + "." + parts[1];
                        }

                        // Limit to 2 decimal places
                        if (parts[1]?.length > 2) {
                          value = parts[0] + "." + parts[1].slice(0, 2);
                        }

                        formik.setFieldValue("baseCost", value);
                      }}
                    />
                  )}
                </Field>

                <ErrorMessage
                  name="baseCost"
                  component="p"
                  className="text-[12px] text-[#B3261E]"
                />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[14px] leading-5">
                  Quantity <span className="text-[#B3261E]">*</span>
                </label>

                <Field name="quantity">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g., 100"
                      className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-12 w-full px-4 rounded-[6px] border ${
                        formik.touched.quantity && formik.errors.quantity
                          ? "border-[#B3261E]"
                          : "border-[#CFCFCF]"
                      }`}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Remove everything except numbers
                        value = value.replace(/[^0-9]/g, "");

                        formik.setFieldValue("quantity", value);
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          formik.setFieldValue("quantity", "1");
                        }
                      }}
                    />
                  )}
                </Field>

                <ErrorMessage
                  name="quantity"
                  component="p"
                  className="text-[12px] text-[#B3261E]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[14px] leading-5">
                Weight (kg) <span className="text-[#B3261E]">*</span>
              </label>

              <Field name="weight">
                {({ field }: any) => (
                  <input
                    {...field}
                    type="text"
                    inputMode="decimal"
                    placeholder="e.g., 1.5"
                    className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-12 w-full px-4 rounded-[6px] border ${
                      formik.touched.weight && formik.errors.weight
                        ? "border-[#B3261E]"
                        : "border-[#CFCFCF]"
                    }`}
                    onChange={(e) => {
                      let value = e.target.value;

                      // Remove everything except numbers and dot
                      value = value.replace(/[^0-9.]/g, "");

                      // Allow only one decimal point
                      const parts = value.split(".");
                      if (parts.length > 2) {
                        value = parts[0] + "." + parts[1];
                      }

                      // Optional: limit to 2 decimal places
                      if (parts[1]?.length > 2) {
                        value = parts[0] + "." + parts[1].slice(0, 2);
                      }

                      formik.setFieldValue("weight", value);
                    }}
                  />
                )}
              </Field>

              <p className="flex items-center justify-between text-[14px] leading-5 text-[#667185]">
                Only numerical values are allowed
              </p>

              <ErrorMessage
                name="weight"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[14px] leading-5">
                Category <span className="text-[#B3261E]">*</span>
              </label>

              <CustomSelect
                name="category"
                label=""
                value={formik.values.category}
                onChange={(name: string, value: string | number) =>
                  formik.setFieldValue(name, value)
                }
                options={categories.map((cat: any) => ({
                  label: cat.name,
                  value: cat.id,
                  image: cat.image,
                }))}
                placeholder={
                  isLoadingCategories
                    ? "Loading categories..."
                    : "Select a category"
                }
                disabled={isLoadingCategories}
                error={formik.errors.category as string | undefined}
                touched={formik.touched.category}
                className="h-12"
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                id="imageUpload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                multiple
                hidden
                onChange={(e) => handleImageUpload(e.currentTarget.files)}
              />

              <label className="text-[14px] leading-5">
                Product Images <span className="text-[#B3261E]">*</span>
              </label>

              {/* ===== EMPTY STATE (FULL WIDTH) ===== */}
              {formik.values.images.length === 0 && (
                <div
                  onClick={() =>
                    document.getElementById("imageUpload")?.click()
                  }
                  className={`border border-dashed rounded-[8px] p-6 text-center cursor-pointer
        ${
          formik.touched.images && formik.errors.images
            ? "border-[#B3261E]"
            : "border-[#CFCFCF]"
        }
      `}
                >
                  <div className="flex flex-col items-center gap-2 text-[#667185]">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M12 16V8M8 12h8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-[14px]">
                      Click to upload images (minimum 3 required)
                    </p>

                    <p className="text-[12px]">
                      1–5 images, min 600px width, max 5MB each
                    </p>
                  </div>
                </div>
              )}

              {/* ===== GRID STATE ===== */}
              {formik.values.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {/* Images */}
                  {formik.values.images.map((img: any, index: number) => (
                    <div
                      key={index}
                      className="relative group md:h-[326px] h-[101px] rounded-[8px] overflow-hidden"
                    >
                      <img
                        src={img.file ? URL.createObjectURL(img.file) : img.url}
                        alt="preview"
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 hidden group-hover:flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white text-xs"
                      >
                        ✕
                      </button>

                      {img.error && (
                        <div className="absolute bottom-0 left-0 right-0 bg-[#B3261E]/90 text-white text-[10px] px-2 py-1">
                          {img.error}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add more tile */}
                  {formik.values.images.length < 5 && (
                    <div
                      onClick={() =>
                        document.getElementById("imageUpload")?.click()
                      }
                      className={`
    w-full
    aspect-[4/3] sm:aspect-[1/1]
    border border-dashed rounded-[8px]
    flex flex-col items-center justify-center
    gap-1 sm:gap-2
    cursor-pointer text-center
    transition-colors

    ${formik.touched.images && formik.errors.images ? "border-[#B3261E]" : "border-[#CFCFCF]"}
  `}
                    >
                      <Image
                        src={exportIcon}
                        alt="export-icon"
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                      />

                      <p className="text-[13px] sm:text-[14px] md:text-[18px] leading-6 font-medium text-[#667185]">
                        Add More
                      </p>

                      <p className="text-[10px] sm:text-[11px] md:text-[12px] leading-4 text-[#98A2B3] px-2">
                        2 images, min 800px width, max 5MB each
                      </p>
                    </div>
                  )}
                </div>
              )}

              <ErrorMessage
                name="images"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[14px] leading-5">
                Storage Instructions
              </label>

              <Field
                as="textarea"
                name="storageInstructions"
                rows={4}
                maxLength={500}
                placeholder="e.g., Store in a cool, dry place."
                className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] w-full px-4 py-3 rounded-[6px] resize-none border ${
                  formik.touched.storageInstructions &&
                  formik.errors.storageInstructions
                    ? "border-[#B3261E]"
                    : "border-[#CFCFCF]"
                }`}
              />

              <ErrorMessage
                name="storageInstructions"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 py-0 md:py-6">
              <button
                type="button"
                onClick={() => handleSubmitReview()}
                disabled={isLoading}
                className={`px-5 h-12 rounded-[6px] text-[18px] leading-8 font-semibold w-full cursor-pointer flex items-center justify-center gap-2 transition-colors
                  ${
                    formik.isValid
                      ? "bg-[#27AE60] text-white hover:bg-[#219151]"
                      : "bg-[#E0E0E0] text-[#828282] cursor-not-allowed"
                  }
                `}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : productData?.approvalStatus === "REJECTED" ? (
                  "Resubmit for Review"
                ) : (
                  "Update Product"
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSubmitDraft()}
                disabled={isLoading}
                className="px-5 h-12 border border-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semibold w-full cursor-pointer disabled:opacity-50"
              >
                Save as Draft
              </button>

              <Link
                href="/products"
                className="flex items-center justify-center px-5 md:px-16.75 h-12 rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semibold w-full md:w-fit cursor-pointer"
              >
                Cancel
              </Link>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <EditProductContent />
    </Suspense>
  );
}
