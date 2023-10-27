import React, { useEffect } from 'react';
import { Box } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import ProfileSettings from '@/components/onboarding/ProfileSettings';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import AddPreviousEventModal from '@/components/onboarding/AddPreviousEventModal';
import AddPreviousSection from '@/components/onboarding/AddPreviousSection';
import AddPricingSection from '@/components/onboarding/AddPricingSection';
import AddPhoneNumber from '@/components/onboarding/AddPhoneNumber';
import VerifyRegistration from '@/components/onboarding/VerifyRegistration';
import BusinessSettings from '@/components/onboarding/AddBusiness';

interface PropsTypes {
  token: string;
}

const OnboardingPage = ({ token }: PropsTypes) => {
  return (
    <>
      <Box>
        <WelcomeScreen />
        <VerifyRegistration token={token} />
        <AddPhoneNumber token={token} />
        <BusinessSettings token={token} />
        <ProfileSettings token={token} />
        <AddPreviousSection token={token} />
        <AddPricingSection token={token} />
      </Box>
    </>
  );
};

export default OnboardingPage;