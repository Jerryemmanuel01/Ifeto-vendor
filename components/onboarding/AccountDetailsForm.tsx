"use client";

import { useRouter } from "next/navigation";
import { useAccountDetails } from "@/hooks/form-hooks/useAccountDetails";

const AccountDetailsForm = () => {
  const { formik, isLoading } = useAccountDetails();
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="lg:text-3xl text-2xl font-bold text-gray-900">
          Account Details
        </h2>
        <p className="text-gray-500 mt-1 lg:text-xl">
          Provide your account details
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Name */}
          <div>
            <label
              htmlFor="accountName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Account Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="accountName"
              {...formik.getFieldProps("accountName")}
              placeholder="Enter your account name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
            />
            {formik.touched.accountName && formik.errors.accountName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.accountName}
              </div>
            )}
          </div>

          {/* Bank Selection */}
          <div>
            <label
              htmlFor="bank"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="bank"
              {...formik.getFieldProps("bank")}
              placeholder="Enter your bank name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
            />
            {formik.touched.bank && formik.errors.bank && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.bank}
              </div>
            )}
          </div>

          {/* Account Number */}
          <div className="md:col-span-2">
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="accountNumber"
              {...formik.getFieldProps("accountNumber")}
              placeholder="Enter your account number"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400 text-sm"
              maxLength={10}
            />
            {formik.touched.accountNumber && formik.errors.accountNumber && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.accountNumber}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-4 bg-transparent border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || isLoading}
            className={`flex-1 py-4 font-semibold rounded-lg text-sm transition-colors ${
              !formik.isValid || !formik.dirty || isLoading
                ? "bg-[#C2C2C2] text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-opacity-90 cursor-pointer"
            }`}
          >
            {isLoading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;
