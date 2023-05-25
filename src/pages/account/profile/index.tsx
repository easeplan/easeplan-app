import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { styled } from '@mui/material/styles';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
import UserProfile from '@/components/UserProfile';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const ProfilePage = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData, error, isLoading } = useFetch(
    `/${
      userInfo?.role === `provider`
        ? `provider-profiles`
        : userInfo?.role === `planner`
        ? `planner-profiles`
        : userInfo?.role === `user`
        ? `users`
        : `users`
    }/${userInfo?._id}`,
    token,
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>Error:</p>;
  }
  return (
    <DashboardLayout token={token}>
      <UserProfile token={token} queryData={queryData} />
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
