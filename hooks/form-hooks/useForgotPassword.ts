"use client";

import { useForgotPasswordMutation } from "@/lib/features/auth/authApi";
import { ForgotPasswordSchema } from "@/utils/schema";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";
import { useFormik } from "formik";
import { useState } from "react";

const useForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [isSuccess, setIsSuccess] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        const result = await forgotPassword(values).unwrap();
        showSuccessToast(result.message || "Password reset link sent!");
        setIsSuccess(true);
        setSubmittedEmail(values.email);
      } catch (err: any) {
        console.error("Forgot Password Failed:", err);
        const errorMessage =
          err?.data?.message ||
          err?.error ||
          "Failed to send reset link. Please try again.";
        showErrorToast(errorMessage);
      }
    },
  });
  const [submittedEmail, setSubmittedEmail] = useState(formik.values.email);

  return { formik, isLoading, isSuccess, submittedEmail, setIsSuccess };
};

export default useForgotPassword;
