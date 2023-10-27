import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Layout from '@/components/onboarding/Layout';
import ProfileSettings from '@/components/onboarding/ProfileSettings';
import VerificationSettings from '@/components/onboarding/VerificationSettings';
import CompanySettings from '@/components/onboarding/CompanySettings';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import UserFlow from '@/components/onboarding/userFlow';
import VerifyPhoneNumber from '@/components/onboarding/VerifyPhoneNumber';
import 
export { getServerSideProps } from '@/hooks/getServerSideProps';

interface PropsTypes {
  token: string;
}

const OnboardingPage = ({ token }: PropsTypes) => {
  useEffect(() => {
    localStorage.setItem(`isFinsihedOnboarding`, `false`);
  }, []);

  return (
    <Layout>
      <Box>
        <WelcomeScreen />
        <ProfileSettings token={token} />
        <VerificationSettings token={token} />
        <CompanySettings token={token} />
        <UserFlow token={token} />
      </Box>
    </Layout>
  );
};

export default OnboardingPage;
