import Hero from '@/components/publicPageSections/Hero';
import Layout from '@/components/publicPageSections/Layout';
import { Box } from '@mui/material';
import React from 'react';
import axios from 'axios';
import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';

const PublicProfilePage = ({ data }: any) => {
  console.log(data?.data);
  return (
    <Layout>
      <Box>
        <Hero queryData={data?.data} />
        <PricingSection queryData={data} />
        {/* <PreviousEvent queryData={data?.data} />
        <ClientReviews queryData={data?.data} /> */}
      </Box>
    </Layout>
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
