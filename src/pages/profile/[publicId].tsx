import Hero from '@/components/publicPageSections/Hero';
import Layout from '@/components/publicPageSections/Layout';
import { Box, Divider } from '@mui/material';
import { useEffect } from 'react';
import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import type { NextApiRequest } from 'next';

const PublicProfilePage = ({ data, publicId }: any) => {
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
      <Layout publicId={publicId}>
        <Box>
          <Hero queryData={data} publicId={publicId} />
          {/* <PricingSection queryData={data} /> */}
          <Divider sx={{ mt: 6 }} />
          <PreviousEvent queryData={data} />
          <Divider />
          <ClientReviews queryData={data} />
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
  // const { publicId } = context.query;
  // Fetch data based on the dynamicParam
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles/profile/${publicId}`,
  );

  const data = await res.json();

  return {
    props: {
      data: data?.data,
      publicId: publicId,
    },
  };
}

export default PublicProfilePage;
