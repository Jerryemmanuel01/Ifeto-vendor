"use client";

import Image from "next/image";
import successIcon from "@/assets/svgs/success-circle.svg"; // Assuming this exists or I'll use a placeholder/alternative
import clockIcon from "@/assets/svgs/clock-orange.svg";

interface PendingApprovalProps {
  firstName?: string;
}

export default function PendingApproval({ firstName }: PendingApprovalProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAFA] p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-custom2 p-10 space-y-8 flex flex-col items-center">
        <div className="w-24 h-24 bg-[#F59E0B1A] rounded-full flex items-center justify-center">
          <Image
            src={clockIcon}
            alt="Pending Verification"
            width={48}
            height={48}
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#2A2A2A]">
            Thank You, {firstName}!
          </h1>
          <p className="text-lg text-[#5A5A5A] leading-relaxed">
            You've successfully completed the onboarding process. Your
            application is now being reviewed by our admin team.
          </p>
        </div>

        <div className="w-full h-px bg-[#E5E5E5]" />

        <div className="space-y-2">
          <p className="text-sm font-medium text-[#787878]">
            What happens next?
          </p>
          <p className="text-sm text-[#787878]">
            Verification usually takes 24-48 hours. We'll notify you via email
            once your account is fully activated.
          </p>
        </div>
      </div>
    </div>
  );
}
