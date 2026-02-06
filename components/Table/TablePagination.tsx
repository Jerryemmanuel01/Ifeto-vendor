"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalItems: number;
  perPage: number;
};

export default function TablePagination({ totalItems, perPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const totalPages = Math.ceil(totalItems / perPage);

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 border rounded-md disabled:opacity-40"
      >
        ◀
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-2 rounded-md ${
            p === page ? "bg-[#27AE60] text-white" : "border text-[#5A5A5A]"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 border rounded-md disabled:opacity-40"
      >
        ▶
      </button>
    </div>
  );
}
