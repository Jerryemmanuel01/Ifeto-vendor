"use client";

import Image from "next/image";
import { Form, Field, ErrorMessage, FormikProvider } from "formik";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import exportIcon from "@/assets/svgs/export.svg";
import { useEditProduct } from "@/hooks/actions/useEditProduct";
import { CustomSelect } from "@/components/general/CustomSelect";
import { useRouter } from "next/navigation";
import { formatNumberWithCommas } from "@/utils/utils";

export default function Page() {
  const router = useRouter();
  const {
    formik,
    isLoading,
    isLoadingCategories,
    categories,
    handleImageUpload,
    removeImage,
    handleSubmitReview,
    isProductLoaded,
  } = useEditProduct();

  if (isLoading && !isProductLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-[#27AE60]" />
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] space-y-6 min-h-screen h-full flex flex-col">
      <div className="flex md:flex-col gap-2 md:py-6 py-3 md:px-8 px-6 shadow-custom2 flex-row">
        <div
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer w-fit"
        >
          <Image src={arrowLeft} alt="arrow-back" />
          <p className="text-[16px] leading-6 font-semibold text-[#787878]">
            back
          </p>
        </div>

        <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#5A5A5A] font-semibold md:w-full md:text-start w-full text-center">
          Edit Product
        </h1>
      </div>

      <div className="w-full h-full">
        <FormikProvider value={formik}>
          <Form
            className="md:px-8 px-6 bg-[#FFFFFF] md:py-6 py-4 space-y-4"
            onSubmit={formik.handleSubmit}
          >
            {/* Item Name */}
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

            {/* Description */}
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

            {/* Base Cost & Quantity */}
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

            {/* Weight & Category */}
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
                label=""
                name="category"
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                  image: cat.image,
                }))}
                value={formik.values.category}
                onChange={(name: string, value: string | number) =>
                  formik.setFieldValue(name, value)
                }
                placeholder={
                  isLoadingCategories
                    ? "Loading categories..."
                    : "Select a category"
                }
                disabled={isLoadingCategories}
                error={
                  formik.touched.category &&
                  typeof formik.errors.category === "string"
                    ? formik.errors.category
                    : undefined
                }
              />

              <ErrorMessage
                name="category"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            {/* Images */}
            <div className="flex flex-col gap-2">
              <input
                id="imageUpload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                multiple
                hidden
                onChange={(e) => handleImageUpload(e.target.files)}
              />

              <label className="text-[14px] leading-5">
                Product Images <span className="text-[#B3261E]">*</span>
              </label>

              {formik.values.images.length === 0 && (
                <div
                  onClick={() =>
                    document.getElementById("imageUpload")?.click()
                  }
                  className={`border border-dashed rounded-[8px] p-6 text-center cursor-pointer transition-colors ${
                    formik.touched.images && formik.errors.images
                      ? "border-[#B3261E]"
                      : "border-[#CFCFCF]"
                  }`}
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
                      Click to upload images (minimum 1 required)
                    </p>

                    <p className="text-[12px]">
                      1–5 images, min 600px width, max 5MB each
                    </p>
                  </div>
                </div>
              )}

              {formik.values.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {formik.values.images.map((img: any, index: number) => (
                    <div
                      key={index}
                      className="relative group md:h-[326px] h-[101px] rounded-[8px] overflow-hidden bg-gray-100"
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

                  {formik.values.images.length < 5 && (
                    <div
                      onClick={() =>
                        document.getElementById("imageUpload")?.click()
                      }
                      className={`
                        w-full aspect-[4/3] sm:aspect-[1/1] border border-dashed rounded-[8px]
                        flex flex-col items-center justify-center gap-1 sm:gap-2
                        cursor-pointer text-center transition-colors md:h-[326px] h-[101px]
                        ${
                          formik.touched.images && formik.errors.images
                            ? "border-[#B3261E]"
                            : "border-[#CFCFCF]"
                        }
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

            {/* Storage Instructions */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] leading-5 text-[#5A5A5A]">
                Storage Instructions (Optional)
              </label>

              <Field
                as="textarea"
                name="storageInstructions"
                rows={4}
                placeholder="e.g., Store in a cool, dry place"
                className="text-[14px] leading-5 placeholder:text-[#CFCFCF] w-full px-4 py-3 rounded-[6px] resize-none border border-[#CFCFCF]"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => handleSubmitReview()}
                disabled={isLoading}
                className={`px-5 h-12 rounded-[6px] text-[18px] leading-8 font-semibold w-full cursor-pointer flex items-center justify-center gap-2 transition-colors
                  ${
                    formik.isValid
                      ? "bg-[#27AE60] text-white hover:bg-[#219653]"
                      : "bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed"
                  }
                `}
              >
                {isLoading && (
                  <Loader2 className="w-5 h-5 animate-spin text-current" />
                )}
                Update Product
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="md:flex-1 h-12 border border-[#27AE60] text-[#27AE60] rounded-md font-semibold"
              >
                Cancel
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
}
