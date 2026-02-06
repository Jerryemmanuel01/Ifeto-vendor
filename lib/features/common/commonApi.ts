import { apiSlice } from "@/lib/store/api/apiSlice";

export const commonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<any[], void>({
      query: () => "/countries",
    }),
  }),
});

export const { useGetCountriesQuery } = commonApi;
