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
import { useGetOrderAssignmentsQuery } from "@/lib/features/orders/ordersApi";
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
  });

  // Fetch summary batch for counts and metrics (limit 1000)
  const { data: summaryData, isLoading: isSummaryLoading } =
    useGetOrderAssignmentsQuery({ limit: 1000 });

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
    ordersData?.data
      ?.map(mapAssignmentToOrder)
      .filter((order): order is Order => order !== null) || [];

  const summaryOrders: Order[] =
    summaryData?.data
      ?.map(mapAssignmentToOrder)
      .filter((order): order is Order => order !== null) || [];

  const totalItems = allOrders.length;

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

  // Metrics Calculation based on summary (Total)
  const totalOrdersCount = isSummaryLoading ? "..." : summaryOrders.length;
  const totalWeight = isSummaryLoading
    ? "..."
    : summaryOrders
        .reduce(
          (sum, order) => sum + parseFloat(order.totalWeight.replace("kg", "")),
          0,
        )
        .toFixed(2) + "kg";
  const totalEarnings = summaryOrders.reduce(
    (sum, order) => sum + order.earnings,
    0,
  );
  const pendingOrdersCount = isSummaryLoading
    ? "..."
    : summaryOrders.filter((o) => o.status === "pending").length;

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
            isSummaryLoading ? "opacity-50" : ""
          }`}
        >
          <MerticsCard
            title="Total Orders"
            value={totalOrdersCount}
            description="All orders you’ve had"
            icon={
              <Image
                src={purpleCube}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#2E0BF51A"}
          />
          <MerticsCard
            title="Total Weight Processed"
            value={totalWeight}
            description="Across all orders"
            icon={
              <Image
                src={greenTruck}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#E3FFEF"}
          />
          <MerticsCard
            title="Total Earnings"
            value={isSummaryLoading ? "..." : `₦${totalEarnings.toLocaleString()}`}
            description="In your local currency"
            icon={
              <Image src={walletAdd} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#9333EA1A"}
          />
          <MerticsCard
            title="Pending Orders"
            value={pendingOrdersCount}
            description="Action required"
            icon={
              <Image src={clock} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#F59E0B1A"}
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

            const count =
              option.value === "all"
                ? summaryOrders.length
                : summaryOrders.filter((o) => o.status === option.value).length;

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
                    {isSummaryLoading ? "..." : count}
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
            <DatePickerWithRange onDateChange={() => {}} />

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
        {allOrders.length === 0 && !isLoading ? (
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
              isLoading={isLoading}
              totalItems={totalItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}
