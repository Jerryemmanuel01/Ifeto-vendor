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

import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "@/lib/features/products/productsApi";

import { useDebounce } from "@/hooks/useDebounce";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") ?? "all";
  const categoryId = searchParams.get("category") ?? "all";
  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") ?? "desc";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("perPage")) || 10;
  const q = searchParams.get("q") ?? "";

  const [searchTerm, setSearchTerm] = useState(q);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const updateUrl = (updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });
    // Reset to page 1 on filter change unless specifically setting page
    if (!updates.page) {
      params.set("page", "1");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Update URL when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== q) {
      updateUrl({ q: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, q]);

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit,
    categoryId,
    search: q,
    approvalStatus:
      status === "all" ? undefined : (status.toUpperCase() as any),
    sortBy: sortBy as any,
    sortOrder,
  });

  // Transform API data to match UI component structure
  const products =
    productsData?.data?.data?.map((item) => {
      let status: "pending" | "approved" | "rejected" | "draft" = "pending";

      if (item.approvalStatus === "DRAFT") status = "draft";
      else if (item.approvalStatus === "APPROVED") status = "approved";
      else if (item.approvalStatus === "REJECTED") status = "rejected";
      else status = "pending";

      return {
        id: item.id,
        product: {
          name: item.name,
          image: item.images?.[0] || "/images/placeholder.png",
        },
        category: item.category?.name || "Uncategorized",
        weight: item.weight ? `${item.weight}kg` : "N/A",
        price: item.price,
        stock: item.quantity,
        status,
        updatedAt: item.updatedAt || item.createdAt,
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
              value={status}
              onValueChange={(value) => updateUrl({ status: value })}
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
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={categoryId}
              onValueChange={(value) => updateUrl({ category: value })}
            >
              <SelectTrigger className="h-10 px-2 md:px-4 text-xs md:text-sm font-semibold w-full bg-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [newSortBy, newSortOrder] = value.split("-");
                updateUrl({ sortBy: newSortBy, sortOrder: newSortOrder });
              }}
            >
              <SelectTrigger className="h-10 px-2 md:px-4 text-xs md:text-sm font-semibold w-full bg-white">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="createdAt-desc">Newest</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">
                    Price (High to Low)
                  </SelectItem>
                  <SelectItem value="quantity-desc">
                    Stock (High to Low)
                  </SelectItem>
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
              isLoading={isLoading || isFetching}
              totalItems={totalProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
}
