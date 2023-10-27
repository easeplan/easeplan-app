import { parseCookies } from '@/lib/parseCookies';

export async function getServerSideProps({ req }: any) {
  const { token } = parseCookies(req);
  console.log()

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
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