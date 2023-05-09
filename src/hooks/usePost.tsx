import customFetch from '@/utils/customFetch';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

const usePost = (url: string, token: string, successMsg?: string) => {
  const queryClient = useQueryClient();
  const { mutate: submitPost, isLoading } = useMutation({
    mutationFn: (postData) =>
      customFetch.post(
        `${url}`,
        { postData },
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      ),
  });
  return { submitPost, isLoading };
};

export { usePost };
