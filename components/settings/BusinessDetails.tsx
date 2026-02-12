import { BusinessSchema } from "@/utils/schema";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";

export default function BusinessDetails() {
  const formik = useFormik({
    initialValues: {
      businessName: "",
      contactPerson: "",
      emailAddress: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "Nigeria",
    },
    validationSchema: BusinessSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="bg-[#FFFFFF] shadow-custom2 rounded-2xl p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
          Business Information
        </h1>
        <p className="text-[14px] leading-5 text-[#787878]">
          Manage your business details as they appear on IFETO
        </p>
      </div>

      <FormikProvider value={formik}>
        <Form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-[14px] leading-5">
              Business Name <span className="text-[#B3261E]">*</span>
            </label>

            <Field
              name="businessName"
              placeholder="Halimah Enterprise"
              className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                formik.touched.businessName && formik.errors.businessName
                  ? "border-[#B3261E]"
                  : "border-[#CFCFCF]"
              }`}
            />

            <ErrorMessage
              name="businessName"
              component="p"
              className="text-[12px] text-[#B3261E]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[14px] leading-5">
              Contact Person <span className="text-[#B3261E]">*</span>
            </label>

            <Field
              name="contactPerson"
              placeholder="Halimah Enterprise"
              className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                formik.touched.contactPerson && formik.errors.contactPerson
                  ? "border-[#B3261E]"
                  : "border-[#CFCFCF]"
              }`}
            />

            <ErrorMessage
              name="contactPerson"
              component="p"
              className="text-[12px] text-[#B3261E]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[14px] leading-5">
              Email Address <span className="text-[#B3261E]">*</span>
            </label>

            <Field
              name="emailAddress"
              placeholder="Halimahenterprise@gmail.com"
              className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                formik.touched.emailAddress && formik.errors.emailAddress
                  ? "border-[#B3261E]"
                  : "border-[#CFCFCF]"
              }`}
            />

            <ErrorMessage
              name="emailAddress"
              component="p"
              className="text-[12px] text-[#B3261E]"
            />
          </div>

          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="phone">
              Phone Number
            </label>

            <PhoneInput
              placeholder="1234567890"
              country={"ng"}
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              onBlur={() => formik.setFieldTouched("phone", true)}
              containerStyle={{
                width: "100%",
                height: "56px",
              }}
              inputStyle={{
                width: "100%",
                outline: "none",
                height: "56px",
                fontSize: "14px",
              }}
              buttonStyle={{
                background: "transparent",
              }}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-[16px] leading-6 font-semibold text-[#5A5A5A]">
              Pickup Address (Admin Collection Point)
            </p>

            <div className="flex flex-col gap-1">
              <Field
                name="street"
                placeholder="15 Agricultural Road"
                className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                  formik.touched.street && formik.errors.street
                    ? "border-[#B3261E]"
                    : "border-[#CFCFCF]"
                }`}
              />

              <ErrorMessage
                name="street"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Field
                name="city"
                placeholder="Port Harcourt"
                className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                  formik.touched.city && formik.errors.city
                    ? "border-[#B3261E]"
                    : "border-[#CFCFCF]"
                }`}
              />

              <ErrorMessage
                name="city"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Field
                name="state"
                placeholder="Rivers State"
                className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                  formik.touched.state && formik.errors.state
                    ? "border-[#B3261E]"
                    : "border-[#CFCFCF]"
                }`}
              />

              <ErrorMessage
                name="state"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Field
                name="country"
                placeholder="Nigeria"
                disabled
                className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                  formik.touched.country && formik.errors.country
                    ? "border-[#B3261E]"
                    : "border-[#CFCFCF]"
                } disabled:bg-[#EFEEEE] disabled:cursor-not-allowed disabled:text-[#787878]`}
              />

              <ErrorMessage
                name="country"
                component="p"
                className="text-[12px] text-[#B3261E]"
              />
            </div>

            <p>
              This is where IFETO's logistics team will collect your products
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 py-0 md:py-6">
              <button
                type="submit"
                className="px-5 h-12 bg-[#27AE60] rounded-[6px] text-[18px] leading-8 text-white font-semiboldw w-full cursor-pointer"
              >
                Save Changes
              </button>

              <button className="px-5 h-12 border border-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semiboldw w-full cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}
