"use client";
import sms from "@/assets/svgs/sms.svg";
import book from "@/assets/svgs/book.svg";
import Image from "next/image";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import SupportModal from "@/components/support/SupportModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#FAFAFA] space-y-8  h-full flex flex-col relative">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="md:space-y-2 space-y-3">
            <h1 className="md:text-[32px] text-[16px] md:leading-8 leading-6 font-medium text-[#2A2A2A]">
              Support
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5">
              Get quick answers or reach our support team if you need help.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#FFFFFF] md:p-6 p-4 shadow-custom2 flex items-start md:gap-4.75 gap-2.5 rounded-2xl">
          <div className="bg-[#2E0BF51A] md:p-3 p-1.5 w-fit rounded-xl ">
            <Image src={book} alt="book" className="w-6 h-6" />
          </div>

          <div className="space-y-[26px] w-full">
            <div className="space-y-2">
              <h3 className="md:text-[18px] md:leading-7 text-[16px] leading-4 font-semibold text-[#2A2A2A]">
                FAQs
              </h3>
              <p className="text-[16px] leading-6 text-[#787878]">
                Find answers to common questions about products, orders,
                payouts, and compliance.
              </p>
            </div>

            <Link
              href={"/support/FAQs"}
              className="w-fit flex items-center gap-2.5 text-[#27AE60] text-[18px] leading-7 font-semibold"
            >
              <p>View FAQs</p>
              <MoveRight />
            </Link>
          </div>
        </div>

        <div className="bg-[#FFFFFF] md:p-6 p-4 shadow-custom2 flex items-start md:gap-4.75 gap-2.5 rounded-2xl">
          <div className="bg-[#E3FFEF] md:p-3 p-1.5 w-fit rounded-xl ">
            <Image src={sms} alt="sms" className="w-6 h-6" />
          </div>

          <div className="space-y-[26px] w-full">
            <div className="space-y-2">
              <h3 className="md:text-[18px] md:leading-7 text-[16px] leading-4 font-semibold text-[#2A2A2A]">
                Contact Support
              </h3>
              <p className="text-[16px] leading-6 text-[#787878]">
                Can't find what you're looking for? Send us an email and we'll
                assist you.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full h-12 bg-[#27AE60] rounded-[6px] text-[18px] leading-8 text-white font-semibold cursor-pointer hover:bg-[#219151] transition-colors"
            >
              Email Support
            </button>
          </div>
        </div>
      </div>

      <p className="text-[16px] leading-6 text-[#787878] text-center">
        Support hours: Monday–Friday, 9am–5pm (WAT)
      </p>

      <SupportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
