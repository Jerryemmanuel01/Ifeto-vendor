"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MerticsCard from "../../components/dashboard/MerticsCard";
import purpleCube from "@/assets/svgs/purple-cube.svg";
import orangeCube from "@/assets/svgs/orange-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import walletAdd from "@/assets/svgs/wallet-add.svg";
import add from "@/assets/svgs/add-green.svg";
import emptyIcon from "@/assets/svgs/empty-state.svg";
import bag from "@/assets/svgs/bag-purple.svg";
import check from "@/assets/svgs/tick-circle-green.svg";
import clock from "@/assets/svgs/clock-orange.svg";
import sms from "@/assets/svgs/sms.svg";
import book from "@/assets/svgs/book.svg";
import Image from "next/image";
import EmptyState from "../../components/EmptyState";
import OrdersTable from "../../components/dashboard/OrdersTable";

import { Tabs, TabList, Tab } from "react-tabs";
import "swiper/css";

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
import { DatePickerWithRange } from "@/components/general/DatePickerWithRange";
import { ChevronRight, MoveRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import OrderTable from "@/components/orders/OrderTable";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("status") || "All orders";
  const isLoading = false;

  const setActiveFilter = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus === "All orders") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

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

  const orders = [
    {
      id: "1",
      orderNumber: "ORD-1001",
      date: "2025-12-23",
      itemsCount: 3,
      totalWeight: "900g",
      totalAmount: 4200,
      earnings: 3800,
      status: "pending",
    },
    {
      id: "2",
      orderNumber: "ORD-1002",
      date: "2025-12-23",
      itemsCount: 1,
      totalWeight: "300g",
      totalAmount: 4200,
      earnings: 3500,
      status: "cancelled",
    },
    {
      id: "3",
      orderNumber: "ORD-1003",
      date: "2025-12-23",
      itemsCount: 2,
      totalWeight: "600g",
      totalAmount: 8400,
      earnings: 7600,
      status: "delivered",
    },
  ];

  const filterOptions = [
    "All orders",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
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
        return {
          container: "bg-[#FFEEEE] text-[#EB5757]",
          count: "bg-[#EB5757] text-white",
        };
      case "delivered":
        return {
          container: "bg-[#F3E8FF] text-[#9333EA]",
          count: "bg-[#9333EA] text-white",
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
    <div className="bg-[#FAFAFA] space-y-8  h-full flex flex-col">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="md:space-y-2 space-y-3">
            <h1 className="md:text-[32px] text-[16px] md:leading-8 leading-6 font-medium text-[#2A2A2A]">
              Support
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5">
              Get quick answers or reach our support team if you need help.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#FFFFFF] md:p-6 p-4 shadow-custom2 flex items-start md:gap-4.75 gap-2.5 rounded-2xl">
          <div className="bg-[#2E0BF51A] md:p-3 p-1.5 w-fit rounded-xl ">
            <Image src={book} alt="book" className="w-6 h-6" />
          </div>

          <div className="space-y-[26px] w-full">
            <div className="space-y-2">
              <h3 className="md:text-[18px] md:leading-7 text-[16px] leading-4 font-semibold text-[#2A2A2A]">
                FAQs
              </h3>
              <p className="text-[16px] leading-6 text-[#787878]">
                Find answers to common questions about products, orders,
                payouts, and compliance.
              </p>
            </div>

            <Link
              href={""}
              className="flex items-start gap-2.5 text-[#27AE60] text-[18px] leading-7 font-semibold"
            >
              <p>View FAQs</p>
              <MoveRight />
            </Link>
          </div>
        </div>

        <div className="bg-[#FFFFFF] md:p-6 p-4 shadow-custom2 flex items-start md:gap-4.75 gap-2.5 rounded-2xl">
          <div className="bg-[#E3FFEF] md:p-3 p-1.5 w-fit rounded-xl ">
            <Image src={sms} alt="sms" className="w-6 h-6" />
          </div>

          <div className="space-y-[26px] w-full">
            <div className="space-y-2">
              <h3 className="md:text-[18px] md:leading-7 text-[16px] leading-4 font-semibold text-[#2A2A2A]">
                Contact Support
              </h3>
              <p className="text-[16px] leading-6 text-[#787878]">
                Can't find what you're looking for? Send us an email and we'll
                assist you.
              </p>
            </div>

            <button className="w-full h-12 bg-[#27AE60] rounded-[6px] text-[18px] leading-8 text-white font-semibold cursor-pointer">
              Email Support
            </button>
          </div>
        </div>
      </div>

      <p className="text-[16px] leading-6 text-[#787878] text-center">
        Support hours: Monday–Friday, 9am–5pm (WAT)
      </p>
    </div>
  );
}
