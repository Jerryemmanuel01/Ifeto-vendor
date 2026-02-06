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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] leading-8 font-medium text-[#2A2A2A]">
            Welcome, <span className="font-bold">Halimah Enterprise</span>
          </h1>
          <p>
            Review all recent activities and explore key insights right from
            your dashboard.
          </p>
        </div>

        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
