import { useQuery } from 'react-query';
import customFetch from '@/utils/customFetch';

const useFetch = (url: string, token: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [`userAuthData`],
    queryFn: async () => {
      const { data } = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
  });

  return { queryData: data?.data?.serviceProvider, error, isLoading };
};

export default useFetch;
