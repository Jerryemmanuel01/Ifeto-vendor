"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import CustomSelect from "@/components/general/CustomSelect";
import "react-phone-input-2/lib/style.css";
import useBusinessInfo from "@/hooks/form-hooks/useBusinessInfo";

const BusinessInfoForm = () => {
  const { formik, isLoading } = useBusinessInfo();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="lg:text-3xl text-2xl font-bold text-gray-900">
          Business Information
        </h2>
        <p className="text-gray-500 mt-1 lg:text-xl">
          Provide your business information
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="businessName"
              {...formik.getFieldProps("businessName")}
              placeholder="Enter your business name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
            />
            {formik.touched.businessName && formik.errors.businessName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.businessName}
              </div>
            )}
          </div>

          {/* Business Type */}
          <div>
            <CustomSelect
              label={
                <>
                  Business Type <span className="text-red-500">*</span>
                </>
              }
              className="h-12"
              name="businessType"
              value={formik.values.businessType}
              onChange={(name, value) => formik.setFieldValue(name, value)}
              options={[
                { label: "Sole Proprietorship", value: "sole_proprietorship" },
                {
                  label: "Limited Liability Company",
                  value: "limited_liability",
                },
                { label: "Partnership", value: "partnership" },
              ]}
              placeholder="Select your business type"
              error={formik.errors.businessType}
              touched={formik.touched.businessType}
            />
          </div>

          {/* Registration Number */}
          <div>
            <label
              htmlFor="registrationNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="registrationNumber"
              {...formik.getFieldProps("registrationNumber")}
              placeholder="Enter your registration number"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
            />
            {formik.touched.registrationNumber &&
              formik.errors.registrationNumber && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.registrationNumber}
                </div>
              )}
          </div>

          {/* Tax ID */}
          <div>
            <label
              htmlFor="taxId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tax ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="taxId"
              {...formik.getFieldProps("taxId")}
              placeholder="Enter your tax ID"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
            />
            {formik.touched.taxId && formik.errors.taxId && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.taxId}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm pr-10"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Contact Person */}
          <div className="md:col-span-2">
            <label
              htmlFor="contactPerson"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Person <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contactPerson"
              {...formik.getFieldProps("contactPerson")}
              placeholder="Enter your contact person name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
            />
            {formik.touched.contactPerson && formik.errors.contactPerson && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.contactPerson}
              </div>
            )}
          </div>

          {/* Address Line */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address Line
            </label>
            <input
              type="text"
              id="address"
              {...formik.getFieldProps("address")}
              placeholder="Enter your address line"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.address}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <div className="w-full">
              <PhoneInput
                country={"ng"}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                // containerClass="w-full border border-gray-200 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors"
                // inputClass="!w-full !px-4 !py-3 !h-[46px] !border-none !outline-none !text-sm !text-gray-900 !rounded-lg !bg-transparent"
                buttonClass="!border-none !bg-transparent !rounded-l-lg hover:!bg-gray-50"
                // dropdownClass="!bg-white !shadow-lg !rounded-lg !border-gray-100"
                inputStyle={{
                  width: "100%",
                  outline: "none",
                  height: "46px",
                  fontSize: "14px",
                }}
                buttonStyle={{
                  background: "transparent",
                }}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                }}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || isLoading}
            className={`w-full py-4 font-semibold rounded-lg text-lg transition-colors ${
              !formik.isValid || !formik.dirty || isLoading
                ? "bg-[#C7D3CC] text-white"
                : "bg-primary text-white"
            }`}
          >
            {isLoading ? "Processing..." : "Proceed"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfoForm;
