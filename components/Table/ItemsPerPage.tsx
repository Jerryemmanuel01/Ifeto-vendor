"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function ItemsPerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPage = searchParams.get("perPage") ?? "10";

  const update = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("perPage", value);
    params.set("page", "1");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden lg:flex items-center gap-3 text-[14px] text-[#5A5A5A] w-full">
      <p className="text-[20px] leading-[30px] text-[#606060]">
        Items per page
      </p>

      <Select value={perPage} onValueChange={update}>
        <SelectTrigger className="h-10 border-[#27AE60] text-[#27AE60] text-[16px] font-semibold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="7">7</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
