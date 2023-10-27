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
import BusinessSettings from '@/components/onboarding/AddBusinessSettings';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface PropsTypes {
  token: string;
}

const OnboardingPage = ({ token }: PropsTypes) => {


const HomePage = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push(`/account`);
    } else {
      router.push(`/login`);
    }
  }, [router, userInfo]);
  return (
    <>
      <Box>
        <WelcomeScreen />
        <VerifyRegistration token={token} />
        <AddPhoneNumber token={token} />
        <BusinessSettings token={token} />
        <ProfileSettings token={token} />
        <AddPreviousSection token={token} />
      </Box>
    </>
  );
};

export default OnboardingPage;
