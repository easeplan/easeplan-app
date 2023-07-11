import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StyleIcon from '@mui/icons-material/Style';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Box, Typography } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const HistoryPage = ({ token }: any) => {
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
      <Box sx={{ width: `80%`, margin: `6rem auto`, textAlign: `center` }}>
        <StyleIcon sx={{ fontSize: `4rem`, color: `grey.500` }} />
        <Typography color="grey.500">
          You don`t have any history at the moment
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default HistoryPage;
