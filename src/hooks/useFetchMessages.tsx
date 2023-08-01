import { useQuery } from 'react-query';
import customFetch from '@/utils/customFetch';

interface Props {
  url?: string;
  token: string;
}

const useFetchMessages = (token: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [`allConversations`],
    queryFn: async () => {
      const { data } = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations`,
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

  return { conversations: data, error, isLoading };
};

export default useFetchMessages;
