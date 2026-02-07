"use client";

import useForgotPassword from "@/hooks/form-hooks/useForgotPassword";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

const ForgotPasswordForm = () => {
  const { formik, isLoading, isSuccess, submittedEmail, setIsSuccess } =
    useForgotPassword();

  if (isSuccess) {
    return (
      <ForgotPasswordSuccess
        email={submittedEmail}
        onResend={() => setIsSuccess(false)} // Or implement separate resend logic
        onBack={() => setIsSuccess(false)}
      />
    );
  }

  return (
    <div className="lg:py-10 lg:mt-7 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl max-w-lg w-full mx-auto relative">
      <Link
        href="/auth/login"
        className="lg:absolute inline-flex lg:top-14 left-6 text-gray-500 hover:text-black"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="lg:text-center mt-4">
        <h2 className="font-bold font-inter text-2xl lg:text-center">
          Forgot Your Password?
        </h2>
        <p className="text-light mt-2 lg:max-w-sm mx-auto">
          Enter your registered email address and we'll send you a secure reset
          link.
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="block font-medium text-sm" htmlFor="email">
              Email
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center mt-1">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-active bg-transparent"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <div className="pr-4">
                <Mail className="text-light-active w-5 h-5" />
              </div>
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full h-12 rounded-md text-center text-lg font-semibold cursor-pointer transition-colors ${
                !formik.isValid || !formik.dirty || isLoading
                  ? "bg-[#C7D3CC] text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-opacity-90"
              }`}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
