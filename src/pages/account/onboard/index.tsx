import React, { useEffect } from 'react';
import { Box } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import BusinessProfile from '@/components/onboarding/BusinessProfile';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import AddPreviousEventModal from '@/components/onboarding/AddPreviousEventModal';
import AddPreviousSection from '@/components/onboarding/AddPreviousSection';
import AddPricingSection from '@/components/onboarding/AddPricingSection';
import ProfileSettings from '@/components/onboarding/ProfileSettings';

interface PropsTypes {
  token: string;
}

const OnboardingPage = ({ token }: PropsTypes) => {
  return (
    <>
      <Box>
        <WelcomeScreen />
        {/* <ProfileSettings token={token} /> */}
        <BusinessProfile token={token} />
        <AddPreviousSection token={token} />
        <AddPricingSection token={token} />
      </Box>
    </>
  );
};

export default OnboardingPage;
