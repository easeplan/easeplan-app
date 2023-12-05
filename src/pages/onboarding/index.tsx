import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Layout from '@/components/onboarding/Layout';
import ProfileSettings from '@/components/onboarding/BusinessProfile';
import VerificationSettings from '@/components/onboarding/VerificationSettings';
import CompanySettings from '@/components/onboarding/CompanySettings';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import UserFlow from '@/components/onboarding/userFlow';

export { getServerSideProps } from '@/hooks/getServerSideProps';

interface PropsTypes {
  token: string;
  userData: any;
}

const OnboardingPage = ({ token, userData }: PropsTypes) => {
  useEffect(() => {
    localStorage.setItem('isFinsihedOnboarding', 'false');
  }, []);

  return (
    <Layout>
      <Box>
        <WelcomeScreen token={token} userData={userData} />
        <ProfileSettings token={token} />
        <VerificationSettings token={token} />
        <CompanySettings token={token} />
        <UserFlow token={token} />
        <VerificationSettings token={token} />
      </Box>
    </Layout>
  );
};

export default OnboardingPage;
