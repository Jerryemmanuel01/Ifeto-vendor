"use client";

import { Bell, Search, Menu } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/images/IFETO-Logo-1.png";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 z-30 w-full lg:w-[calc(100%-16rem)] right-0 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="px-4 py-3 lg:px-6 lg:py-4 flex items-center justify-between">
        {/* Left Side: Mobile Logo / Desktop Search */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden">
            <Image
              src={Logo}
              alt="IFETO Logo"
              width={100}
              height={32}
              className="w-auto h-8"
            />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center w-full md:w-[630px]">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary focus:border-primary block w-full ps-10 p-2.5 outline-none"
                placeholder="Search for anything"
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-full border border-primary hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 px-6"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          </button>

          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
            HE
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
