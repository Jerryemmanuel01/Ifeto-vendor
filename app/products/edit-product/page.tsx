"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import danger from "@/assets/svgs/danger-red.svg";
import exportIcon from "@/assets/svgs/export.svg";
import editIcon from "@/assets/svgs/edit.svg";

/* ================= VALIDATION ================= */

const EditProductSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  weight: Yup.string().required("Weight is required"),
  price: Yup.string().required("Price is required"),
  images: Yup.array()
    .min(3, "At least 3 images are required")
    .max(5, "You can upload a maximum of 5 images"),
});

/* ================= IMAGE VALIDATION ================= */

const validateImage = async (file: File): Promise<string | undefined> => {
  if (
    !["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)
  ) {
    return "Unsupported format";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "File too large (max 5MB)";
  }

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  await new Promise((res) => (img.onload = res));

  if (img.width < 800) {
    return "Min width is 800px";
  }
};

/* ================= PAGE ================= */

export default function Page() {
  return (
    <Formik
      initialValues={{
        name: "Yellow Garri",
        weight: "",
        price: "₦1,200",
        images: [] as { file: File; error?: string }[],
      }}
      validationSchema={EditProductSchema}
      onSubmit={(values) => {
        console.log("SUBMIT", values);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="bg-[#FAFAFA] space-y-6 pb-10 flex flex-col px-6 md:px-8">
          {/* ===== Header ===== */}
          <div className="flex md:flex-col gap-2 py-4 shadow-custom2">
            <div className="flex items-center gap-2">
              <Image src={arrowLeft} alt="back" />
              <p className="text-[16px] font-semibold text-[#787878]">back</p>
            </div>

            <h1 className="text-[16px] md:text-[24px] font-semibold text-[#5A5A5A] text-center md:text-left">
              Edit Product
            </h1>
          </div>

          {/* ===== Rejection Notice ===== */}
          <div className="bg-[#E53E3E0A] rounded-lg p-3 border-l-[3px] border-[#E53E3E] flex gap-3">
            <Image src={danger} alt="danger" />
            <div>
              <h5 className="text-[#B3261E] text-[14px] font-semibold">
                Product Rejected
              </h5>
              <p className="text-[14px] text-[#787878]">
                <span className="font-bold">Admin Note:</span> Weight missing
                and product images do not meet quality standards.
              </p>
            </div>
          </div>

          {/* ===== Product Info ===== */}
          <div className="space-y-6">
            {/* Product name */}
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <div className="w-32 h-28 bg-[#EFEEEE] flex items-center justify-center rounded-md">
                <Image
                  src="/images/cabbage.png"
                  alt=""
                  width={90}
                  height={60}
                />
              </div>

              <div className="flex-1">
                <label className="text-[14px] text-[#787878]">
                  Product Name
                </label>
                <div className="flex items-center bg-white h-12 px-4 rounded-md">
                  <Field
                    name="name"
                    className="flex-1 outline-none text-[14px]"
                  />
                  <Image src={editIcon} alt="edit" />
                </div>
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-[12px] text-[#B3261E]"
                />
              </div>
            </div>

            {/* Weight & Price */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-[14px] text-[#787878]">Weight</label>
                <div className="flex items-center bg-white h-12 px-4 rounded-md">
                  <Field
                    name="weight"
                    placeholder="Enter product weight"
                    className="flex-1 outline-none text-[14px]"
                  />
                  <Image src={editIcon} alt="edit" />
                </div>
                <ErrorMessage
                  name="weight"
                  component="p"
                  className="text-[12px] text-[#B3261E]"
                />
              </div>

              <div>
                <label className="text-[14px] text-[#787878]">Price</label>
                <div className="flex items-center bg-white h-12 px-4 rounded-md">
                  <Field
                    name="price"
                    className="flex-1 outline-none text-[14px]"
                  />
                  <Image src={editIcon} alt="edit" />
                </div>
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-[12px] text-[#B3261E]"
                />
              </div>
            </div>

            {/* ===== IMAGE UPLOAD (YOUR EXACT UI) ===== */}
            <div className="flex flex-col gap-2">
              <input
                id="imageUpload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                multiple
                hidden
                onChange={async (event) => {
                  const MAX_IMAGES = 5;

                  const remainingSlots = MAX_IMAGES - values.images.length;

                  if (remainingSlots <= 0) {
                    event.currentTarget.value = "";
                    return;
                  }

                  const files = Array.from(
                    event.currentTarget.files || [],
                  ).slice(0, remainingSlots);

                  const validated = await Promise.all(
                    files.map(async (file) => ({
                      file,
                      error: await validateImage(file),
                    })),
                  );

                  setFieldValue("images", [...values.images, ...validated]);

                  // 🔑 Reset input so same file can be re-selected later
                  event.currentTarget.value = "";
                }}
              />

              <label className="text-[14px] leading-5">
                Product Images <span className="text-[#B3261E]">*</span>
              </label>

              {/* ===== EMPTY STATE (FULL WIDTH) ===== */}
              {values.images.length === 0 && (
                <div
                  onClick={() =>
                    document.getElementById("imageUpload")?.click()
                  }
                  className={`border border-dashed rounded-[8px] p-6 text-center cursor-pointer
        ${
          touched.images && errors.images
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
              {values.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {/* Images */}
                  {values.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative group md:h-[326px] h-[101px] rounded-[8px] overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(img.file)}
                        alt="preview"
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          const updated = values.images.filter(
                            (_, i) => i !== index,
                          );
                          setFieldValue("images", updated);
                        }}
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
                  {values.images.length < 5 && (
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
    transition-colors md:h-[326px] h-[101px]

    ${touched.images && errors.images ? "border-[#B3261E]" : "border-[#CFCFCF]"}
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
          </div>

          {/* ===== Actions ===== */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="md:flex-1 h-12 bg-[#27AE60] text-white rounded-md font-semibold"
            >
              Resubmit for Review
            </button>

            <button
              type="button"
              className="md:flex-1 h-12 border border-[#27AE60] text-[#27AE60] rounded-md font-semibold"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
