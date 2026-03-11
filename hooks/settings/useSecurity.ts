import { useState } from "react";
import { useFormik } from "formik";
import { SecuritySchema } from "@/utils/schema";
import { useUpdatePasswordMutation } from "@/lib/features/profile/profileApi";
import { toast } from "sonner";

export const useSecurity = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: SecuritySchema,
    validateOnMount: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await updatePassword({
          currentPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }).unwrap();
        toast.success("Password changed successfully");
        resetForm();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to change password");
      }
    },
  });

  return {
    formik,
    isLoading,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
