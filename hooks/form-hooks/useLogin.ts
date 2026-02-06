"use client";

import { useLoginMutation } from "@/lib/features/auth/authApi";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";
import { LoginSchema } from "@/utils/schema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const userData = await login({
          email: values.email,
          password: values.password,
        }).unwrap();

        dispatch(
          setCredentials({
            user: userData.data.user,
            token: userData.data.token,
          }),
        );
        showSuccessToast("Login successful!");
        router.push("/dashboard");
      } catch (err: any) {
        console.error("Login failed", err);
        const errorMessage =
          err?.data?.message || err?.error || "Login failed. Please try again.";
        showErrorToast(errorMessage);
      }
    },
  });

  const canSubmit =
    formik.values.email &&
    !formik.errors.email &&
    formik.values.password &&
    !formik.errors.password;

  return { formik, showPassword, setShowPassword, canSubmit, isLoading };
};

export default useLogin;
