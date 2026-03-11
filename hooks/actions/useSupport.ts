import { useFormik } from "formik";
import * as Yup from "yup";
import { useSubmitSupportRequestMutation } from "@/lib/features/support/supportApi";
import { toast } from "sonner";
import { useEffect } from "react";

const SupportSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

export const useSupport = (isOpen: boolean, onClose: () => void) => {
  const [submitSupportRequest, { isLoading }] =
    useSubmitSupportRequestMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: SupportSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitSupportRequest(values).unwrap();
        toast.success(
          "Support request sent successfully. We will be in touch!",
        );
        resetForm();
        onClose();
      } catch (error: any) {
        toast.error(
          error?.data?.message ||
            "Failed to send support request. Please try again.",
        );
      }
    },
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  return { formik, isLoading };
};
