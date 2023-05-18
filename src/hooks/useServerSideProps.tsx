import axios from 'axios';
import { parseCookies } from '@/lib/parseCookies';
import useFetch from '@/hooks/useFetch';

export async function getServerSideProps({ req }: any) {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/provider-profiles/profile`,
    {
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    props: {
      queryData: data?.data?.serviceProvider,
      token: token,
    },
  };
}
