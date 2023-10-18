import { parseCookies } from '@/lib/parseCookies';

export async function getServerSideProps({ req }: any) {
  const { token } = parseCookies(req);

  return {
    props: {
      token: token || null,
    },
  };
}
