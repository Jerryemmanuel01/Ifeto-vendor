"use client";

import { useResetPasswordMutation } from "@/lib/features/auth/authApi";
import { ResetPasswordSchema } from "@/utils/schema";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const useResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const email = searchParams.get("email"); // Or email, depending on backend

  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      if (!code) {
        showErrorToast("Invalid or missing reset token.");
        return;
      }

      try {
        const result = await resetPassword({
          code,
          email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }).unwrap();

        showSuccessToast(result.message || "Password reset successful!");
        setIsSuccess(true);
      } catch (err: any) {
        console.error("Reset Password Failed:", err);
        const errorMessage =
          err?.data?.message ||
          err?.error ||
          "Failed to reset password. Please try again.";
        showErrorToast(errorMessage);
      }
    },
  });

  return {
    formik,
    isLoading,
    isSuccess,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};

export default useResetPassword;
