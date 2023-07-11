import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FeedbackForm from '@/components/FeedbackForm';
import { Box } from '@mui/material';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

interface PropsTypes {
  token: string;
}

const SupportPage = ({ token }: PropsTypes) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { queryData, error, isLoading } = useFetch(
    `/${
      userInfo?.role === `provider`
        ? `provider-profiles`
        : userInfo?.role === `planner`
        ? `planner-profiles`
        : userInfo?.role === `user`
        ? `user-profiles`
        : `user-profiles`
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
      <Box>
        <FeedbackForm token={token} />
      </Box>
    </DashboardLayout>
  );
};

export default SupportPage;
