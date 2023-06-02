import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_NEXT_API}/api/auth`,
        method: `POST`,
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_NEXT_API}/api/signup`,
        method: `POST`,
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_NEXT_API}/api/logout`,
        method: `POST`,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  userApiSlice;
