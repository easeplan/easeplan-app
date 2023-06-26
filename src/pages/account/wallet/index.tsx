import PageTitle from '@/components/common/PageTitle';
import DashboardLayout from '@/components/DashboardLayout';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import AvailableFunds from '@/components/payments/AvailableFunds';
import ManagePayment from '@/components/payments/ManagePayment';
import { Grid, Box, Divider, Typography } from '@mui/material';
import React from 'react';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const PaymentPage = ({ token }: any) => {
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
      <Typography my={3} variant="h5" fontWeight="bold" color="primary.main">
        Payment and Withdrawals
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ flexGrow: 1, width: `100%`, mt: 6 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
          <Grid item xs={12} sm={6} md={6}>
            <AvailableFunds />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ManagePayment />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default PaymentPage;