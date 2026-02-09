"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MerticsCard from "../../components/dashboard/MerticsCard";
import purpleCube from "@/assets/svgs/purple-cube.svg";
import orangeCube from "@/assets/svgs/orange-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import walletAdd from "@/assets/svgs/wallet-add.svg";
import emptyIcon from "@/assets/svgs/empty-state.svg";
import add from "@/assets/svgs/add-white.svg";
import bag from "@/assets/svgs/bag-purple.svg";
import check from "@/assets/svgs/tick-circle-green.svg";
import clock from "@/assets/svgs/clock-orange.svg";
import danger from "@/assets/svgs/danger-red.svg";
import search from "@/assets/svgs/search-normal-light.svg";
import Image from "next/image";
import EmptyState from "../../components/EmptyState";
import OrdersTable from "../../components/dashboard/OrdersTable";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductsTable from "@/components/products/ProductsTable";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    status: searchParams.get("status") ?? "all",
    category: searchParams.get("category") ?? "all",
    sortBy: searchParams.get("sort") ?? "recent",
    search: searchParams.get("q") ?? "",
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.status !== "all") params.set("status", filters.status);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.sortBy !== "recent") params.set("sort", filters.sortBy);
    if (filters.search) params.set("q", filters.search);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  const products = [
    {
      id: "1",
      product: {
        name: "Fresh Cabbage",
        image: "/images/cabbage.png",
      },
      category: "Fruits & Vegetables",
      weight: "300g",
      price: 4200,
      stock: 85,
      status: "pending",
      updatedAt: "2025-12-23",
    },
    {
      id: "2",
      product: {
        name: "Fresh Cabbage",
        image: "/images/cabbage.png",
      },
      category: "Proteins",
      weight: undefined,
      price: 4200,
      stock: 20,
      status: "rejected",
      updatedAt: "2025-12-23",
    },
    {
      id: "3",
      product: {
        name: "Fresh Cabbage",
        image: "/images/cabbage.png",
      },
      category: "Tubers & Nuts",
      weight: "300g",
      price: 4200,
      stock: 31,
      status: "approved",
      updatedAt: "2025-12-23",
    },
    {
      id: "4",
      product: {
        name: "Fresh Cabbage",
        image: "/images/cabbage.png",
      },
      category: "Herbs & Spices",
      weight: "300g",
      price: 4200,
      stock: 12,
      status: "approved",
      updatedAt: "2025-12-23",
    },
    {
      id: "5",
      product: {
        name: "Fresh Cabbage",
        image: "/images/cabbage.png",
      },
      category: "Fruits & Vegetables",
      weight: "300g",
      price: 4200,
      stock: 14,
      status: "draft",
      updatedAt: "2025-12-23",
    },
  ];

  return (
    <div className="bg-[#FAFAFA] space-y-8 min-h-screen h-full flex flex-col">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="md:space-y-2 space-y-3">
            <h1 className="md:text-[32px] text-[16px] md:leading-8 leading-6 font-medium text-[#2A2A2A]">
              Products
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5">
              Manage your product listings and track their approval status.
            </p>
          </div>

          <Link
            href={"/products/add-product"}
            className="px-5 py-2.5 bg-[#27AE60] rounded-[6px] text-[18px] leading-8 text-white font-semibold hidden md:flex items-center gap-2.5 cursor-pointer"
          >
            <Image src={add} alt="add-icon" />
            Add New Products
          </Link>
        </div>

        <div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-4">
          <MerticsCard
            title="Total Products"
            value={0}
            description="All products you’ve added"
            icon={<Image src={bag} alt="" className="w-4 h-4 md:w-6 md:h-6" />}
            iconBg={"#2E0BF51A"}
          />
          <MerticsCard
            title="Approved"
            value={0}
            description="Live & visible to customers"
            icon={
              <Image src={check} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#E3FFEF"}
          />
          <MerticsCard
            title="Ready For Pickup"
            value={0}
            description="Awaiting courier"
            icon={
              <Image src={clock} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#F59E0B1A"}
          />
          <MerticsCard
            title="Rejected"
            value={0}
            description="Action required"
            icon={
              <Image src={danger} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#E53E3E1A"}
          />
        </div>
      </div>

      <div className="flex md:items-center items-start md:flex-row flex-col justify-between gap-4">
        <form className="md:max-w-[528px] w-full flex items-center">
          <div className="relative w-full">
            <input
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full bg-white h-12 rounded-2xl px-10 border-[0.6px] border-[#EFEEEE]"
              placeholder="Search by product name"
              maxLength={50}
            />

            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                className="absolute top-3.5 right-3 text-gray-400 text-sm"
              >
                ✕
              </button>
            )}

            <Image
              className="absolute top-3.5 left-3 w-5 h-5"
              src={search}
              alt="search"
            />
          </div>
        </form>

        <div className="overflow-x-auto w-full">
          <div className="flex items-center md:justify-end justify-start gap-3 min-w-[400px] w-full">
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="py-3 px-4 text-[16px] font-semibold">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.category}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="py-3 px-4 text-[16px] font-semibold">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="py-3 px-4 text-[16px] font-semibold">
                <SelectValue placeholder="Recently Updated" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 flex w-full">
        {products.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={emptyIcon}
              title="No products added yet"
              description="Start selling by adding your first product."
              buttonText="Add New Products"
              onButtonClick={() => router.push("/")}
            />
          </div>
        ) : (
          <div className="w-full">
            <ProductsTable products={products} isLoading={false} />
          </div>
        )}
      </div>
    </div>
  );
}
