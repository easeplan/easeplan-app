import { parseCookies } from '@/lib/parseCookies';

// export async function getServerSideProps({ req }: any) {
//   const { token } = parseCookies(req);

//   return {
//     props: {
//       token: token || null,
//     },
//   };
// }

export async function getServerSideProps(context: { req: { headers: any } }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      {
        headers: context.req.headers, // Forward the headers
      },
    );

    if (res.status === 401) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
