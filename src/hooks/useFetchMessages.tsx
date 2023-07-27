import { useQuery } from 'react-query';
import customFetch from '@/utils/customFetch';

interface Props {
  url?: string;
  token: string;
}

const useFetchMessages = (url: string, token: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [`allMessages`],
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

  return { allMessages: data, error, isLoading };
};

export default useFetchMessages;
