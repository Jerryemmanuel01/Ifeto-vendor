import { apiSlice } from "@/lib/store/api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface VendorProfile {
  id: string;
  vendorId: string;
  businessName: string;
  country: string;
  state: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  weight: number;
  categoryId: string;
  images: string[];
  storageInstructions: string;
  status: string; // "PUBLISHED"
  quantity: number;
  approvalStatus: string; // "DRAFT" | "PENDING" | "APPROVED" | "REJECTED"
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  category: {
    id: string;
    name: string;
  };
  price: string; // "₦1900.00"
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    data: Product[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  approvalStatus?: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortBy?: "price" | "quantity" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface CreateProductRequest {
  name: string;
  description: string;
  baseCost: number;
  weight: number;
  quantity: number;
  categoryId: string;
  images: string[];
  storageInstructions: string;
  status: "DRAFT" | "PUBLISHED"; // Assuming these are valid statuses based on example
}

export interface UpdateProductRequest {
  id: string; // Needed for URL
  body: Partial<CreateProductRequest>;
}

export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface GetProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.categoryId && params.categoryId !== "all")
          queryParams.append("categoryId", params.categoryId);
        if (params?.search) queryParams.append("search", params.search);
        if (
          params?.approvalStatus &&
          (params.approvalStatus as string) !== "all"
        )
          queryParams.append("approvalStatus", params.approvalStatus);
        if (params?.status) queryParams.append("status", params.status);
        if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params?.sortOrder)
          queryParams.append("sortOrder", params.sortOrder);

        return `/vendor/products?${queryParams.toString()}`;
      },
      providesTags: ["Products"],
    }),
    getProduct: builder.query<GetProductResponse, string>({
      query: (id) => `/vendor/products/${id}`,
      // No specific tag invalidation needed generally, but could tag individually if needed
    }),
    createProduct: builder.mutation<any, CreateProductRequest>({
      query: (body) => ({
        url: "/vendor/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<any, UpdateProductRequest>({
      query: ({ id, body }) => ({
        url: `/vendor/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/vendor/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => "/categories",
      // Categories likely don't change often, but we could add a tag if needed.
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = productsApi;
