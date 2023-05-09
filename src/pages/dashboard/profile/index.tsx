import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { styled } from '@mui/material/styles';
import ProfileForm from '@/components/ProfileForm';
import Link from 'next/link';
import { useAuthUser } from '@/context/contextStore';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
import UserProfile from '@/components/UserProfile';
export { getServerSideProps } from '@/context/contextStore';

const ProfilePage = ({ token }: any) => {
  // const { queryData } = useAuthUser();
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
    <DashboardLayout token={token}>
      <UserProfile token={token} />
    </DashboardLayout>
  );
};

const Flex = styled(`div`)(({ theme }) => ({
  display: `flex`,
  alignItems: `center`,
  marginTop: `2rem`,
  color: theme.palette.primary.main,

  '.title': {
    marginRight: `2rem`,
    '@media (max-width: 900px)': {
      fontSize: `0.7rem`,
    },
  },
  '.active': {
    color: theme.palette.secondary.main,
  },

  '@media (max-width: 900px)': {
    marginTop: `1rem`,
  },
}));

export default ProfilePage;
