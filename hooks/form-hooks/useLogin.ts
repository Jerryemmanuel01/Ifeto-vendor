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
            token: userData.data.accessToken,
          }),
        );
        if (typeof window !== "undefined") {
          localStorage.setItem("ifetoVendorToken", userData.data.accessToken);
        }
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

  return { formik, showPassword, setShowPassword, isLoading };
};

export default useLogin;
