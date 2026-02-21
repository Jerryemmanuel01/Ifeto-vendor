import { useSearchParams } from "next/navigation";
import { useGetTransactionsQuery } from "@/lib/features/wallet/walletApi";
import Table, { Column } from "../Table/Table";
import Pagination from "../Pagination";
import { ItemsPerPage } from "../Table/ItemsPerPage";

type Transaction = {
  id: string;
  referenceId: string;
  createdAt: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  type: string;
  description: string;
};

export default function PayoutHistory() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("perPage") || "10");

  const { data: transactionsData, isLoading } = useGetTransactionsQuery({
    page,
    limit,
    // type: "PAYOUT", // Optional: Filter by payout if desired
  });

  const transactions =
    transactionsData?.data?.data?.map((item) => ({
      id: item.id,
      referenceId: item.referenceId || "N/A",
      createdAt: item.createdAt,
      amount: item.amount,
      status: item.status,
      type: item.type,
      description: item.description,
    })) || [];

  const statusMap = {
    COMPLETED: (
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#34C7591A] text-[#34C759]">
        Completed
      </span>
    ),
    FAILED: (
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
        Failed
      </span>
    ),
    PENDING: (
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
        Pending
      </span>
    ),
  };

  const columns: Column<Transaction>[] = [
    {
      header: "Date",
      render: (row: Transaction) => (
        <p className="text-sm font-medium text-[#5A5A5A]">
          {new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      ),
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Reference",
      accessor: "referenceId",
    },
    {
      header: "Amount",
      render: (row: Transaction) => (
        <span className="text-sm font-semibold text-[#2A2A2A]">
          ₦{row.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row: Transaction) =>
        statusMap[row.status as keyof typeof statusMap] || row.status,
    },
  ];

  const totalItems = transactionsData?.data?.meta?.total || 0;

  return (
    <div className="bg-[#FFFFFF] shadow-custom2 rounded-2xl p-6 space-y-6 flex flex-col h-full">
      <div className="space-y-1">
        <h1 className="text-xl leading-8 font-semibold text-[#2A2A2A]">
          Transaction History
        </h1>
        <p className="text-sm leading-5 text-[#787878]">
          Track all your earnings, payouts, and adjustments.
        </p>
      </div>

      <div className="flex-1">
        <Table
          columns={columns}
          data={transactions}
          isLoading={isLoading}
          loadingRows={limit}
        />
      </div>

      <div
        className={`flex items-center justify-between pt-4 w-full mt-4 transition-opacity ${
          isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <ItemsPerPage />
        <Pagination totalItems={totalItems} perPage={limit} />
      </div>
    </div>
  );
}
