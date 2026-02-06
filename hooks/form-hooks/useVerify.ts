import { useFormik } from "formik";
import { VerifyCodeSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useResendVerificationCodeMutation,
  useVerifyAuthCodeMutation,
} from "@/lib/features/auth/authApi";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";

const useVerify = (userId: string | null) => {
  const [verify, { isLoading }] = useVerifyAuthCodeMutation();
  const [resend, { isLoading: isResending }] =
    useResendVerificationCodeMutation();

  const router = useRouter();
  const [resendTimer, setResendTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values) => {
      const code = Object.values(values).join("");

      const payload = {
        code,
        userId: userId ?? "",
      };

      try {
        const result = await verify(payload).unwrap();
        console.log(result);

        if (result.success) {
          showSuccessToast(result.message);
          setIsVerified(true);
        }
      } catch (err: any) {
        console.error("Verification Failed:", err);

        const errorMessage =
          err?.data?.message ||
          err?.error ||
          "An unexpected error occurred during Verification.";
        showErrorToast(errorMessage);
      }
    },
  });

  useEffect(() => {
    if (!resendTimer) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendCode = async (email: string) => {
    if (resendTimer > 0 || isResending) return;
    const payload = {
      email,
    };
    setResendTimer(59);

    try {
      const result = await resend(payload).unwrap();
      console.log(result);

      if (result.success) {
        showSuccessToast(result.message);
      }
    } catch (err: any) {
      console.error("Resend Verification Failed:", err);
      setResendTimer(0);

      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Failed to resend verification code.";
      showErrorToast(errorMessage);
    }
  };

  const isResendDisabled = resendTimer > 0 || isResending;

  return {
    formik,
    resendTimer,
    handleResendCode,
    isResendDisabled,
    isVerified,
    setIsVerified,
    isLoading,
    isResending,
  };
};

export default useVerify;
