import { apiSlice } from "@/lib/store/api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBankDetails: builder.mutation<any, any>({
      query: (body) => ({
        url: "/vendor/profile/bank-details",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    updatePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: "/vendor/profile/password",
        method: "PATCH",
        body,
      }),
      // Password change doesn't necessarily fundamentally change profile data displayed,
      // but invalidating Profile ensures consistency if needed.
    }),
    getProfile: builder.query<any, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateBankDetailsMutation,
  useUpdatePasswordMutation,
} = profileApi;
