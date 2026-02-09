"use client";

import Link from "next/link";
import { Eye, EyeOff, Mail } from "lucide-react";
import useLogin from "@/hooks/form-hooks/useLogin";

const LoginForm = () => {
  const { formik, showPassword, setShowPassword } = useLogin();

  return (
    <div className="lg:py-8 mt-4 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl max-w-lg w-full mx-auto">
      <div className="text-center">
        <h2 className="font-bold font-inter text-2xl text-center">
          Login to Your Account
        </h2>
        <p className="text-light mt-2">
          Please provide your login details to proceed.
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

          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="password">
              Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
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

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="w-4 h-4 accent-primary cursor-pointer border-light-active rounded"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
              />
              <label
                htmlFor="rememberMe"
                className="text-sm cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-[#FF5858] text-sm font-medium hover:underline"
            >
              Forgot Password? →
            </Link>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className={`w-full h-12 rounded-md text-center text-lg font-semibold cursor-pointer transition-colors ${
                !formik.isValid || !formik.dirty || formik.isSubmitting
                  ? "bg-[#C7D3CC] text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-opacity-90"
              }`}
            >
              Login
            </button>
          </div>

          <div className="flex items-center gap-2 w-full justify-center mt-2.5">
            <span className="font-semibold text-lg">
              Don't have an account?
            </span>
            <Link
              href="/auth/signup"
              className="text-primary text-lg font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
