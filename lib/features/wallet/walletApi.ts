import { apiSlice } from "@/lib/store/api/apiSlice";

export interface Transaction {
  id: string;
  walletId: string;
  type: "EARNING" | "PAYOUT" | "REFUND" | "ADJUSTMENT";
  status: "PENDING" | "COMPLETED" | "FAILED";
  amount: number;
  referenceId: string;
  description: string;
  metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  success: boolean;
  message: string;
  data: {
    data: Transaction[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  statusCode: number;
}

export interface GetTransactionsParams {
  page?: number | string;
  limit?: number | string;
  type?: "EARNING" | "PAYOUT" | "REFUND" | "ADJUSTMENT";
}

export const walletApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionsResponse, GetTransactionsParams>(
      {
        query: (params) => {
          const queryParams = new URLSearchParams();
          if (params?.page) queryParams.append("page", params.page.toString());
          if (params?.limit)
            queryParams.append("limit", params.limit.toString());
          if (params?.type && params.type !== ("ALL" as any))
            queryParams.append("type", params.type);

          return `/vendor/wallet/transactions?${queryParams.toString()}`;
        },
        providesTags: ["Wallet" as any],
      },
    ),
  }),
});

export const { useGetTransactionsQuery } = walletApi;
