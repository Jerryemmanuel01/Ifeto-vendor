"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Image from "next/image";
import securityUser from "@/assets/icons/security-user.svg";
import authBg from "@/assets/images/authImg.png";
import useResetPassword from "@/hooks/form-hooks/useResetPassword";
import ResetPasswordSuccess from "@/components/auth/ResetPasswordSuccess";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const {
    formik,
    isLoading,
    isSuccess,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useResetPassword();

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center bg-gray-50 lg:bg-transparent overflow-hidden">
      {/* Background Image (Desktop) */}
      <div className="hidden lg:block absolute inset-0 z-0 h-full w-full">
        <Image
          src={authBg}
          alt="Auth Background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <div className={`mb-6 ${isSuccess ? "lg:hidden" : ""}`}>
          <div className="rounded-full bg-primary p-3 w-fit mx-auto">
            <Image
              src={securityUser}
              alt="Security User"
              className="w-10 h-10"
            />
          </div>
          <h2 className="lg:text-4xl text-3xl font-bold lg:text-white text-black mt-4">
            IFETO Vendor Portal
          </h2>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-lg">
          {isSuccess ? (
            <ResetPasswordSuccess onLogin={() => router.push("/auth/login")} />
          ) : (
            <ResetPasswordForm
              formik={formik}
              isLoading={isLoading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
