import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_NEXT_API}/api/auth`,
        method: `POST`,
        body: data,
      }),
    }),
    // Sign Up
    signup: builder.mutation({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_NEXT_API}/api/signup`,
        method: `POST`,
        body: data,
      }),
    }),
    // Logout
    logout: builder.mutation({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_NEXT_API}/api/logout`,
        method: `POST`,
      }),
    }),
    // Forget Password (Email)
    sendEmail: builder.mutation({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        method: `POST`,
      }),
    }),
    // Verify Change Password token
    verifyToken: builder.mutation({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-otp`,
        method: `POST`,
      }),
    }),
    // Reset password (newPassword & confirmPassword)
    resetPassword: builder.mutation({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        method: `POST`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useSendEmailMutation,
  useVerifyTokenMutation,
  useResetPasswordMutation,
} = userApiSlice;
