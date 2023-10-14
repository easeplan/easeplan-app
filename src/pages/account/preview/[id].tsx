import Hero from '@/components/UserProfile/Hero';
import DashboardLayout from '@/components/DashboardLayout';
import { Box, Divider } from '@mui/material';
import React from 'react';
import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';
import LoadingScreen from '@/components/common/LoadingScreen';
import { parseCookies } from '@/lib/parseCookies';
import useFetch from '@/hooks/useFetch';

const PreviewProfilePage = ({ contract, token, queryData }: any) => {
  return (
    <>
      <DashboardLayout token={token}>
        <Box>
          <Hero queryData={queryData} token={token} />
          <Divider />
          <PricingSection queryData={queryData} />
          <Divider />
          <PreviousEvent queryData={queryData} />
          <Divider />
          <ClientReviews queryData={queryData} />
        </Box>
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps({ req, params }: any) {
  const { id } = params;
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  // Fetch data based on the dynamicParam
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contracts/${id}/contract`,
    {
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${
      data?.data?.role && data?.data?.role === `planner`
        ? `planner-profiles`
        : `provider-profiles`
    }/${data?.data?.parties.receiverId}`,
    {
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const plannerData = await resData.json();

  return {
    props: {
      token: token,
      contract: data?.data,
      queryData: plannerData?.data || null,
    },
  };
}

export default PreviewProfilePage;
