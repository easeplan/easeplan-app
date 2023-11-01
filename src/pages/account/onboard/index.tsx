import React, { useEffect } from 'react';
import { Box } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import BusinessProfile from '@/components/onboarding/BusinessProfile';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import AddPreviousEventModal from '@/components/onboarding/AddPreviousEventModal';
import AddPreviousSection from '@/components/onboarding/AddPreviousSection';
import AddPricingSection from '@/components/onboarding/AddPricingSection';
import AddPhoneNumber from '@/components/onboarding/AddPhoneNumber';
import VerifyRegistration from '@/components/onboarding/VerifyRegistration';
import BusinessSettings from '@/components/onboarding/AddBusinessSettings';
import VerifyID from '@/components/onboarding/VerifyID';
import ProfileSettings from '@/components/onboarding/ProfileSettings';

interface PropsTypes {
  token: string;
}

const OnboardingPage = ({ token }: PropsTypes) => {
  return (
    <>
      <Box>
        <WelcomeScreen token={token} />
        <VerifyRegistration token={token} />
        <AddPhoneNumber token={token} />
        <BusinessSettings token={token} />
        <ProfileSettings token={token} />
        <AddPreviousSection token={token} />
        <VerifyID token={token} />
      </Box>
    </>
  );
};

export default OnboardingPage;