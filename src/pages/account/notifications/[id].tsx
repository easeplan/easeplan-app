import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import useFetch from '@/hooks/useFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Typography } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import axios from 'axios';

interface Props {
  token: string;
}

const NotificationPage = ({ token }: Props) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData } = useFetch(
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
  const { id } = router.query;
  return (
    <DashboardLayout token={token}>
      <>
        <Typography
          color="primary.main"
          fontWeight={600}
          fontSize="1.5rem"
          my={3}
        >
          Notifications
        </Typography>
        {id}
      </>
    </DashboardLayout>
  );
};

export default NotificationPage;
