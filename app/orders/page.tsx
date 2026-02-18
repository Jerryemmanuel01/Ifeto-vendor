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

  // ----- 1. State for Filters -----
  const [activeStatus, setActiveStatus] = useState(
    searchParams.get("status") || "All orders",
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "recent");

  // Sync 'status' from URL if it changes externally
  useEffect(() => {
    const statusFromUrl = searchParams.get("status");
    if (statusFromUrl) setActiveStatus(statusFromUrl);
  }, [searchParams]);

  const handleStatusChange = (newStatus: string) => {
    setActiveStatus(newStatus);
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus === "All orders") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // ----- 2. Fetch Data (Get All/Large Batch for Client-side processing) -----
  // Note: Since API doesn't support pagination meta, we fetch a large limit
  // to perform client-side pagination and filtering.
  const { data: ordersData, isLoading } = useGetOrderAssignmentsQuery({
    page: 1,
    limit: 1000,
  });

  // ----- 3. Process Data (Map -> Filter -> Sort) -----
  const allOrders: Order[] =
    ordersData?.data
      ?.map((assignment) => {
        // Defensive check: Ensure assignment.order exists
        if (!assignment?.order) {
          console.warn("Missing order details for assignment:", assignment.id);
          return null;
        }

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
              (sum, item) => sum + (item.weightAtTime || 0) * item.quantity,
              0,
            ) + "kg", // Calculated from items
          totalAmount: items.reduce(
            (sum, item) => sum + item.product.baseCost * item.quantity,
            0,
          ),
          earnings: items.reduce(
            (sum, item) => sum + item.product.baseCost * item.quantity,
            0,
          ), // Assuming totalAmount is earnings for now
          status: status as OrderStatus,
        } as Order;
      })
      .filter((order): order is Order => order !== null) || [];

  const filteredOrders = allOrders.filter((order) => {
    // A. Status Filter
    if (
      activeStatus !== "All orders" &&
      order.status !== activeStatus.toLowerCase().replace(/ /g, "_")
    ) {
      return false;
    }

    // B. Date Range Filter
    if (dateRange?.from) {
      const orderDate = new Date(order.date);
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);

      if (dateRange.to) {
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);
        if (orderDate < fromDate || orderDate > toDate) return false;
      } else {
        if (orderDate < fromDate) return false;
      }
    }

    return true;
  });

  // C. Sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    // Default: recent / newest first
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // ----- 4. Pagination Logic -----
  const currentPage = Number(searchParams.get("page") ?? 1);
  const itemsPerPage = Number(searchParams.get("perPage") ?? 10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // ----- 5. Metrics Calculation (Based on ALL data or Filtered data?) -----
  // Usually metrics reflect the *filtered* view or *total* view.
  // Let's make them reflect the Total view (independent of filters) except "Pending"
  const totalOrdersCount = allOrders.length;
  const totalWeight =
    allOrders.reduce(
      (sum, order) => sum + parseFloat(order.totalWeight.replace("kg", "")),
      0,
    ) + "kg";
  const totalEarnings = allOrders.reduce(
    (sum, order) => sum + order.earnings,
    0,
  );
  const pendingOrdersCount = allOrders
    .filter((o) => o.status === "pending")
    .filter((o) => o.status === "pending").length;

  const filterOptions = [
    "All orders",
    "Pending",
    "Accepted",
    "Rejected",
    "Ready for Pickup",
    "Completed",
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
      case "delivered":
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
      case "all orders":
      default:
        return {
          container: "bg-[#E3FFEF] text-primary",
          count: "bg-primary text-white",
        };
    }
  };

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

        <div className="w-full grid xl:grid-cols-4 grid-cols-2 gap-4">
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
            value={`₦${totalEarnings.toLocaleString()}`}
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
          className="mt-6 pb-2 w-full"
        >
          {filterOptions.map((option) => {
            const isActive = activeStatus === option;
            const styles = getFilterStyle(option, isActive);
            // Count for each tab
            const count =
              option === "All orders"
                ? allOrders.length
                : allOrders.filter(
                    (o) => o.status === option.toLowerCase().replace(/ /g, "_"),
                  ).length;

            return (
              <SwiperSlide key={option} className="!w-auto flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleStatusChange(option)}
                  className={`
            inline-flex items-center gap-2
            px-4 py-2 rounded-[6px]
            font-medium cursor-pointer
            transition-colors duration-300
            ${styles.container}
          `}
                >
                  {option}
                  <span
                    className={`px-2 py-0.5 rounded-xl text-xs ${styles.count}`}
                  >
                    {isLoading ? "..." : count}
                  </span>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="overflow-x-auto w-full">
          <div className="flex items-center md:justify-end justify-start gap-3 min-w-100 w-full">
            <DatePickerWithRange onDateChange={setDateRange} />

            <Select value={sortBy} onValueChange={handleSortChange}>
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
        {paginatedOrders.length === 0 && !isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={emptyIcon}
              title="No orders found"
              description="Try adjusting your filters or date range."
              buttonText="Clear Filters"
              onButtonClick={() => {
                setActiveStatus("All orders");
                setDateRange(undefined);
                router.replace(pathname);
              }}
            />
          </div>
        ) : (
          <div className="w-full">
            <OrderTable
              orders={paginatedOrders}
              isLoading={isLoading}
              totalItems={filteredOrders.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}
