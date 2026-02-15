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
import eyeGreen from "@/assets/svgs/eye-green.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PayoutDrawer from "./PayoutDrawer";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

type Order = {
  id: string; // Order ID
  orderNumber: string; // e.g. ORD-10234
  date: string; // ISO date
  itemsCount: number; // number of items
  totalWeight: string; // e.g. "3.2kg"
  totalAmount: number; // ₦
  status: OrderStatus;
  earnings: number;
};

type AnalyticsTableProps = {
  orders: Order[];
  isLoading: boolean;
};

export default function AnalyticsTable({
  orders,
  isLoading,
}: AnalyticsTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 7);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

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

    paid: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#34C7591A] text-[#34C759]">
        Paid
      </span>
    ),

    cancelled: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
        Cancelled
      </span>
    ),
  };

  const columns: Column<Order>[] = [
    {
      header: "Payout ID",
      render: (row) => (
        <p className="text-[14px] font-semibold text-[#5A5A5A]">{row.id}</p>
      ),
    },
    {
      header: "Order ID",
      render: (row) => (
        <p className="text-[14px] font-semibold text-[#5A5A5A]">
          {row.orderNumber}
        </p>
      ),
    },
    {
      header: "Amount",
      render: (row) => (
        <p className="font-semibold text-[#2A2A2A]">
          ₦{row.totalAmount.toLocaleString()}
        </p>
      ),
    },
    {
      header: "Items",
      accessor: "itemsCount",
    },
    {
      header: "Date",
      render: (row) => (
        <p>
          {new Date(row.date).toLocaleDateString()}{" "}
          {new Date(row.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      ),
    },
    {
      header: "Total Weight",
      render: (row) => (
        <p className="font-semibold text-[#2A2A2A]">{row.totalWeight}</p>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span className="text-sm font-medium">{statusMap[row.status]}</span>
      ),
    },
    {
      header: "You Earn",
      render: (row) => (
        <p className="text-green-600 font-semibold">
          ₦{row.earnings.toLocaleString()}
        </p>
      ),
    },

    {
      header: "Actions",
      render: (row) => (
        <div
          onClick={() => {
            setSelectedRow({
              orderId: row.orderNumber,
              payoutId: row.id,
              amount: row.totalAmount,
              status: "Paid",
              date: new Date(row.date).toLocaleDateString(),
            });
            setOpenDrawer(true);
          }}
          className="flex items-center gap-2 text-[14px] font-semibold text-[#27AE60] cursor-pointer"
        >
          <Image src={eyeGreen} alt="eye-icon" />
          <p>View</p>
        </div>
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
        <Pagination totalItems={90} perPage={perPage} />
      </div>

      <PayoutDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        data={selectedRow}
      />
    </div>
  );
}
