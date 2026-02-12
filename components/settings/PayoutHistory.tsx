import Table, { Column } from "../Table/Table";

type Payout = {
  id: string;
  reference: string;
  date: string;
  amount: number;
  status: "paid" | "failed" | "pending";
};

export default function PayoutHistory() {
  const isLoading = false;

  const payouts: Payout[] = [
    {
      id: "1",
      reference: "PAYOUT-1001",
      date: "2025-12-23",
      amount: 3800,
      status: "paid",
    },
    {
      id: "2",
      reference: "PAYOUT-1002",
      date: "2025-12-22",
      amount: 3500,
      status: "failed",
    },
    {
      id: "3",
      reference: "PAYOUT-1003",
      date: "2025-12-21",
      amount: 7600,
      status: "pending",
    },
  ];

  const statusMap = {
    paid: (
      <span className="px-4 py-1 text-[14px] font-medium rounded-full bg-[#34C7591A] text-[#34C759]">
        Paid
      </span>
    ),
    failed: (
      <span className="px-4 py-1 text-[14px] font-medium rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
        Failed
      </span>
    ),
    pending: (
      <span className="px-4 py-1 text-[14px] font-medium rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
        Pending
      </span>
    ),
  };

  const columns: Column<Payout>[] = [
    {
      header: "Date",
      render: (row) => (
        <p className="text-[14px] font-medium text-[#5A5A5A]">{row.date}</p>
      ),
    },
    {
      header: "Reference",
      accessor: "reference",
    },
    {
      header: "Amount",
      render: (row) => (
        <span className="font-semibold text-[#2A2A2A]">
          ₦{row.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => statusMap[row.status],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] shadow-custom2 rounded-2xl p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
          Payout History
        </h1>
        <p className="text-[14px] leading-5 text-[#787878]">
          Track all payouts sent to your bank account
        </p>
      </div>

      <Table
        columns={columns}
        data={payouts}
        isLoading={isLoading}
        loadingRows={10}
      />
    </div>
  );
}
