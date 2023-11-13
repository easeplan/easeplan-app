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
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorPage from '@/components/ErrorPage';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import { parseCookies } from '@/lib/parseCookies';
import AuthHero from '@/components/UserProfile/Hero';

const PublicProfilePage = ({ data, publicId, token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lastVisitedURL');
    }
  }, []);
  const { queryData, error, isLoading } = useFetch(
    `/profiles/${userInfo}`,
    token,
  );
  return (
    <>
      <Layout data={queryData?.provider}>
        <Box>
          {userInfo ? (
            <AuthHero queryData={data} token={token} data={queryData} />
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

  return {
    props: {
      data: data?.data || null, // Also ensure data.data is not undefined
      publicId: publicId,
      token: serializedToken,
    },
  };
}

export default PublicProfilePage;
