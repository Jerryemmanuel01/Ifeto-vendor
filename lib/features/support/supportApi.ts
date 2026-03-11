import { apiSlice } from "@/lib/store/api/apiSlice";

export interface SupportRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const supportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitSupportRequest: builder.mutation<any, SupportRequestPayload>({
      query: (body) => ({
        url: "/support",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubmitSupportRequestMutation } = supportApi;
