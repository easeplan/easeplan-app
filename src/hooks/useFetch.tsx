// import { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
// import customFetch from '@/utils/customFetch';
// import { RootState } from '@/store/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { setQueryData } from '@/features/authSlice';

// interface Props {
//   url?: string;
//   token: string;
// }

// const useFetch = (url: string, token: string) => {
//   try {
//     const dispatch = useDispatch();
//     const { data, error, isLoading } = useQuery({
//       queryKey: ['userAuthData'],
//       queryFn: async () => {
//         const { data } = await customFetch(
//           `${process.env.NEXT_PUBLIC_API_URL}${url}`,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );
//         dispatch(setQueryData(data?.data));
//         return data;
//       },
//     });

//     return { queryData: data?.data, error, isLoading };
//   } catch (e) {
//     console.log(e);
//   }
// };

// export default useFetch;

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import customFetch from '@/utils/customFetch';
import { useSelector, useDispatch } from 'react-redux';
import { setQueryData } from '@/features/authSlice';

const useFetch = (url: string, token: string) => {
  const dispatch = useDispatch();

  // Define the query outside of any conditional logic
  const { data, error, isLoading } = useQuery(
    ['userAuthData', url, token],
    async () => {
      try {
        const response = await customFetch(
          `${process.env.NEXT_PUBLIC_API_URL}${url}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        return response.data;
      } catch (e) {
        // Handle errors here or throw them to be caught by useQuery error handling
        console.error(e);
        throw e;
      }
    },
    {
      // onSuccess is called when the queryFn successfully returns data
      onSuccess: (data) => {
        // Dispatch the action to store the data in Redux store
        dispatch(setQueryData(data?.data));
      },
    },
  );

  return { queryData: data?.data, error, isLoading };
};

export default useFetch;
