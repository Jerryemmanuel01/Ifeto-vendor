import { apiSlice } from "@/lib/store/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/vendor/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation } = authApi;
