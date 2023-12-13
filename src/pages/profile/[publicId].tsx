import Hero from '@/components/publicPageSections/Hero';
import Layout from '@/components/vendors/Layout';
import { Box, Divider } from '@mui/material';
import { useEffect } from 'react';
// import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';
// import Head from 'next/head';

import { parseCookies } from '@/lib/parseCookies';
import AuthHero from '@/components/UserProfile/Hero';
import { useAuth } from '@/hooks/authContext';
import Head from 'next/head';

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
      <Head>
        <title>{data?.providerProfile?.company?.name} - Easeplan</title>
        <meta name="theme-color" content="#134153" />
        <meta itemProp="name" content={data?.providerProfile?.company?.name} />
        <meta
          itemProp="image"
          content={data?.providerProfile?.company?.image}
        />
        <meta
          name="description"
          content={data?.providerProfile?.company?.description}
        />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta
          property="og:title"
          content={data?.providerProfile?.company?.name}
        />
        <meta
          property="og:image"
          content={data?.providerProfile?.company?.image}
        />
        <meta
          property="og:url"
          content={`https://app.easeplan.io/profile/${data?.providerProfile?.publicId}`}
        />
        <meta property="og:type" content="website" />

        {/*<!-- Twitter Meta Tags -->*/}
        <meta
          name="twitter:title"
          content={data?.providerProfile?.company?.name}
        />
        <meta
          name="twitter:image"
          content={data?.providerProfile?.company?.image}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content={data?.providerProfile?.company?.image}
        ></meta>
      </Head>
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

export async function getServerSideProps(context: {
  req: any;
  query: { publicId: any };
}) {
  const {
    req,
    query: { publicId },
  } = context;

  const { token } = parseCookies(req);
  console.log(token);
  // Fetch the public profile data
  const profileResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles/profile/${publicId}`,
  );

  let data = null;
  if (profileResponse.ok) {
    data = await profileResponse.json();
  }

  let userData = null;
  if (token) {
    // Fetch user data only if the token exists
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (userResponse.ok) {
      const userResult = await userResponse.json();
      userData = userResult.data;
    }
  }

  return {
    props: {
      data: data?.data || null,
      publicId: publicId,
      token: token || null,
      userData: userData,
    },
  };
}

export default PublicProfilePage;
