import Hero from '@/components/publicPageSections/Hero';
import Layout from '@/components/vendors/Layout';
import { Box, Divider } from '@mui/material';
import { useEffect } from 'react';
// import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';
// import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import type { NextApiRequest } from 'next';
import useFetch from '@/hooks/useFetch';
import { parseCookies } from '@/lib/parseCookies';
import AuthHero from '@/components/UserProfile/Hero';
import { useAuth } from '@/hooks/authContext';

const PublicProfilePage = ({ data, publicId, token, userData }: any) => {
  const { setUser } = useAuth();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = data?._id;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lastVisitedURL');
    }
  }, []);

  // const { queryData, error, isLoading } = useFetch(
  //   `/profiles/${userInfo}`,
  //   token,
  // );
  useEffect(() => {
    if (userData) {
      setUser(userData.provider);
    }
  }, [userData, setUser]);
  return (
    <>
      <Layout data={userData?.provider}>
        <Box>
          {userInfo ? (
            <AuthHero queryData={data} token={token} data={userData} />
          ) : (
            <Hero queryData={data} publicId={publicId} />
          )}
          <Box
            sx={{
              margin: '0 auto',
              width: {
                xs: '90%',
                sm: '90%',
                md: '90%',
                lg: '90%',
              },
            }}
          >
            {/* <Divider sx={{ mt: 6 }} /> */}
            <PreviousEvent queryData={data} />
            <ClientReviews queryData={data} />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext & { req: NextApiRequest },
) {
  const {
    req,
    query: { publicId },
  } = context;

  const { token } = parseCookies(req);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles/profile/${publicId}`,
  );

  const data = await res.json();

  // Ensure that token is not undefined; if it is, set it to null
  const serializedToken = token === undefined ? null : token;

  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

  const userdata = await resp.json();

  return {
    props: {
      data: data?.data || null, // Also ensure data.data is not undefined
      publicId: publicId,
      token: serializedToken,
      userData: userdata.data,
    },
  };
}

export default PublicProfilePage;
