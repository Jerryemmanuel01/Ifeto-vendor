"use client";

import { Suspense, useState, useEffect } from "react";
import { Toaster } from "sonner";
import { Search } from "lucide-react";

import { usePathname } from "next/navigation";
import StoreProvider from "@/lib/providers/StoreProvider";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

import { useGetProfileQuery } from "@/lib/features/profile/profileApi";
import useRequireAuth from "@/hooks/useRequireAuth";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { loading: authLoading } = useRequireAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isDashboardRoute = pathname !== "/" && !pathname?.startsWith("/auth");

  const {
    data: userProfile,
    isLoading,
    error,
  } = useGetProfileQuery(undefined, {
    skip: !isDashboardRoute,
  });

  // Handle 401 error (unauthorized) with useEffect
  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      // Optional: Redirect to login or dispatch specific action
      // Usually baseQueryWithReauth handles logout/redirect logic,
      // but if we want explicit redirect here:
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
  }, [error]);

  // If loading auth state, show spinner
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  // If NOT a dashboard route (e.g. login, signup, landing), just render children
  if (!isDashboardRoute) {
    return <>{children}</>;
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
        <div className="">
          {/* Mobile search */}
          <div className="md:hidden w-full mb-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-white border border-gray-200 text-sm rounded-lg w-full ps-10 pe-12 p-3"
                placeholder="Search for anything"
              />
            </div>
          </div>

          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}
