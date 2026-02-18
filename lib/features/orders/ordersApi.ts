import { apiSlice } from "@/lib/store/api/apiSlice";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "ACCEPTED"
  | "REJECTED"
  | "READY_FOR_PICKUP"
  | "COMPLETED";

export interface OrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    images: string[];
    baseCost: number;
    weight: number;
  };
  quantity: number;
  weightAtTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderAssignment {
  id: string;
  orderId: string;
  vendorId: string;
  status: OrderStatus;
  assignedAt: string;
  acceptedAt: string | null;
  processedAt: string | null;
  completedAt: string | null;
  rejectionReason: string | null;
  payoutStatus: string;
  order: {
    id: string;
    items: OrderItem[];
    status: string;
    createdAt: string;
  };
  customer?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface OrderAssignmentsResponse {
  success: boolean;
  message: string;
  data: OrderAssignment[];
  statusCode: number;
}

export interface OrderAssignmentResponse {
  success: boolean;
  message: string;
  data: OrderAssignment;
}

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderAssignments: builder.query<
      OrderAssignmentsResponse,
      { page?: number; limit?: number; status?: string }
    >({
      query: (params) => ({
        url: "/vendor/orders/assignments",
        params,
      }),
      providesTags: ["Orders"],
    }),
    getOrderAssignment: builder.query<OrderAssignmentResponse, string>({
      query: (id) => `/vendor/orders/assignments/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
    updateAssignmentStatus: builder.mutation<
      any,
      { id: string; status: OrderStatus; rejectionReason?: string }
    >({
      query: ({ id, status, rejectionReason }) => ({
        url: `/vendor/orders/assignments/${id}/status`,
        method: "PATCH",
        body: { status, rejectionReason },
      }),
      invalidatesTags: (result, error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),
  }),
});

export const {
  useGetOrderAssignmentsQuery,
  useGetOrderAssignmentQuery,
  useUpdateAssignmentStatusMutation,
} = ordersApi;
