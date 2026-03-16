"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MerticsCard from "../../components/dashboard/MerticsCard";
import purpleCube from "@/assets/svgs/purple-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import walletAdd from "@/assets/svgs/wallet-add.svg";
import add from "@/assets/svgs/add-green.svg";
import emptyIcon from "@/assets/svgs/empty-state.svg";
import clock from "@/assets/svgs/clock-orange.svg";
import Image from "next/image";
import EmptyState from "../../components/EmptyState";
import "swiper/css";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/general/DatePickerWithRange";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetOrderAssignmentsQuery, useGetOrderStatsQuery } from "@/lib/features/orders/ordersApi";
import OrderTable, { Order, OrderStatus } from "@/components/orders/OrderTable";
import { DateRange } from "react-day-picker";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeStatus = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sort") || "recent";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("perPage") || "10");
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;

  const updateUrl = (updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    if (!updates.page && updates.page !== page) {
      params.set("page", "1");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const {
    data: ordersData,
    isLoading,
    isFetching,
  } = useGetOrderAssignmentsQuery({
    page,
    limit,
    status: activeStatus === "all" ? undefined : activeStatus.toUpperCase(),
    startDate,
    endDate,
    sortOrder: sortBy === "recent" ? "desc" : "asc",
  });

  const { data: statsResponse, isLoading: isStatsLoading } = useGetOrderStatsQuery();
  const stats = statsResponse?.data;

  const mapAssignmentToOrder = (assignment: any): Order | null => {
    if (!assignment?.order) return null;
    const items = assignment.order.items || [];
    const orderId = assignment.orderId || "";
    const assignedAt = assignment.assignedAt || "";
    const status = assignment.status?.toLowerCase() || "";

    return {
      id: assignment.id,
      orderNumber:
        orderId.length >= 8 ? orderId.slice(0, 8).toUpperCase() : orderId,
      date: assignedAt.split("T")[0] || "",
      itemsCount: items.length,
      totalWeight:
        items.reduce(
          (sum: number, item: any) =>
            sum + (item.weightAtTime || 0) * item.quantity,
          0,
        ) + "kg",
      totalAmount: items.reduce(
        (sum: number, item: any) => sum + item.product.baseCost * item.quantity,
        0,
      ),
      earnings: items.reduce(
        (sum: number, item: any) => sum + item.product.baseCost * item.quantity,
        0,
      ),
      status: status as OrderStatus,
    } as Order;
  };

  const allOrders: Order[] =
    ordersData?.data?.assignments
      ?.map(mapAssignmentToOrder)
      .filter((order): order is Order => order !== null) || [];

  const totalItems = ordersData?.data?.meta?.total || allOrders.length;

  const filterOptions = [
    { label: "All orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Processing", value: "processing" },
    { label: "Ready", value: "ready" },
    { label: "Completed", value: "completed" },
  ];

  const getFilterStyle = (status: string, isActive: boolean) => {
    if (!isActive)
      return {
        container: "text-light hover:bg-gray-50",
        count: "text-light bg-[#EFEEEE]",
      };

    switch (status.toLowerCase()) {
      case "processing":
      case "pending":
        return {
          container: "bg-[#FFF8E6] text-[#F2C94C]",
          count: "bg-[#F2C94C] text-white",
        };
      case "ready":
        return {
          container: "bg-[#F3E8FF] text-[#9333EA]",
          count: "bg-[#9333EA] text-white",
        };
      case "shipped":
        return {
          container: "bg-[#E6F7FF] text-[#2F80ED]",
          count: "bg-[#2F80ED] text-white",
        };
      case "cancelled":
      case "rejected":
        return {
          container: "bg-[#FFEEEE] text-[#EB5757]",
          count: "bg-[#EB5757] text-white",
        };
      case "ready for pickup":
        return {
          container: "bg-[#F3E8FF] text-[#9333EA]",
          count: "bg-[#9333EA] text-white",
        };
      case "accepted":
      case "completed":
        return {
          container: "bg-[#E3FFEF] text-[#27AE60]",
          count: "bg-[#27AE60] text-white",
        };
      case "all":
      default:
        return {
          container: "bg-[#E3FFEF] text-primary",
          count: "bg-primary text-white",
        };
    }
  };

  const totalOrdersCount = isStatsLoading
    ? "..."
    : (stats?.pending || 0) +
      (stats?.accepted || 0) +
      (stats?.processing || 0) +
      (stats?.ready || 0) +
      (stats?.completed || 0) +
      (stats?.rejected || 0);

  return (
    <div className="bg-[#FAFAFA] space-y-8 min-h-screen h-full flex flex-col">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="md:space-y-2 space-y-3">
            <h1 className="md:text-[32px] text-[16px] md:leading-8 leading-6 font-medium text-[#2A2A2A]">
              Orders
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5">
              View and manage orders containing your products.
            </p>
          </div>

          <div className="px-5 py-2.5 border border-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semibold hidden md:flex items-center gap-2.5 cursor-pointer">
            <Image src={add} alt="add-icon" />
            Export to CSV
          </div>
        </div>

        <div
          className={`w-full grid xl:grid-cols-4 grid-cols-2 gap-4 transition-opacity ${
            isStatsLoading ? "opacity-50" : ""
          }`}
        >
          {/* 1. Earnings Overview */}
          <MerticsCard
            title="Available Earnings"
            value={isStatsLoading ? "..." : `₦${(stats?.availableBalance || 0).toLocaleString()}`}
            description="Cleared for withdrawal"
            icon={
              <Image src={walletAdd} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#E3FFEF"}
            breakdown={[
              { 
                label: "Pending Clearance", 
                value: isStatsLoading ? "..." : `₦${(stats?.pendingEarnings || 0).toLocaleString()}`,
                color: "#F59E0B" 
              },
            ]}
          />

          {/* 2. Total Orders */}
          <MerticsCard
            title="Total Orders"
            value={isStatsLoading ? "..." : totalOrdersCount.toLocaleString()}
            description="Lifetime orders"
            icon={
              <Image
                src={purpleCube}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#2E0BF51A"}
            breakdown={[
              { 
                label: "Completed", 
                value: isStatsLoading ? "..." : (stats?.completed || 0).toLocaleString(),
                color: "#10B981" 
              },
              { 
                label: "Rejected", 
                value: isStatsLoading ? "..." : (stats?.rejected || 0).toLocaleString(),
                color: "#EF4444" 
              }
            ]}
          />

          {/* 3. In Progress */}
          <MerticsCard
            title="In Progress"
            value={isStatsLoading ? "..." : ((stats?.processing || 0) + (stats?.ready || 0)).toLocaleString()}
            description="Currently being fulfilled"
            icon={
              <Image
                src={greenTruck}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#DBEAFE"} // Light Blue bg
            breakdown={[
              { 
                label: "Processing", 
                value: isStatsLoading ? "..." : (stats?.processing || 0).toLocaleString(),
                color: "#3B82F6" 
              },
              { 
                label: "Ready", 
                value: isStatsLoading ? "..." : (stats?.ready || 0).toLocaleString(),
                color: "#8B5CF6" 
              }
            ]}
          />

          {/* 4. New Requests */}
          <MerticsCard
            title="New Requests"
            value={isStatsLoading ? "..." : ((stats?.pending || 0) + (stats?.accepted || 0)).toLocaleString()}
            description="Awaiting action"
            icon={
              <Image src={clock} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#FEF3C7"} // Light Amber bg
            breakdown={[
              { 
                label: "Pending", 
                value: isStatsLoading ? "..." : (stats?.pending || 0).toLocaleString(),
                color: "#F59E0B" 
              },
              { 
                label: "Accepted", 
                value: isStatsLoading ? "..." : (stats?.accepted || 0).toLocaleString(),
                color: "#14B8A6" 
              }
            ]}
          />
        </div>
      </div>

      <div className="flex md:items-center items-start md:flex-row flex-col justify-between gap-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          freeMode
          observer
          observeParents
          className={`pb-2 w-full transition-opacity ${
            isFetching ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {filterOptions.map((option) => {
            const isActive = activeStatus === option.value;
            const styles = getFilterStyle(option.value, isActive);

            const getCountForStatus = (status: string) => {
              if (isStatsLoading) return "...";
              switch (status) {
                case "all":
                  return totalOrdersCount;
                case "pending":
                  return stats?.pending || 0;
                case "accepted":
                  return stats?.accepted || 0;
                case "rejected":
                  return stats?.rejected || 0;
                case "processing":
                  return stats?.processing || 0;
                case "ready":
                  return stats?.ready || 0;
                case "completed":
                  return stats?.completed || 0;
                default:
                  return 0;
              }
            };
            const count = getCountForStatus(option.value);

            return (
              <SwiperSlide key={option.value} className="!w-auto flex-shrink-0">
                <button
                  type="button"
                  disabled={isFetching}
                  onClick={() => updateUrl({ status: option.value })}
                  className={`
            inline-flex items-center gap-2
            px-4 py-2 rounded-[6px]
            font-medium cursor-pointer
            transition-colors duration-300
            ${styles.container}
          `}
                >
                  {option.label}
                  <span
                    className={`px-2 py-0.5 rounded-xl text-xs ${styles.count}`}
                  >
                    {isStatsLoading ? "..." : count}
                  </span>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div
          className={`overflow-x-auto w-full transition-opacity ${
            isFetching ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <div className="flex items-center md:justify-end justify-start gap-3 min-w-100 w-full">
            <DatePickerWithRange 
              initialStartDate={startDate}
              initialEndDate={endDate}
              onDateChange={(range) => {
                if (range?.from && range?.to) {
                  updateUrl({ 
                    startDate: range.from.toISOString(), 
                    endDate: range.to.toISOString() 
                  });
                } else if (!range?.from && !range?.to) {
                  // If cleared
                  updateUrl({ startDate: undefined, endDate: undefined });
                }
              }} 
            />

            <Select
              value={sortBy}
              disabled={isFetching}
              onValueChange={(value) => updateUrl({ sort: value })}
            >
              <SelectTrigger className="py-3 px-4 text-[16px] font-semibold">
                <SelectValue placeholder="Newest First" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="recent">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 flex w-full">
        {allOrders.length === 0 && !isLoading && !isFetching ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={emptyIcon}
              title="No orders found"
              description="Try adjusting your filters or date range."
              buttonText="Clear Filters"
              onButtonClick={() => {
                updateUrl({ status: "all", page: 1 });
              }}
            />
          </div>
        ) : (
          <div className="w-full">
            <OrderTable
              orders={allOrders}
              isLoading={isLoading || isFetching}
              totalItems={totalItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}
