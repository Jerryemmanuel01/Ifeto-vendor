"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MerticsCard from "../../components/dashboard/MerticsCard";
import purpleCube from "@/assets/svgs/purple-cube.svg";
import orangeCube from "@/assets/svgs/orange-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import walletAdd from "@/assets/svgs/wallet-add.svg";
import walletAddGreen from "@/assets/svgs/wallet-add-green.svg";
import walletAddOrange from "@/assets/svgs/wallet-add-orange.svg";
import emptyIcon from "@/assets/svgs/Empty-state-analysis.svg";
import Image from "next/image";
import EmptyState from "../../components/EmptyState";
import OrdersTable from "../../components/dashboard/OrdersTable";
import clock from "@/assets/svgs/clock-orange.svg";
import dangerBlue from "@/assets/svgs/danger-blue.svg";
import danger from "@/assets/svgs/danger-red.svg";
import search from "@/assets/svgs/search-normal-light.svg";
import TopSellingProducts from "@/components/analytics/TopSellingProducts";
import AnalyticsTable, { Order } from "@/components/analytics/AnalyticsTable";

// ... (other imports)

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    status: searchParams.get("status") ?? "all",
    category: searchParams.get("category") ?? "all",
    sortBy: searchParams.get("sort") ?? "recent",
    search: searchParams.get("q") ?? "",
  });

  const [value, setValue] = useState(() => {
    return searchParams.get("range") ?? "";
  });

  useEffect(() => {
    if (!value) return;

    router.replace(`?range=${value}`, { scroll: false });
  }, [value, router]);

  const orders: Order[] = [
    {
      id: "PO-1024",
      orderNumber: "ORD-1024",
      date: "2026-02-14T10:42:00Z",
      itemsCount: 5,
      totalWeight: "300kg",
      totalAmount: 150000,
      status: "paid",
      earnings: 25000,
    },
    {
      id: "PO-1025",
      orderNumber: "ORD-1025",
      date: "2026-02-13T09:20:00Z",
      itemsCount: 3,
      totalWeight: "180kg",
      totalAmount: 90000,
      status: "paid",
      earnings: 15000,
    },
    {
      id: "PO-1026",
      orderNumber: "ORD-1026",
      date: "2026-02-12T08:15:00Z",
      itemsCount: 2,
      totalWeight: "120kg",
      totalAmount: 60000,
      status: "pending",
      earnings: 10000,
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.status !== "all") params.set("status", filters.status);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.sortBy !== "recent") params.set("sort", filters.sortBy);
    if (filters.search) params.set("q", filters.search);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  return (
    <div className="bg-[#FAFAFA] space-y-8 min-h-screen h-full flex flex-col">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="md:space-y-2 space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="md:text-[32px] text-[16px] md:leading-8 leading-6 font-medium text-[#2A2A2A]">
                Analytics
              </h1>

              <div className="block md:hidden">
                <Select value={value} onValueChange={setValue}>
                  <SelectTrigger className="w-fit text-[16px] md:leading-6 leading-[18px] text-[#484848] font-semibold">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup className="md:text-[16px] text-[12px] leading-6 text-[#484848] font-semibold">
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5">
              Track earnings and payout at a glance.
            </p>
          </div>

          <div className="hidden md:block">
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger className="w-fit text-[16px] md:leading-6 leading-[18px] text-[#484848] font-semibold">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup className="md:text-[16px] text-[12px] leading-6 text-[#484848] font-semibold">
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 bg-[#0088FF0A] border-l-3 border-[#0088FF] rounded-xl flex items-start gap-2.5">
          <Image src={dangerBlue} alt="verify-icon" />
          <div>
            <p className="text-[14px] leading-5 text-[#2563EB]">
              Payout Policy
            </p>
            <p className="text-[14px] leading-5 text-[#787878]">
              <span className="font-semibold">Note: </span>Payments are
              processed Net-30 after delivery confirmation. Funds typically
              arrive within 3-5 business days after processing.
            </p>
          </div>
        </div>

        <div className="w-full grid xl:grid-cols-4 grid-cols-2 gap-4">
          <MerticsCard
            title="All Time Earnings"
            value={"₦0.00"}
            description="In your local currency"
            icon={
              <Image src={walletAdd} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#9333EA1A"}
          />

          <MerticsCard
            title="Earnings This Month"
            value={"₦0.00"}
            description="What you earned this month"
            icon={
              <Image
                src={walletAddGreen}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#E3FFEF"}
          />

          <MerticsCard
            title="Earnings This Month"
            value={"₦0.00"}
            description="What you earned this month"
            icon={
              <Image
                src={walletAddGreen}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#E3FFEF"}
          />

          <MerticsCard
            title="Pending Payouts"
            value={"₦0.00"}
            description="Ready for payouts soon"
            icon={
              <Image
                src={walletAddOrange}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#F59E0B1A"}
          />

          <MerticsCard
            title="Total Orders"
            value={0}
            description="All orders you’ve had"
            icon={
              <Image
                src={purpleCube}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#9333EA1A"}
          />

          <MerticsCard
            title="Delivered Orders"
            value={0}
            description="All orders you’ve delivered"
            icon={
              <Image
                src={greenTruck}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#27AE601A"}
          />

          <MerticsCard
            title="Pending Orders"
            value={0}
            description="Action required"
            icon={
              <Image src={clock} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#F59E0B1A"}
          />

          <MerticsCard
            title="Cancelled Orders"
            value={0}
            description="All orders cancelled"
            icon={
              <Image src={danger} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#E53E3E1A"}
          />
        </div>
      </div>
      <div className="p-6 bg-[#FFFFFF] flex-1 flex flex-col rounded-[8px] space-y-6 h-full">
        {orders.length > 1 && (
          <>
            <TopSellingProducts />

            <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center w-full transition-all">
              <form className="w-full lg:max-w-[450px] xl:max-w-[528px] flex items-center">
                <div className="relative w-full">
                  <input
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    className="w-full text-sm bg-white h-10 rounded-xl px-10 border-[0.6px] border-[#EFEEEE] focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60] transition-all outline-none"
                    placeholder="Search by payout ID"
                    maxLength={50}
                  />

                  {filters.search && (
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, search: "" }))
                      }
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
                <div className="grid grid-cols-2 gap-2 w-full">
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
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex-1 flex w-full">
          {orders.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon={emptyIcon}
                title="No analytics yet"
                description="Your analytics will appear here soon."
              />
            </div>
          ) : (
            <div className="w-full">
              <AnalyticsTable orders={orders} isLoading={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
