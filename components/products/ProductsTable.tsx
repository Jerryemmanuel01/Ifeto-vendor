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
import edit from "@/assets/svgs/edit.svg";
import Image from "next/image";

type Product = {
  product: {
    name: string;
    image: string;
  };
  category: string;
  weight?: string;
  price: number;
  stock: number;
  status: "pending" | "approved" | "rejected" | "draft";
  updatedAt: string;
};

type ProductsTableProps = {
  products: Product[];
  isLoading: boolean;
};

export default function ProductsTable({
  products,
  isLoading,
}: ProductsTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 7);

  const statusMap = {
    pending: (
      <span className="px-4 py-1 text-[16px] leading-6 capitalize rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
        Pending
      </span>
    ),
    approved: (
      <span className="px-4 py-1 text-[16px] leading-6 capitalize rounded-full bg-[#34C7591A] text-[#34C759]">
        Approved
      </span>
    ),
    rejected: (
      <span className="px-4 py-1 text-[16px] leading-6 capitalize rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
        Rejected
      </span>
    ),
    draft: (
      <span className="px-4 py-1 text-[16px] leading-6 capitalize rounded-full bg-[#EFEEEE] text-[#787878]">
        Draft
      </span>
    ),
  };

  const columns: Column<Product>[] = [
    {
      header: "Product",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded bg-[#EFEEEE] flex items-center justify-center">
            <img src={row.product.image} className="w-9 h-9 rounded" />
          </div>
          <span className="line-clamp-1 text-[14px] leading-5 font-semibold text-[#5A5A5A]">
            {row.product.name}
          </span>
        </div>
      ),
    },
    {
      header: "Category",
      render: (row) => <p className="line-clamp-2">{row.category}</p>,
    },
    { header: "Weight", accessor: "weight" },
    {
      header: "Price",
      render: (row) => (
        <p className="font-semibold text-[#2A2A2A]">{`₦${row.price.toLocaleString()}`}</p>
      ),
    },
    { header: "Stock", accessor: "stock" },
    {
      header: "Status",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span>{statusMap[row.status]}</span>
          {row.status === "rejected" && <Image src={rightIcon} alt="" />}
        </div>
      ),
    },
    { header: "Last Updated", accessor: "updatedAt" },
    {
      header: "Actions",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <Image src={moreIcon} alt="more" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="flex gap-2 px-2 py-4">
              <Image src={eye} alt="eye-icon" /> <span>View</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex gap-2 px-2 py-4">
              <Image src={edit} alt="edit-icon" /> <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex gap-2 px-2 py-4">
              <Image src={repeat} alt="repeat-icon" /> <span>Resubmit</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Table area */}
      <div className="flex-1">
        <Table
          columns={columns}
          data={products}
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
