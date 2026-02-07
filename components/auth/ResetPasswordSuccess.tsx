"use client";

import Image from "next/image";
import successCheck from "@/assets/icons/successCheck.svg";

import { motion } from "framer-motion";

interface ResetPasswordSuccessProps {
  onLogin: () => void;
}

const ResetPasswordSuccess = ({ onLogin }: ResetPasswordSuccessProps) => {
  return (
    <div className="lg:py-10 lg:mt-7 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl max-w-lg w-full mx-auto relative flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Image
          src={successCheck}
          alt="Success Check"
          className="w-[300px] h-[300px]"
        />
      </motion.div>

      <p className="text-[#5A5A5A] font-medium text-2xl text-center mt-8">
        Your password has been reset successfully.
      </p>

      <div className="mt-8 w-full">
        <button
          onClick={onLogin}
          className="w-full h-12 rounded-md text-center text-lg font-semibold cursor-pointer bg-primary text-white hover:bg-opacity-90 transition-opacity"
        >
          Continue to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
