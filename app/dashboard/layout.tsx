"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Search } from "lucide-react";
import { useState } from "react";

import { useGetProfileQuery } from "@/lib/features/profile/profileApi";

import useRequireAuth from "@/hooks/useRequireAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading: authLoading } = useRequireAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: userProfile, isLoading } = useGetProfileQuery();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isLoading={isLoading}
        userProfile={userProfile?.data}
      />
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <main className="p-4 lg:ml-64 pt-20 lg:pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Search Bar - Visible only on mobile, at the top of the section */}
          <div className="md:hidden w-full mb-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="mobile-search-layout"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 pe-12 p-3 outline-none shadow-sm"
                placeholder="Search for anything"
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-3 h-full text-white bg-primary rounded-e-lg border border-primary hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
