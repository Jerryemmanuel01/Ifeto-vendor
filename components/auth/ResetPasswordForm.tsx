"use client";

// import useResetPassword from "@/hooks/form-hooks/useResetPassword"; // Removed
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface ResetPasswordFormProps {
  formik: any;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean | ((prev: boolean) => boolean)) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (
    show: boolean | ((prev: boolean) => boolean),
  ) => void;
}

const ResetPasswordForm = ({
  formik,
  isLoading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: ResetPasswordFormProps) => {
  return (
    <div className="lg:py-10 lg:mt-7 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl max-w-lg w-full mx-auto relative">
      <Link
        href="/auth/login"
        className="lg:absolute top-14 left-6 w-fit inline-flex text-gray-500 hover:text-black"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="lg:text-center mt-4">
        <h2 className="font-bold font-inter text-2xl lg:text-center">
          Reset Your Password
        </h2>
        <p className="text-light mt-2 lg:max-w-sm mx-auto">
          Create a strong new password to secure your account.
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="password">
              New Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter new password"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-active bg-transparent"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                type="button"
                className="mr-4 cursor-pointer text-light-active"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Eye className="w-5" />
                ) : (
                  <EyeOff className="w-5" />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block font-medium text-sm"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your new password"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-active bg-transparent"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <button
                type="button"
                className="mr-4 cursor-pointer text-light-active"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <Eye className="w-5" />
                ) : (
                  <EyeOff className="w-5" />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-600 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <div className="mt-8">
            <button
              disabled={!formik.isValid || !formik.dirty || isLoading}
              type="submit"
              className={`w-full h-12 rounded-md text-center text-lg font-semibold cursor-pointer transition-colors ${
                !formik.isValid || !formik.dirty || isLoading
                  ? "bg-[#C7D3CC] text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-opacity-90"
              }`}
            >
              {isLoading ? "Resetting..." : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
