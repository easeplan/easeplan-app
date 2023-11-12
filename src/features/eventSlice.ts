import { apiSlice } from './apiSlice';

export const eventSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_NEXT_API}/api/auth`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useAddEventMutation } = eventSlice;
