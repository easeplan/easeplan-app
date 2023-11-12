import { parseCookies } from '@/lib/parseCookies';

export async function getServerSideProps({ req }: any) {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: '/user/findvendors',
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: token,
    },
  };
}
