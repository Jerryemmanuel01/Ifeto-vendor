import { apiSlice } from "@/lib/store/api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
