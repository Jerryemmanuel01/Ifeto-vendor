import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, tokenReceived } from "@/lib/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("ifetoVendorToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Attempt to renew token
    const refreshResult = await baseQuery(
      {
        url: "/auth/vendor/renew-tokens",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // Allow for different response structures
      const data = refreshResult.data as any;
      const newToken = data.accessToken || data.token;

      if (newToken) {
        // Store new token
        if (typeof window !== "undefined") {
          localStorage.setItem("ifetoVendorToken", newToken);
        }
        // Update Redux state
        api.dispatch(tokenReceived(newToken));

        // Retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // No token in response, logout
        api.dispatch(logout());
        if (typeof window !== "undefined") {
          localStorage.removeItem("ifetoVendorToken");
        }
        // Optional: redirect to login
        // window.location.href = "/auth/login";
      }
    } else {
      // Refresh failed, logout
      api.dispatch(logout());
      if (typeof window !== "undefined") {
        localStorage.removeItem("ifetoVendorToken");
      }
      // Optional: redirect to login
      // window.location.href = "/auth/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile", "Products", "Orders"],
  endpoints: (builder) => ({}),
});
