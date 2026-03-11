"use client";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import Image from "next/image";

import SettingsTabs from "@/components/settings/SettingsTabs";

export default function Page() {
  return (
    <div className="bg-[#FAFAFA] space-y-6 min-h-screen h-full flex flex-col">
      <div className="flex md:flex-col gap-2 md:py-6 py-3 md:px-8 px-6 shadow-custom2 flex-row">
        <div
          //   onClick={() => router.back()}
          className="flex md:hidden items-center gap-2 cursor-pointer w-fit"
        >
          <Image src={arrowLeft} alt="arrow-back" />
          <p className="text-[16px] leading-6 font-semibold text-[#787878]">
            back
          </p>
        </div>
        <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#5A5A5A] font-semibold md:w-full md:text-start w-full text-center">
          Settings
        </h1>

        <p className="text-[16px] leading-6 font-semibold text-[#787878] hidden md:block">
          Manage your profile and account settings
        </p>
      </div>

      <SettingsTabs />
    </div>
  );
}
