"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Formik, Form, Field, ErrorMessage } from "formik";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import status from "@/assets/svgs/status.svg";
import Image from "next/image";
import { AddProductSchema } from "@/utils/schema";
import Table, { Column } from "@/components/Table/Table";
import { Link, MapPin } from "lucide-react";
import OrderTrackingSteps from "@/components/general/OrderTrackingSteps";
import { getTrackingSteps } from "@/utils/utils";

type Order = {
  id: string; // Order ID
  orderNumber: string; // e.g. ORD-10234
  date: string; // ISO date
  itemsCount: number; // number of items
  totalWeight: string; // e.g. "3.2kg"
  totalAmount: number; // ₦
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  row: number; // seller earnings
};

type OrderTableProps = {
  orders: Order[];
  isLoading: boolean;
};

export default function Page() {
  const orders = [
    {
      id: "1",
      orderNumber: "ORD-1001",
      date: "2025-12-23",
      itemsCount: 3,
      totalWeight: "900g",
      totalAmount: 4200,
      earnings: 3800,
      status: "pending",
    },
    {
      id: "2",
      orderNumber: "ORD-1002",
      date: "2025-12-23",
      itemsCount: 1,
      totalWeight: "300g",
      totalAmount: 4200,
      earnings: 3500,
      status: "cancelled",
    },
    {
      id: "3",
      orderNumber: "ORD-1003",
      date: "2025-12-23",
      itemsCount: 2,
      totalWeight: "600g",
      totalAmount: 8400,
      earnings: 7600,
      status: "delivered",
    },
  ];

  const columns: Column<Order>[] = [
    {
      header: "Item",
      render: (row) => (
        <p className="line-clamp-1 text-[14px] leading-5 font-semibold text-[#5A5A5A]">
          {row.id}
        </p>
      ),
    },
    {
      header: "Quantity",
      render: (row) => <p className="line-clamp-2">{row.date}</p>,
    },
    { header: "Weight (Each)", accessor: "itemsCount" },
    {
      header: "Total Weight",
      render: (row) => (
        <p className="font-semibold text-[#2A2A2A]">{row.totalWeight}</p>
      ),
    },
  ];

  const order = {
    status: "DELIVERED",
    createdAt: "2026-02-01T10:15:00Z",
    processedAt: "2026-02-02T09:30:00Z",
    shippedAt: "2026-02-03T14:45:00Z",
    deliveredAt: "2026-02-04T18:20:00Z",
  };

  // const trackingSteps = getTrackingSteps({});
  const trackingSteps = getTrackingSteps(order || {});

  return (
    <div className="bg-[#FAFAFA] space-y-6 min-h-screen h-full flex flex-col">
      <div className="flex md:flex-col gap-2 md:py-6 py-3 md:px-8 px-6 shadow-custom2 flex-row">
        <div className="flex items-center gap-2">
          <Image src={arrowLeft} alt="arrow-back" />
          <p className="text-[16px] leading-6 font-semibold text-[#787878]">
            back
          </p>
        </div>

        <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#5A5A5A] font-semibold md:w-full md:text-start w-full text-center">
          Order Details
        </h1>
      </div>

      <div className="flex items-center justify-between flex-row w-full">
        <div className="space-y-2">
          <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#2A2A2A]">
            Order #A09472
          </h1>
          <p className="md:text-[18px] text-[14px] md:leading-7 leading-5 text-[#787878]">
            Placed on Nov 26, 2025
          </p>
        </div>

        <div className="space-y-2">
          <p className="py-1 px-4 bg-[#F59E0B1A] text-[#F59E0B] md:text-[16px] text-[12px] md:leading-6 leading-4.5 font-semibold w-fit rounded-3xl">
            Processing
          </p>
          <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#2A2A2A]">
            You earn: ₦4,200
          </h1>
        </div>
      </div>

      <div className="border border-[#EFEEEE] rounded-lg">
        <Table
          columns={columns}
          data={orders}
          isLoading={false}
          loadingRows={10}
        />
        <div className="flex items-end flex-col gap-2 w-full p-3">
          <p className="md:text-[16px] text-[14px] md:leading-6 text-[#787878]">
            Total Weight
          </p>
          <h3 className="text-[18px] leading-7 font-semibold text-[#2A2A2A]">
            4.2kg
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito">
        <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold mb-4 md:mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-light" />
          Delivery Information
        </h2>
        <div className="space-y-4">
          <div>
            <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
              Recipient
            </p>
            <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
              Elizabeth Odiai
            </p>
          </div>
          <div>
            <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
              Address
            </p>
            <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
              456 Central Avenue, Buffalo, NY 14201
            </p>
          </div>

          <div>
            <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
              Phone Number
            </p>
            <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
              917-671-5839
            </p>
          </div>

          <div>
            <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
              Email Address
            </p>
            <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
              Lizziefavour@gmail.com
            </p>
          </div>
          <div>
            <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
              Delivery Method
            </p>
            <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
              Standard Air Freight
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito">
        <div className="flex items-center gap-2 flex-row mb-4 md:mb-6">
          <Image src={status} alt="" />
          <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
            Order Status Timeline
          </h2>
        </div>
        <OrderTrackingSteps steps={trackingSteps} />
      </div>
    </div>
  );
}
