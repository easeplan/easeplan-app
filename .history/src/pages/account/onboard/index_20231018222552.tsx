import React, { useEffect } from 'react';
import { Box } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import ProfileSettings from '@/components/onboarding/ProfileSettings';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import AddPreviousEventModal from '@/components/onboarding/AddPreviousEventModal';
import AddPreviousSection from '@/components/onboarding/AddPreviousSection';
import AddPricingSection from '@/components/onboarding/AddPricingSection';

interface PropsTypes {
  token: string;
}

const OnboardingPage = ({ token }: PropsTypes) => {
  return (
    <>
      <Box>
        <WelcomeScreen />
        <ProfileSettings token={token} />
        <AddPreviousSection token={token} />
        <AddPricingSection token={token} />
      </Box>
    </>
  );
};

export default OnboardingPage;
