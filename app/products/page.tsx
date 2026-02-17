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

import { useGetProductsQuery } from "@/lib/features/products/productsApi";

import { useDebounce } from "@/hooks/useDebounce";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    status: searchParams.get("status") ?? "all",
    category: searchParams.get("category") ?? "all",
    sortBy: searchParams.get("sort") ?? "recent",
    search: searchParams.get("q") ?? "",
  });

  const [searchTerm, setSearchTerm] = useState(filters.search);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Update filters when debounced search term changes
  useEffect(() => {
    setFilters((prev) => {
      if (prev.search === debouncedSearchTerm) return prev;
      return { ...prev, search: debouncedSearchTerm };
    });
  }, [debouncedSearchTerm]);

  // Pagination
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("perPage")) || 10;

  const { data: productsData, isLoading } = useGetProductsQuery({
    page,
    limit,
    categoryId: filters.category,
    search: filters.search,
    // Status and Sort are not explicitly supported by API swagger but requested in UI
    // status: filters.status,
    // sort: filters.sortBy
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.status !== "all") params.set("status", filters.status);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.sortBy !== "recent") params.set("sort", filters.sortBy);
    if (filters.search) params.set("q", filters.search);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  // Transform API data to match UI component structure
  const products =
    productsData?.data?.data?.map((item) => {
      let status: "pending" | "approved" | "rejected" | "draft" = "pending";

      if (item.status === "DRAFT") {
        status = "draft";
      } else if (item.status === "PUBLISHED") {
        if (item.approvalStatus === "APPROVED") status = "approved";
        else if (item.approvalStatus === "REJECTED") status = "rejected";
        else status = "pending";
      }

      return {
        id: item.id,
        product: {
          name: item.name,
          image: item.images?.[0] || "/images/placeholder.png", // Fallback image
        },
        category: item.category?.name || "Uncategorized",
        weight: item.weight ? `${item.weight}kg` : "N/A",
        price: item.sellingPrice,
        stock: item.quantity,
        status,
        updatedAt: item.updatedAt,
      };
    }) || [];

  const totalProducts = productsData?.data?.meta?.total || 0;
  // We can't calculate other status counts reliably without separate API calls or returning all data
  // For now, we will use the total for "Total Products" and 0 for others or roughly filter if implementing client side

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

        <div className="w-full grid xl:grid-cols-4 grid-cols-2 gap-4">
          <MerticsCard
            title="Total Products"
            value={totalProducts}
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

      <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center w-full transition-all">
        <form className="w-full lg:max-w-[450px] xl:max-w-[528px] flex items-center">
          <div className="relative w-full">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm bg-white h-10 rounded-xl px-10 border-[0.6px] border-[#EFEEEE] focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60] transition-all outline-none"
              placeholder="Search by product name"
              maxLength={50}
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute top-3 right-3 text-gray-400 text-sm hover:text-gray-600"
              >
                ✕
              </button>
            )}

            <Image
              className="absolute top-3 left-3 w-4 h-4 pointer-events-none"
              src={search}
              alt="search"
            />
          </div>
        </form>

        <div className="w-full lg:w-auto">
          <div className="grid grid-cols-3 gap-2 w-full">
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="h-10 px-2 md:px-4 text-xs md:text-sm font-semibold w-full bg-white">
                <SelectValue placeholder="Status" />
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
              <SelectTrigger className="h-10 px-2 md:px-4 text-xs md:text-sm font-semibold w-full bg-white">
                <SelectValue placeholder="Category" />
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
              <SelectTrigger className="h-10 px-2 md:px-4 text-xs md:text-sm font-semibold w-full bg-white">
                <SelectValue placeholder="Sort" />
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
        {!isLoading && products.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={emptyIcon}
              title="No products added yet"
              description="Start selling by adding your first product."
              buttonText="Add New Products"
              onButtonClick={() => router.push("/products/add-product")}
            />
          </div>
        ) : (
          <div className="w-full">
            <ProductsTable
              products={products}
              isLoading={isLoading}
              totalItems={totalProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
}
