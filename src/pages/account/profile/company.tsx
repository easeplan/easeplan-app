import DashboardLayout from '@/components/DashboardLayout';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useAuthUser } from '@/context/contextStore';
import PricingEventForm from '@/components/PricingEventForm';
import OverviewForm from '@/components/OverviewForm';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
import { useEffect } from 'react';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { useAuth } from '@/hooks/authContext';

const CompanyPage = ({ token, userData }: any) => {
  const { setUser } = useAuth();
  // When the component mounts, update the user data in the context
  useEffect(() => {
    if (userData) {
      setUser(userData.provider);
    }
  }, [userData, setUser]);

  return (
    <DashboardLayout token={token}>
      <Flex>
        <Link href="/account/profile">
          <h3 className="title">Profile Settings</h3>
        </Link>
        <Link href="/account/profile/verify">
          <h3 className="title">Verification</h3>
        </Link>
        <Link href="/account/profile/company">
          <h3 className="title active">Company Profile</h3>
        </Link>
      </Flex>
      <OverviewForm token={token} />
    </DashboardLayout>
  );
};

const Flex = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '2rem',
  color: theme.palette.primary.main,

  '.title': {
    marginRight: '2rem',
    '@media (max-width: 900px)': {
      fontSize: '0.7rem',
    },
  },
  '.active': {
    color: theme.palette.secondary.main,
  },

  '@media (max-width: 900px)': {
    marginTop: '1rem',
  },
}));

export default CompanyPage;
