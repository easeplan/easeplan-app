import React from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
import { Box } from '@mui/material';
import CoverBanner from './CoverBanner';
import UserDetails from './UserDetails';
import AboutCompany from './AboutCompany';
import PricingCard from './PricingCard';
import PreviousEvent from './PreviousEvent';
import Reviews from './Reviews';
export { getServerSideProps } from '@/context/contextStore';

const UserProfile = ({ token }: any) => {
  const { queryData, error, isLoading } = useFetch(
    `/providers/profile`,
    `${token}`,
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>Error:</p>;
  }

  return (
    <Box>
      <CoverBanner token={token} queryData={queryData} />
      <UserDetails token={token} queryData={queryData} />
      <AboutCompany token={token} queryData={queryData} />
      <hr />
      <PricingCard token={token} queryData={queryData} />
      <PreviousEvent queryData={queryData} />
      <Reviews queryData={queryData} />
    </Box>
  );
};

export default UserProfile;
