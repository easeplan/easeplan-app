import PageTitle from '@/components/common/PageTitle';
import DashboardLayout from '@/components/DashboardLayout';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import AvailableFunds from '@/components/payments/AvailableFunds';
import ManagePayment from '@/components/payments/ManagePayment';
import { Grid, Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ErrorPage from '@/components/ErrorPage';

const PaymentPage = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [bankDetails, setBankDetails] = useState();

  const fetchBankDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/account-details/${userInfo?._id}`,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBankDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

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
    return <ErrorPage />;
  }

  return (
    <DashboardLayout token={token}>
      {/* <Typography my={2} variant="h6" fontWeight="bold" color="primary.main">
        Wallet
      </Typography>
      <Divider sx={{ my: 1 }} /> */}
      <Box sx={{ flexGrow: 1, width: `100%`, mt: 2 }}>
        <AvailableFunds
          token={token}
          bankDetails={bankDetails}
          queryData={queryData}
        />
      </Box>
    </DashboardLayout>
  );
};

export default PaymentPage;
