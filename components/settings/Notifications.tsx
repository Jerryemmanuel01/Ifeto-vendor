"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function Notifications() {
  const [settings, setSettings] = useState({
    newOrder: true,
    packaged: true,
    browserPush: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-[#FFFFFF] shadow-custom2 rounded-2xl p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
          Notifications
        </h1>
        <p className="text-[14px] leading-5 text-[#787878]">
          View all completed and pending payouts
        </p>
      </div>

      {/* Settings List */}
      <div className="space-y-6">
        {/* Email on new order */}
        <div className="flex items-center justify-between">
          <p className="text-[16px] text-[#5A5A5A]">Email on new order</p>
          <Switch
            checked={settings.newOrder}
            onCheckedChange={() => toggleSetting("newOrder")}
            className="data-[state=checked]:bg-[#27AE60]"
          />
        </div>

        {/* Email when packaged */}
        <div className="flex items-center justify-between">
          <p className="text-[16px] text-[#5A5A5A]">Email when packaged</p>
          <Switch
            checked={settings.packaged}
            onCheckedChange={() => toggleSetting("packaged")}
            className="data-[state=checked]:bg-[#27AE60]"
          />
        </div>

        {/* Browser push notifications */}
        <div className="flex items-center justify-between">
          <p className="text-[16px] text-[#5A5A5A]">
            Browser push notifications
          </p>
          <Switch
            checked={settings.browserPush}
            onCheckedChange={() => toggleSetting("browserPush")}
            className="data-[state=checked]:bg-[#27AE60]"
          />
        </div>
      </div>
    </div>
  );
}
