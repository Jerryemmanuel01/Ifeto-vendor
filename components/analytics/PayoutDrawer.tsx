"use client";
import receipt from "@/assets/svgs/receipt.svg";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface PayoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    orderId: string;
    payoutId: string;
    amount: number;
    status: string;
    date: string;
  } | null;
}

const PayoutDrawer = ({ isOpen, onClose, data }: PayoutDrawerProps) => {
  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!data) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[640px] bg-white z-50 shadow-xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 flex flex-col">
          <div className="flex items-center justify-between flex-row">
            <div className="p-2 w-fit rounded-[12px] bg-green-100 flex items-center justify-center mb-4">
              <Image src={receipt} alt="receipt" />
            </div>

            <button onClick={onClose}>
              <X className="text-gray-500 cursor-pointer" />
            </button>
          </div>

          <h2 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
            Payout Details
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 flex-1 space-y-8">
          <div className="flex justify-between text-lg font-medium"></div>

          <div className="grid grid-cols-2 gap-y-6 text-sm">
            <p className="text-[18px] leading-7 text-[#2A2A2A] font-semibold">
              Bank Transfer
            </p>
            <p className="text-[18px] leading-7 text-[#2A2A2A] font-semibold">
              ₦{data.amount.toLocaleString()}
            </p>

            <div>
              <p className="text-[#606060] text-[14px] leading-5">Order ID</p>
              <p className="text-[16px] leading-6 text-[#2A2A2A]">
                {data.orderId}
              </p>
            </div>

            <div>
              <p className="text-[#606060] text-[14px] leading-5">Payout ID</p>
              <p className="text-[16px] leading-6 text-[#2A2A2A]">
                {data.payoutId}
              </p>
            </div>

            <div>
              <p className="text-[#606060] text-[14px] leading-5">Status</p>
              <span className="inline-block mt-1 px-3 py-1 text-[16px] leading-6 rounded-full bg-green-100 text-green-600">
                {data.status}
              </span>
            </div>

            <div>
              <p className="text-[#606060] text-[14px] leading-5">Date</p>
              <p className="text-[16px] leading-6 text-[#2A2A2A]">
                {data.date}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6">
          <button
            onClick={onClose}
            className="w-full h-12 rounded-lg bg-[#27AE60] text-white font-medium hover:opacity-90 transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default PayoutDrawer;
