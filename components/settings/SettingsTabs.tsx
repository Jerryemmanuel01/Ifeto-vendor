"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {
  HiOutlineBuildingOffice2,
  HiOutlineCreditCard,
  HiOutlineLockClosed,
  HiOutlineBanknotes,
  HiOutlineBell,
} from "react-icons/hi2";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import BusinessDetails from "./BusinessDetails";
import BankPayoutDetails from "./BankPayoutDetails";
import Security from "./Security";
import PayoutHistory from "./PayoutHistory";
import Notifications from "./Notifications";

const settingsTabs = [
  {
    label: "Business Details",
    icon: HiOutlineBuildingOffice2,
    value: "business",
  },
  {
    label: "Bank & Payout",
    icon: HiOutlineCreditCard,
    value: "bank",
  },
  {
    label: "Security",
    icon: HiOutlineLockClosed,
    value: "security",
  },
  {
    label: "Payout History",
    icon: HiOutlineBanknotes,
    value: "payout",
  },
  {
    label: "Notifications",
    icon: HiOutlineBell,
    value: "notifications",
  },
];

export default function SettingsTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isSidebarSettingsOpen, setIsSidebarSettingOpen] = useState(false);

  const activeTab = searchParams.get("tab") || "business";

  const selectedIndex = settingsTabs.findIndex(
    (tab) => tab.value === activeTab,
  );

  const handleSelect = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", settingsTabs[index].value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });

    setIsSidebarSettingOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      itemName: "",
      description: "",
      baseCost: "",
      weight: "",
      category: "", // This will store the category ID
      quantity: "",
      storageInstructions: "",
      images: [] as { file: File; error?: string; url?: string }[],
    },
    // validationSchema: AddProductSchema,
    validateOnMount: true,
    onSubmit: async (values) => {},
  });

  return (
    <Tabs
      selectedIndex={selectedIndex === -1 ? 0 : selectedIndex}
      onSelect={handleSelect}
      className="w-full relative"
    >
      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Settings</h2>

        <button
          onClick={() => setIsSidebarSettingOpen(true)}
          className="px-3 py-2 bg-gray-100 rounded-md text-sm"
        >
          Menu
        </button>
      </div>

      {/* OVERLAY */}
      {isSidebarSettingsOpen && (
        <div
          onClick={() => setIsSidebarSettingOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto
          w-72 md:w-full
          bg-white md:bg-transparent
          z-50 md:z-auto
          transform transition-transform duration-300
          ${isSidebarSettingsOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          shadow-lg md:shadow-none
        `}
      >
        <TabList
          className="
            flex flex-col md:flex-row
            gap-4
            p-6 md:p-0
            border-r md:border-r-0
            md:border-b border-gray-200
          "
        >
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <Tab
                key={tab.value}
                className="
                  flex items-center gap-2
                  p-4 
                  rounded-lg
                  text-sm font-medium
                  cursor-pointer
                  text-gray-600
                  transition-all duration-200
                  focus:outline-none
                "
                selectedClassName="!bg-[#E6F4EA] !text-[#27AE60]"
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </Tab>
            );
          })}
        </TabList>
      </div>

      {/* CONTENT */}
      <div className="md:mt-6 mt-4">
        <TabPanel>
          <BusinessDetails />
        </TabPanel>

        <TabPanel>
          <BankPayoutDetails />
        </TabPanel>

        <TabPanel>
          <Security />
        </TabPanel>

        <TabPanel>
          <PayoutHistory />
        </TabPanel>

        <TabPanel>
          <Notifications />
        </TabPanel>
      </div>
    </Tabs>
  );
}
