import {
  BankPayoutSchema,
  BusinessSchema,
  SecuritySchema,
} from "@/utils/schema";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import verify from "@/assets/svgs/verify.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useUpdatePasswordMutation } from "@/lib/features/profile/profileApi";
import { toast } from "sonner";

export default function Security() {
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

  return (
    <div className="bg-[#FFFFFF] shadow-custom2 rounded-2xl p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
          Security
        </h1>
        <p className="text-[14px] leading-5 text-[#787878]">
          Keep your account secure
        </p>
      </div>

      <FormikProvider value={formik}>
        <Form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="">
            <label className="block font-medium text-sm" htmlFor="oldPassword">
              Current Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter your current password"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
              />
              {showCurrentPassword ? (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() =>
                    setShowCurrentPassword((prev: boolean) => !prev)
                  }
                >
                  <Eye className="w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() =>
                    setShowCurrentPassword((prev: boolean) => !prev)
                  }
                >
                  <EyeOff className="w-5" />
                </button>
              )}
            </div>
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.oldPassword}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="newPassword">
              New Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter your password"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
              {showNewPassword ? (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  <Eye className="w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  <EyeOff className="w-5" />
                </button>
              )}
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.newPassword}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="block font-medium text-sm"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter your password"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {showConfirmPassword ? (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <Eye className="w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <EyeOff className="w-5" />
                </button>
              )}
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-600 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 py-0 md:py-6">
            <button
              type="submit"
              disabled={isLoading || !formik.isValid}
              className="px-5 h-12 bg-[#27AE60] rounded-[6px] text-[18px] leading-8 text-white font-semibold flex items-center justify-center w-full cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>

            <button className="px-5 h-12 border border-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semiboldw w-full cursor-pointer">
              Cancel
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}
