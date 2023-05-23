import { apiSlice } from './apiSlice';

export const signupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_NEXT_API}/api/signup`,
        method: `POST`,
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation } = signupApiSlice;
