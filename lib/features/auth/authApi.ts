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
    verifyAuthCode: builder.mutation<any, { code: string; userId: string }>({
      query: (data) => ({
        url: "/auth/vendor/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    resendVerificationCode: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: "/auth/vendor/resend-verification-code",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/vendor/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/vendor/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/vendor/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyAuthCodeMutation,
  useResendVerificationCodeMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
