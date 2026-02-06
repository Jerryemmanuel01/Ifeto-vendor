"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "../Pagination";
import { ItemsPerPage } from "../Table/ItemsPerPage";
import Table, { Column } from "../Table/Table";

type Order = {
  id: string;
  weight: string;
  time: string;
};

type OrdersTableProps = {
  orders: Order[];
  isLoading: boolean;
};

export default function OrdersTable({ orders, isLoading }: OrdersTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 7);

  const columns: Column<Order>[] = [
    { header: "Order ID", accessor: "id" },
    { header: "Weight", accessor: "weight" },
    { header: "Time Delegated", accessor: "time" },
    {
      header: "Actions",
      render: () => (
        <button className="w-fit bg-[#27AE60] text-white px-4 py-2 rounded-md font-medium">
          Mark as Packaged
        </button>
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
    </div>
  );
}
