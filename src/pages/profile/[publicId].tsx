import Hero from '@/components/publicPageSections/Hero';
import Layout from '@/components/publicPageSections/Layout';
import { Box } from '@mui/material';
import React from 'react';
import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';
import Head from 'next/head';

const PublicProfilePage = ({ data }: any) => {
  // console.log(data?.data);
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
      <Layout>
        <Box>
          <Hero queryData={data?.data} />
          <PricingSection queryData={data} />
          <PreviousEvent queryData={data?.data} />
          <ClientReviews queryData={data?.data} />
        </Box>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: {
  query: { publicId: any };
}) {
  const { publicId } = context.query;
  // Fetch data based on the dynamicParam
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-profiles/profile/${publicId}`,
  );

  const data = await res.json();

  return {
    props: {
      data: data?.data,
    },
  };
}

export default PublicProfilePage;
