"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  totalItems: number;
  perPage?: number;
}

function getPages(current: number, total: number): (number | "...")[] {
  const pages: (number | "...")[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

export default function Pagination({
  totalItems,
  perPage = 30,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / perPage);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const pages = getPages(currentPage, totalPages);

  return (
    <div className="w-full flex justify-between items-center gap-2">
      <div className="w-full lg:flex hidden justify-end gap-2.5">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 text-green-600 disabled:opacity-40 rounded"
        >
          <ChevronLeft
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            className="cursor-pointer"
          />
        </button>

        {pages.map((p, index) =>
          p === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-4 py-1 border rounded border-green-600 text-green-600 opacity-50 text-[16px] leading-6 font-semibold"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => goToPage(p)}
              className={`px-4 py-1 border rounded cursor-pointer text-[16px] leading-6 font-semibold ${
                currentPage === p
                  ? "bg-green-600 text-white border-green-600"
                  : "text-green-600 border-green-600"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-green-600 disabled:opacity-40 rounded"
        >
          <ChevronRight
            className="cursor-pointer"
            onClick={() =>
              currentPage < totalPages && goToPage(currentPage + 1)
            }
          />
        </button>
      </div>

      <div className="flex items-center justify-between w-full lg:hidden mt-6">
        {/* ← PREVIOUS */}
        <div
          onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
          className={`cursor-pointer flex items-center gap-1 text-[#27AE60] text-[14px] leading-5 font-semibold 
      ${currentPage === 1 ? "opacity-40 cursor-default" : ""}`}
        >
          <ChevronLeft />
          <p>Previous</p>
        </div>

        {/* Page X of Y */}
        <div className="text-[14px] leading-5 text-[#2A2A2A]">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </div>

        {/* NEXT → */}
        <div
          onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
          className={`cursor-pointer flex items-center gap-1 text-[#27AE60] text-[14px] leading-5 font-semibold 
      ${currentPage === totalPages ? "opacity-40 cursor-default" : ""}`}
        >
          <p>Next</p>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
