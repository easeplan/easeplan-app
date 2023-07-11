import Hero from '@/components/publicPageSections/Hero';
import DashboardLayout from '@/components/DashboardLayout';
import { Box } from '@mui/material';
import React from 'react';
import PricingSection from '@/components/publicPageSections/PricingSection';
// import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
// import ClientReviews from '@/components/publicPageSections/ClientReviews';
import LoadingScreen from '@/components/common/LoadingScreen';
import { parseCookies } from '@/lib/parseCookies';
import useFetch from '@/hooks/useFetch';

const PreviewProfilePage = ({ contract, token, queryData }: any) => {
  // const { queryData, error, isLoading } = useFetch(
  //   `/${
  //     contract?.role === `provider`
  //       ? `provider-profiles`
  //       : contract?.role === `planner`
  //       ? `planner-profiles`
  //       : null
  //   }/${contract?.parties.receiverId}`,
  //   token,
  // );

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // if (error) {
  //   return <p>Error:</p>;
  // }

  console.log(queryData);

  return (
    <>
      <DashboardLayout token={token}>
        <Box>
          <Hero queryData={queryData} token={token} />
          <PricingSection queryData={queryData} />
          {/* <PreviousEvent queryData={data?.data} /> */}
          {/* <ClientReviews queryData={data?.data} /> */}
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
