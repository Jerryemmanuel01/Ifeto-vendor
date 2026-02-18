"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "../Pagination";
import { ItemsPerPage } from "../Table/ItemsPerPage";
import Table, { Column } from "../Table/Table";
import moreIcon from "@/assets/svgs/more.svg";
import rightIcon from "@/assets/svgs/right-icon.svg";
import repeat from "@/assets/svgs/repeat.svg";
import eye from "@/assets/svgs/eye.svg";
import eyeGreen from "@/assets/svgs/eye-green.svg";
import Image from "next/image";
import Link from "next/link";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "accepted"
  | "rejected"
  | "ready_for_pickup"
  | "completed";

export type Order = {
  id: string; // Order ID
  orderNumber: string; // e.g. ORD-10234
  date: string; // ISO date
  itemsCount: number; // number of items
  totalWeight: string; // e.g. "3.2kg"
  totalAmount: number; // ₦
  status: OrderStatus;
  earnings: number;
};

type OrderTableProps = {
  orders: Order[];
  isLoading: boolean;
  totalItems: number;
};

export default function OrderTable({
  orders,
  isLoading,
  totalItems,
}: OrderTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 7);

  const statusMap = {
    pending: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
        Pending
      </span>
    ),

    processing: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
        Processing
      </span>
    ),

    shipped: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#2E0BF51A] text-[#2E0BF5]">
        Shipped
      </span>
    ),

    delivered: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#34C7591A] text-[#34C759]">
        Delivered
      </span>
    ),

    cancelled: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
        Cancelled
      </span>
    ),

    accepted: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#E3FFEF] text-[#27AE60]">
        Accepted
      </span>
    ),

    rejected: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
        Rejected
      </span>
    ),

    ready_for_pickup: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#F3E8FF] text-[#9333EA]">
        Ready for Pickup
      </span>
    ),

    completed: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#34C7591A] text-[#34C759]">
        Completed
      </span>
    ),
  };

  const columns: Column<Order>[] = [
    {
      header: "Order ID",
      render: (row) => (
        <p className="line-clamp-1 text-[14px] leading-5 font-semibold text-[#5A5A5A]">
          {row.id}
        </p>
      ),
    },
    {
      header: "Date",
      render: (row) => <p className="line-clamp-2">{row.date}</p>,
    },
    { header: "Items", accessor: "itemsCount" },
    {
      header: "Total Weight",
      render: (row) => (
        <p className="font-semibold text-[#2A2A2A]">{row.totalWeight}</p>
      ),
    },
    {
      header: "Status",
      render: (row) => <span>{statusMap[row.status]}</span>,
    },
    { header: "You Earn", accessor: "earnings" },
    {
      header: "Actions",
      render: (row) => (
        <Link
          href={`/orders/${row.id}`}
          className="flex items-center gap-2.5 text-[14px] leading-5 font-semibold text-[#27AE60] cursor-pointer"
        >
          <Image src={eyeGreen} alt="eye-icon" />
          <p>View</p>
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Table area */}
      <div className="flex-1">
        <Table
          columns={columns}
          data={orders}
          isLoading={isLoading}
          loadingRows={10}
        />
      </div>

      {/* Footer pinned to bottom */}
      <div
        className={`flex items-center justify-between pt-4 w-full mt-4 transition-opacity ${
          isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <ItemsPerPage />
        <Pagination totalItems={totalItems} perPage={perPage} />
      </div>
    </div>
  );
}
