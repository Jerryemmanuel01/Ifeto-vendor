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
import emptyIcon from "@/assets/svgs/empty-state.svg";
import Image from "next/image";
import EmptyState from "../../components/EmptyState";
import OrdersTable from "../../components/dashboard/OrdersTable";

import BusinessInfoForm from "@/components/onboarding/BusinessInfoForm";
import BusinessDocumentForm from "@/components/onboarding/BusinessDocumentForm";
import AccountDetailsForm from "@/components/onboarding/AccountDetailsForm";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import { useGetProfileQuery } from "@/lib/features/profile/profileApi";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(() => {
    return searchParams.get("range") ?? "";
  });

  useEffect(() => {
    if (!value) return;

    router.replace(`?range=${value}`, { scroll: false });
  }, [value, router]);

  const orders = [
    { id: "#1024", weight: "300kg", time: "10:42 AM" },
    { id: "#1025", weight: "300kg", time: "10:42 AM" },
    { id: "#1026", weight: "300kg", time: "10:42 AM" },
  ];

  const { data: response, isLoading } = useGetProfileQuery();
  const user = response?.data;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const isOnboarding = user?.onboarding?.status !== "COMPLETE";

  if (isOnboarding) {
    return (
      <div className="flex flex-col gap-6">
        <OnboardingSteps />

        {/* Conditional Rendering of Forms based on Onboarding Status */}
        {!user?.onboarding?.isBusinessInfoComplete && <BusinessInfoForm />}

        {user?.onboarding?.isBusinessInfoComplete &&
          !user?.onboarding?.isDocumentsComplete && <BusinessDocumentForm />}

        {user?.onboarding?.isBusinessInfoComplete &&
          user?.onboarding?.isDocumentsComplete &&
          !user?.onboarding?.isAccountDetailsComplete && <AccountDetailsForm />}
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] space-y-8 min-h-screen h-full flex flex-col">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="md:space-y-2 space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="md:text-[32px] text-[16px] md:leading-8 leading-6 font-medium text-[#2A2A2A]">
                Welcome, <span className="font-bold">Halimah Enterprise</span>
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
              Review all recent activities and explore key insights right from
              your dashboard.
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

        <div className="w-full grid xl:grid-cols-4 grid-cols-2 gap-4">
          <MerticsCard
            title="New Orders"
            value={0}
            description="All new orders you have"
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
            title="Awaiting Packaging"
            value={0}
            description="Order ready to package"
            icon={
              <Image
                src={orangeCube}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#F59E0B1A"}
          />
          <MerticsCard
            title="Ready For Pickup"
            value={0}
            description="Awaiting courier"
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
            title="Total Earnings"
            value={0}
            description="In your local currency"
            icon={
              <Image src={walletAdd} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#9333EA1A"}
          />
        </div>
      </div>
      <div className="p-6 bg-[#FFFFFF] flex-1 flex flex-col rounded-[8px] space-y-6 h-full">
        <h3 className="text-[24px] leading-8 font-bold text-[#2A2A2A]">
          Today’s Orders
        </h3>

        <div className="flex-1 flex w-full">
          {orders.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon={emptyIcon}
                title="No orders received yet"
                description="Your new orders will show up here."
              />
            </div>
          ) : (
            <div className="w-full">
              <OrdersTable orders={orders} isLoading={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
