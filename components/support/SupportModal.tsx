"use client";

import { Loader2, X } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useSupport } from "@/hooks/actions/useSupport";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const { formik, isLoading } = useSupport(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EFEEEE]">
          <div>
            <h2 className="text-xl font-bold text-[#2A2A2A]">
              Contact Support
            </h2>
            <p className="text-sm text-[#787878] mt-1">
              Send us a message and we'll get back to you shortly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <form
            id="support-form"
            onSubmit={formik.handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#2A2A2A]">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. Adamma"
                  className={`w-full p-3 h-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#27AE60]/20 transition-all ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#27AE60]"
                  }`}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-xs text-red-500">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#2A2A2A]">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. Okoro"
                  className={`w-full p-3 h-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#27AE60]/20 transition-all ${
                    formik.touched.lastName && formik.errors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#27AE60]"
                  }`}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-xs text-red-500">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#2A2A2A]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="adamma.okoro@example.com"
                className={`w-full p-3 h-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#27AE60]/20 transition-all ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-[#27AE60]"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#2A2A2A]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                placeholder="1234567890"
                country={"ng"}
                value={formik.values.phone}
                onChange={(value) => formik.setFieldValue("phone", value)}
                onBlur={() => formik.setFieldTouched("phone", true)}
                containerStyle={{
                  width: "100%",
                  height: "48px",
                }}
                inputStyle={{
                  width: "100%",
                  outline: "none",
                  height: "48px",
                  fontSize: "14px",
                  borderRadius: "0.5rem",
                  borderColor:
                    formik.touched.phone && formik.errors.phone
                      ? "#ef4444"
                      : "#e5e7eb",
                }}
                buttonStyle={{
                  background: "transparent",
                  borderColor:
                    formik.touched.phone && formik.errors.phone
                      ? "#ef4444"
                      : "#e5e7eb",
                  borderTopLeftRadius: "0.5rem",
                  borderBottomLeftRadius: "0.5rem",
                }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500">{formik.errors.phone}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#2A2A2A]">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="How can we help you?"
                rows={4}
                className={`w-full p-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-[#27AE60]/20 transition-all ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-[#27AE60]"
                }`}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-xs text-red-500">{formik.errors.message}</p>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#EFEEEE] bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="support-form"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            className="px-6 py-2.5 rounded-lg font-medium text-white bg-[#27AE60] hover:bg-[#219151] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Request"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
