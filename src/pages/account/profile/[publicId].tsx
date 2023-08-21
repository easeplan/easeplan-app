import Hero from '@/components/UserProfile/Hero';
import DashboardLayout from '@/components/DashboardLayout';
import { Box, Divider } from '@mui/material';
import { parseCookies } from '@/lib/parseCookies';
import { useEffect } from 'react';
import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import type { NextApiRequest } from 'next';

const ViewProfilePage = ({ data, token }: any) => {
  useEffect(() => {
    if (typeof window !== `undefined`) {
      localStorage.removeItem(`lastVisitedURL`);
    }
  }, []);
  return (
    <>
      <Head>
        <title>{data?.data?.company?.name} Business Profile</title>
        <meta name="theme-color" content="#134153" />
        <meta itemProp="name" content={data?.data?.company?.name} />
        <meta itemProp="image" content={data?.data?.company?.image} />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta property="og:title" content={data?.data?.company?.name} />
        <meta property="og:image" content={data?.data?.company?.image} />
        <meta
          property="og:url"
          content={`https://app.easeplan.io/profile/${data?.data?.publicId}`}
        />
        <meta property="og:type" content="website" />

        {/*<!-- Twitter Meta Tags -->*/}
        <meta name="twitter:title" content={data?.data?.company?.name} />
        <meta name="twitter:image" content={data?.data?.company?.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={data?.data?.company?.image}></meta>
      </Head>
      <DashboardLayout token={token}>
        <Box>
          <Hero queryData={data?.data} token={token} />
          <PricingSection queryData={data?.data} />
          <Divider />
          <PreviousEvent queryData={data?.data} />
          <Divider />
          <ClientReviews queryData={data?.data} />
        </Box>
      </DashboardLayout>
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
  // const { publicId } = context.query;
  // Fetch data based on the dynamicParam
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-profiles/profile/${publicId}`,
  );

  const data = await res.json();

  return {
    props: {
      token: token,
      data: data?.data,
    },
  };
}

export default ViewProfilePage;
