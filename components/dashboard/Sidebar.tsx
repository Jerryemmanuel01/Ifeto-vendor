"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  Headphones,
  Settings,
  LogOut,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/images/IFETO-Logo-1.png";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";
import { useLogoutUserMutation } from "@/lib/features/auth/authApi";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      if (typeof window !== "undefined") {
        localStorage.removeItem("ifetoVendorToken");
      }
      router.push("/auth/login");
      onClose();
    }
  };

  // For now, we assume user is in onboarding state
  const isOnboarding = true;

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      disabled: isOnboarding,
    },
    {
      name: "Products",
      icon: Package,
      href: "/dashboard/products",
      disabled: isOnboarding,
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      disabled: isOnboarding,
    },
    {
      name: "Analytics",
      icon: BarChart2,
      href: "/dashboard/analytics",
      disabled: isOnboarding,
    },
    {
      name: "Support",
      icon: Headphones,
      href: "/dashboard/support",
      disabled: isOnboarding,
    },
  ];

  const bottomItems = [
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      disabled: false, // Settings usually accessible
    },
    {
      name: "Logout",
      icon: LogOut,
      href: "/auth/login",
      disabled: false,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          {/* Logo */}
          <div className="mb-10 px-2 mt-2 hidden lg:block">
            <Image
              src={Logo}
              alt="IFETO Logo"
              width={120}
              height={40}
              className="w-auto h-10"
            />
          </div>

          {/* Mobile Close/Logo Header inside Sidebar? Optional, but typical Sidebar just has logo */}
          <div className="mb-10 px-2 mt-2 lg:hidden flex justify-between items-center">
            <Image
              src={Logo}
              alt="IFETO Logo"
              width={100}
              height={32}
              className="w-auto h-8"
            />
            {/* Could add a close button here if requested, but overlay click handles close */}
          </div>

          {/* Onboarding Status Badge (if applicable) */}
          {isOnboarding && (
            <div className="mx-2 mb-6 px-4 py-3 bg-primary rounded-md flex items-center justify-between text-white shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Onboarding</span>
              </div>
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">
                30%
              </div>
            </div>
          )}

          {/* Main Menu */}
          <ul className="space-y-1 font-medium flex-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link
                    href={item.disabled ? "#" : item.href}
                    onClick={
                      item.disabled ? (e) => e.preventDefault() : onClose
                    } // Close sidebar on mobile nav
                    className={`flex items-center p-3 rounded-lg group transition-colors ${
                      isActive && !item.disabled
                        ? "bg-[#E3FFEF] text-primary"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    } ${item.disabled ? "opacity-60 cursor-not-allowed hover:bg-transparent hover:text-gray-500" : ""}`}
                  >
                    <Icon
                      className={`w-5 h-5 transition duration-75 ${isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-900"}`}
                    />
                    <span className="ms-3 flex-1">{item.name}</span>
                    {item.disabled && (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Bottom Items */}
          <ul className="pt-4 mt-4 space-y-1 border-t border-gray-200 font-medium">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              if (item.name === "Logout") {
                return (
                  <li key={item.name}>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center p-3 rounded-lg group transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Icon className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900" />
                      <span className="ms-3">{item.name}</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center p-3 rounded-lg group transition-colors ${
                      isActive
                        ? "bg-[#E3FFEF] text-primary"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition duration-75 ${isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-900"}`}
                    />
                    <span className="ms-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
