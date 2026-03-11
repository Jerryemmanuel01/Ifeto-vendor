import React from "react";
import Image from "next/image";
import verifyIcon from "@/assets/svgs/verify.svg";

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  buttonText?: string;
  onClose: () => void;
  onAction?: () => void;
}

export default function SuccessModal({
  isOpen,
  title,
  message,
  buttonText = "Done",
  onClose,
  onAction,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[#E5F7ED]">
          <Image src={verifyIcon} alt="Success" width={40} height={40} />
        </div>

        <h2 className="text-2xl font-bold text-[#2A2A2A] mb-2">{title}</h2>
        <p className="text-sm text-[#787878] mb-8 leading-relaxed">{message}</p>

        <button
          onClick={() => {
            if (onAction) {
              onAction();
            } else {
              onClose();
            }
          }}
          className="w-full h-12 bg-[#27AE60] hover:bg-[#219151] rounded-lg text-white font-semibold flex items-center justify-center transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
