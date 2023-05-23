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
  }),
});

export const { useLoginMutation } = userApiSlice;
