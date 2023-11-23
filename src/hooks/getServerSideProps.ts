import { parseCookies } from '@/lib/parseCookies';

export async function getServerSideProps(context: { req: any }) {
  const { req } = context;
  try {
    const { token } = parseCookies(req);

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status === 401) {
      // Token is invalid or expired
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    // Handle other status codes as needed

    const data = await res.json(); // Assuming the API returns user data
    return { props: { userData: data.data, token } };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
