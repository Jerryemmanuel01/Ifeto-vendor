import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTrackingSteps = (order: any) => {
  if (!order) return [];

  const {
    status: statusKey,
    createdAt,
    processedAt,
    shippedAt,
    deliveredAt,
  } = order;

  const status = statusKey?.toUpperCase();
  const isCancelled = status === "CANCELED" || status === "CANCELLED";

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return undefined;
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return [
    {
      status: "Order Placed",
      date: formatDate(createdAt),
      time: formatTime(createdAt),
      completed:
        !isCancelled &&
        ["PENDING", "PROCESSING", "INTRANSIT", "SHIPPED", "DELIVERED"].includes(
          status,
        ),
    },
    {
      status: "Verified & Packed",
      date: formatDate(processedAt),
      time: formatTime(processedAt),
      completed:
        !isCancelled &&
        ["PROCESSING", "INTRANSIT", "SHIPPED", "DELIVERED"].includes(status),
    },
    {
      status: "Shipped from warehouse",
      date: formatDate(shippedAt),
      time: formatTime(shippedAt),
      completed:
        !isCancelled && ["INTRANSIT", "SHIPPED", "DELIVERED"].includes(status),
    },
    {
      status: "Out for delivery",
      date: formatDate(shippedAt), // placeholder
      time: formatTime(shippedAt),
      completed: !isCancelled && ["INTRANSIT", "DELIVERED"].includes(status),
    },
    {
      status: "Delivered",
      date: formatDate(deliveredAt),
      time: formatTime(deliveredAt),
      completed: !isCancelled && status === "DELIVERED",
    },
  ];
};

export const formatNumberWithCommas = (value: string) => {
  if (!value) return "";

  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
};
