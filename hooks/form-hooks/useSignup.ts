import { useFormik } from "formik";
import { SignupSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignupMutation } from "@/lib/features/auth/authApi";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";

const useSignup = () => {
  const [secondForm, setSecondForm] = useState(false);
  const router = useRouter();

  const [signup, { isLoading }] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...signupValues } = values;

        const result = await signup(signupValues).unwrap();
        console.log(result);

        if (result.success) {
          const { id } = result.data.newUser;
          showSuccessToast(result.message);

          // Optional: Redirect to a verification page
          router.push(
            `/auth/signup/verify?userId=${id}&email=${encodeURIComponent(
              values.email,
            )}`,
          );
        }
      } catch (err: any) {
        console.error("Signup Failed:", err);

        const errorMessage =
          err?.data?.message ||
          err?.error ||
          "An unexpected error occurred during signup.";
        showErrorToast(errorMessage);
      }
    },
  });
  return { formik, secondForm, setSecondForm, isLoading };
};

export default useSignup;
