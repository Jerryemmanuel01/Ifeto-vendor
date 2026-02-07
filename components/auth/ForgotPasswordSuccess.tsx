"use client";

import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

interface ForgotPasswordSuccessProps {
  email: string;
  onResend: () => void;
  onBack: () => void;
}

const ForgotPasswordSuccess = ({
  email,
  onResend,
  onBack,
}: ForgotPasswordSuccessProps) => {
  return (
    <div className="lg:py-10 lg:mt-7 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl max-w-lg w-full mx-auto relative">
      <button
        onClick={onBack}
        className="absolute lg:top-14 left-6 text-gray-500 hover:text-black cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="flex flex-col items-center justify-center mt-6 text-center">
        <div className="w-16 h-16 bg-[#E3FFEF] rounded-full flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <h2 className="font-bold font-inter text-2xl text-center">
          Check Your Email
        </h2>
        <p className="text-light mt-2 max-w-sm mx-auto">
          We've sent a password reset link to{" "}
          <span className="text-[#26A17B] font-medium block sm:inline">
            {email}
          </span>
        </p>

        <div className="mt-8 bg-[#E7F6EC] p-4 rounded-lg w-full">
          <p className="text-[#515151] text-sm leading-relaxed">
            Click the link in the email to reset your password. The link will
            expire in 1 hour.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={onResend}
          className="text-[#26A17B] font-semibold hover:underline text-sm cursor-pointer"
        >
          Didn't receive the email? Try again
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordSuccess;
