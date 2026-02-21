"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import arrowLeft from "@/assets/svgs/arrow-left.svg";
import statusIcon from "@/assets/svgs/status.svg";
import Image from "next/image";
import Table, { Column } from "@/components/Table/Table";
import { Link, MapPin, Loader2 } from "lucide-react";
import OrderTrackingSteps from "@/components/general/OrderTrackingSteps";
import { getTrackingSteps } from "@/utils/utils";
import { useParams, useRouter } from "next/navigation";
import {
  useGetOrderAssignmentQuery,
  useUpdateAssignmentStatusMutation,
  OrderStatus,
  OrderItem,
} from "@/lib/features/orders/ordersApi";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "@/components/loaders/Spinner";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const {
    data: orderData,
    isLoading,
    error,
  } = useGetOrderAssignmentQuery(id, { skip: !id });
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateAssignmentStatusMutation();

  const assignment = orderData?.data;

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [tempStatus, setTempStatus] = useState<OrderStatus | null>(null);

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    if (newStatus === "REJECTED") {
      setTempStatus(newStatus);
      setIsRejectModalOpen(true);
      return;
    }

    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    try {
      await updateStatus({
        id,
        status: "REJECTED",
        rejectionReason,
      }).unwrap();
      toast.success("Order rejected successfully");
      setIsRejectModalOpen(false);
      setRejectionReason("");
    } catch (err) {
      toast.error("Failed to reject order");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#FAFAFA]">
        <Spinner />
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#FAFAFA]">
        <p className="text-lg font-semibold text-[#5A5A5A]">Order not found.</p>
        <button
          onClick={() => router.back()}
          className="text-[#27AE60] hover:underline font-medium"
        >
          Go back
        </button>
      </div>
    );
  }

  const columns: Column<OrderItem>[] = [
    {
      header: "Item",
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.product.images?.[0] && (
            <div className="w-10 h-10 rounded overflow-hidden relative">
              <img
                src={row.product.images[0]}
                alt={row.product.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <p className="line-clamp-1 text-[14px] leading-5 font-semibold text-[#5A5A5A]">
            {row.product.name}
          </p>
        </div>
      ),
    },
    {
      header: "Quantity",
      accessor: "quantity",
    },
    {
      header: "Price",
      render: (row) => <p>₦{row.product.baseCost.toLocaleString()}</p>,
    },
    {
      header: "Total",
      render: (row) => (
        <p className="font-semibold text-[#2A2A2A]">
          ₦{(row.product.baseCost * row.quantity).toLocaleString()}
        </p>
      ),
    },
  ];

  const trackingSteps = getTrackingSteps({
    status: assignment.status,
    createdAt: assignment.assignedAt,
    // Map other dates if available in API, otherwise rely on status
    processedAt: assignment.processedAt || undefined,
    shippedAt: undefined,
    deliveredAt: assignment.completedAt || undefined,
  });

  // Helper for totals
  const items = assignment.order?.items || [];

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.baseCost * item.quantity,
    0,
  );
  const totalWeight = items.reduce(
    (sum, item) => sum + (item.weightAtTime || 0) * item.quantity,
    0,
  );

  return (
    <div className="bg-[#FAFAFA] space-y-6 min-h-screen h-full flex flex-col relative">
      {/* Rejection Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 h-screen">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
            <h3 className="text-lg font-semibold text-[#2A2A2A]">
              Reject Order
            </h3>
            <p className="text-sm text-[#787878]">
              Please provide a reason for rejecting this order.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Type your reason handling here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsRejectModalOpen(false);
                  setRejectionReason("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                disabled={isUpdating}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isUpdating ? "Rejecting..." : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex md:flex-col gap-2 md:py-6 py-3 md:px-8 px-6 shadow-custom2 flex-row">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <Image src={arrowLeft} alt="arrow-back" />
          <p className="text-[16px] leading-6 font-semibold text-[#787878]">
            back
          </p>
        </button>

        <div className="flex md:items-center justify-between md:flex-row flex-col gap-4 w-full">
          <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#5A5A5A] font-semibold">
            Order Details
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">
              Update Status:
            </span>
            <Select
              value={assignment.status}
              onValueChange={(val) => handleStatusUpdate(val as OrderStatus)}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="ACCEPTED">Accepted</SelectItem>
                  <SelectItem value="READY">Ready for Pickup</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-row w-full px-4 md:px-8">
        <div className="space-y-2">
          <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#2A2A2A]">
            Order #{assignment.orderId.slice(0, 8).toUpperCase()}
          </h1>
          <p className="md:text-[18px] text-[14px] md:leading-7 leading-5 text-[#787878]">
            Placed on {new Date(assignment.assignedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-2 text-right">
          <p className="py-1 px-4 bg-[#F59E0B1A] text-[#F59E0B] md:text-[16px] text-[12px] md:leading-6 leading-4.5 font-semibold w-fit rounded-3xl ml-auto">
            {assignment.status}
          </p>
          <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#2A2A2A]">
            You earn: ₦{totalAmount.toLocaleString()}
          </h1>
        </div>
      </div>

      <div className="border border-[#EFEEEE] rounded-lg mx-4 md:mx-8 bg-white">
        <Table
          columns={columns}
          data={assignment.order.items}
          isLoading={false}
          loadingRows={assignment.order.items.length}
        />
        <div className="flex items-end flex-col gap-2 w-full p-3 border-t border-gray-100">
          <div className="flex justify-between w-full max-w-[200px]">
            <p className="md:text-[16px] text-[14px] md:leading-6 text-[#787878]">
              Total Weight
            </p>
            <h3 className="text-[18px] leading-7 font-semibold text-[#2A2A2A]">
              {totalWeight ? `${totalWeight}kg` : "N/A"}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito mx-4 md:mx-8">
        <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold mb-4 md:mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-light" />
          Delivery Information
        </h2>

        {assignment.customer && (
          <div className="space-y-4">
            <div>
              <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
                Recipient
              </p>
              <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
                {assignment.customer.name}
              </p>
            </div>
            <div>
              <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
                Address
              </p>
              <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
                {assignment.customer.address}
              </p>
            </div>

            <div>
              <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
                Phone Number
              </p>
              <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
                {assignment.customer.phone}
              </p>
            </div>

            <div>
              <p className="md:text-[14px] md:leading text-[12px] text-[#787878] mb-2">
                Email Address
              </p>
              <p className="md:text-[16px] md:leading-6 text-[14px] leading-5 text-[#2A2A2A] font-semibold">
                {assignment.customer.email}
              </p>
            </div>
          </div>
        )}
        {!assignment.customer && (
          <p className="text-gray-500">No customer information available.</p>
        )}
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito mx-4 md:mx-8">
        <div className="flex items-center gap-2 flex-row mb-4 md:mb-6">
          <Image src={statusIcon} alt="" />
          <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
            Order Status Timeline
          </h2>
        </div>
        <OrderTrackingSteps steps={trackingSteps} />
      </div>
    </div>
  );
}
