"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetProductQuery,
  useDeleteProductMutation,
} from "@/lib/features/products/productsApi";
import {
  Loader2,
  ArrowLeft,
  Edit,
  Calendar,
  Package,
  Info,
  Scale,
  Layers,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Spinner from "@/components/loaders/Spinner";
import { toast } from "sonner";
import ConfirmationModal from "@/components/general/ConfirmationModal";

// SIMULATION MOCK DATA (Commented out for real implementation)
const product = {
  id: "mock-id-123",
  name: "Premium Nigerian Red Palm Oil (5 Liters)",
  category: { name: "Food & Beverages", id: "cat-1" },
  sellingPrice: 25000,
  baseCost: 20000,
  quantity: 50,
  weight: 5,
  description:
    "Authentic, unrefined red palm oil sourced directly from sustainable farms in Eastern Nigeria. Rich in Vitamin A and E, perfect for traditional soups and stews. No additives or preservatives.",
  images: [
    "https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1761839259494-71caddcdd6b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  ],
  status: "PUBLISHED",
  approvalStatus: "APPROVED",
  storageInstructions:
    "Store in a cool, dark place away from direct sunlight. Do not refrigerate.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const {
  //   data: productData,
  //   isLoading,
  //   error,
  // } = useGetProductQuery(id, {
  //   skip: !id,
  // });
  // const product = productData?.data;

  const isLoading = false;
  const error = null;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Set initial selected image when data loads
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
      router.push("/products");
    } catch (err) {
      toast.error("Failed to delete product");
      console.error("Delete error:", err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#FAFAFA]">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#FAFAFA]">
        <p className="text-lg font-semibold text-[#5A5A5A]">
          Product not found or failed to load.
        </p>
        <button
          onClick={() => router.back()}
          className="text-[#27AE60] hover:underline font-medium"
        >
          Go back
        </button>
      </div>
    );
  }

  // Helper for status badge
  const getStatusBadge = (status: string, approvalStatus: string) => {
    if (status === "DRAFT") {
      return (
        <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full font-medium">
          Draft
        </span>
      );
    }
    switch (approvalStatus) {
      case "APPROVED":
        return (
          <span className="px-3 py-1 text-sm bg-[#E3FFEF] text-[#27AE60] rounded-full font-medium">
            Approved
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-3 py-1 text-sm bg-[#FFE4E4] text-[#D32F2F] rounded-full font-medium">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm bg-[#FFF8E1] text-[#F59E0B] rounded-full font-medium">
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#787878] hover:text-[#2A2A2A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-semibold">Back</span>
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 border border-[#EF4444] text-[#EF4444] rounded-lg hover:bg-[#FEF2F2] transition-colors font-medium disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            <span>Delete</span>
          </button>

          <Link
            href={`/products/edit-product?id=${id}`}
            className="flex items-center gap-2 px-4 py-2 bg-[#27AE60] text-white rounded-lg hover:bg-[#219151] transition-colors font-medium"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Product</span>
          </Link>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        isLoading={isDeleting}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-white rounded-2xl shadow-sm border border-[#EFEEEE] overflow-hidden flex items-center justify-center relative">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="object-cover w-full h-full absolute inset-0"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <Package className="w-16 h-16 mb-2" />
                <span>No image available</span>
              </div>
            )}

            {/* Status Overlay */}
            <div className="absolute top-4 left-4">
              {getStatusBadge(product.status, product.approvalStatus)}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-[#27AE60]"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="object-cover w-full h-full absolute inset-0"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#EFEEEE] text-[#2A2A2A]">
          <div className="space-y-2 border-b border-[#EFEEEE] pb-6">
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 text-[#787878]">
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">
                {product.category?.name || "Uncategorized"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-[#787878] uppercase tracking-wider font-medium">
              Selling Price
            </span>
            <span className="text-3xl font-bold text-[#27AE60]">
              ₦
              {product.sellingPrice?.toLocaleString() ??
                product.baseCost?.toLocaleString()}
            </span>
            {product.baseCost && (
              <span className="text-sm text-[#787878]">
                Base Cost: ₦{product.baseCost.toLocaleString()}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#EFEEEE] space-y-1">
              <div className="flex items-center gap-2 text-[#787878] mb-1">
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Quantity</span>
              </div>
              <p className="text-lg font-semibold">
                {product.quantity}{" "}
                <span className="text-sm text-gray-500 font-normal">
                  in stock
                </span>
              </p>
            </div>

            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#EFEEEE] space-y-1">
              <div className="flex items-center gap-2 text-[#787878] mb-1">
                <Scale className="w-4 h-4" />
                <span className="text-sm font-medium">Weight</span>
              </div>
              <p className="text-lg font-semibold">
                {product.weight}{" "}
                <span className="text-sm text-gray-500 font-normal">kg</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Info className="w-5 h-5 text-[#787878]" />
              Description
            </h3>
            <p className="text-[#5A5A5A] leading-relaxed text-sm md:text-base">
              {product.description || "No description provided."}
            </p>
          </div>

          {product.storageInstructions && (
            <div className="space-y-3 pt-4 border-t border-[#EFEEEE]">
              <h3 className="text-lg font-semibold text-[#2A2A2A]">
                Storage Instructions
              </h3>
              <p className="text-[#5A5A5A] text-sm md:text-base bg-[#FFF8E1] p-4 rounded-lg border border-[#F59E0B]/20">
                {product.storageInstructions}
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-[#EFEEEE] flex flex-wrap gap-6 text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Last Updated: {new Date(product.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
