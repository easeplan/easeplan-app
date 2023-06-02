import React from 'react';
import { Box } from '@mui/material';
import CoverBanner from './CoverBanner';
import UserDetails from './UserDetails';
import AboutCompany from './AboutCompany';
import PricingCard from './PricingCard';
import PreviousEvent from './PreviousEvent';
import Reviews from './Reviews';

const UserProfile = ({ token, queryData }: any) => {
  return (
    <Box>
      <CoverBanner token={token} queryData={queryData} />
      <UserDetails token={token} queryData={queryData} />
      <AboutCompany token={token} queryData={queryData} />
      <hr />
      <PricingCard token={token} queryData={queryData} />
      {/* <PreviousEvent queryData={queryData} token={token} /> */}
      {/* Later feature */}
      {/* <Reviews queryData={queryData} /> */}
    </Box>
  );
};

export default UserProfile;
