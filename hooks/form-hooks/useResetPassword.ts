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

  const token = searchParams.get("token");
  const userId = searchParams.get("userId"); // Or email, depending on backend

  const [isSuccess, setIsSuccess] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      if (!token) {
        showErrorToast("Invalid or missing reset token.");
        return;
      }

      try {
        const result = await resetPassword({
          token,
          userId,
          password: values.password,
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
