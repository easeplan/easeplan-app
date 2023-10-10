import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import customFetch from '@/utils/customFetch';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setQueryData } from '@/features/authSlice';

interface Props {
  url?: string;
  token: string;
}

const useFetch = (url: string, token: string) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery({
    queryKey: [`userAuthData`],
    queryFn: async () => {
      const { data } = await customFetch(
        `${process.env.NEXT_PUBLIC_API1_URL}${url}`,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(setQueryData(data?.data));
      return data;
    },
  });

  return { queryData: data?.data, error, isLoading };
};

export default useFetch;
