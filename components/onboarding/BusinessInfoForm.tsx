"use client";

import { useFormik } from "formik";
import { BusinessInfoSchema } from "@/utils/schema";
import { ChevronDown, Mail } from "lucide-react";
import Image from "next/image";
import ngFlag from "@/assets/icons/nigeria.svg"; // Assuming you have this or similar, otherwise fallback

const BusinessInfoForm = () => {
  // Mocking the flag import if not available, or replacing with a div

  const formik = useFormik({
    initialValues: {
      businessName: "",
      businessType: "",
      registrationNumber: "",
      taxId: "",
      email: "",
      contactPerson: "",
      address: "",
      phone: "",
    },
    validationSchema: BusinessInfoSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle submission
    },
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">
          Business Information
        </h2>
        <p className="text-gray-500 mt-1">Provide your business information</p>
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
            <label
              htmlFor="businessType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Business Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="businessType"
                {...formik.getFieldProps("businessType")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm appearance-none bg-white"
              >
                <option value="" disabled>
                  Select your business type
                </option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="limited_liability">
                  Limited Liability Company
                </option>
                <option value="partnership">Partnership</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {formik.touched.businessType && formik.errors.businessType && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.businessType}
              </div>
            )}
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
            <div className="flex">
              <div className="flex items-center justify-center px-4 py-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50/50">
                {/* Placeholder for flag */}
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[8px] mr-2">
                  NG
                </div>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </div>
              <input
                type="text"
                id="phone"
                {...formik.getFieldProps("phone")}
                placeholder="+234"
                className="w-full px-4 py-3 rounded-r-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
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
            className="w-full py-4 bg-[#C2C2C2] text-white font-semibold rounded-lg text-sm hover:bg-[#A0A0A0] transition-colors cursor-pointer"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfoForm;
