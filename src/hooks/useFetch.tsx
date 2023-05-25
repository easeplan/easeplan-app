import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import customFetch from '@/utils/customFetch';

interface Props {
  url?: string;
  token: string;
}

const useFetch = (url: string, token: string) => {
  const [userRole, setUserRole] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== `undefined`) {
      const role = localStorage.getItem(`userRole`);
      setUserRole(role);
    }
  }, []);
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
      // dispatch(fetchUserSuccess(data));
      return data;
    },
  });

  return { queryData: data?.data?.serviceProvider, error, isLoading };
};

export default useFetch;
