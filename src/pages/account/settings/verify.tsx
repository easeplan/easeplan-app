import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { styled } from '@mui/material/styles';
import VerifyAccountForm from '@/components/VerifyAccountForm';
import VerificationFlow from '@/components/VerificationFlow';
import Link from 'next/link';
import LoadingScreen from '@/components/common/LoadingScreen';
// import FaceCapture from '@/components/FaceCapture';
import useFetch from '@/hooks/useFetch';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ErrorPage from '@/components/ErrorPage';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Typography } from '@mui/material';

const VerifyPage = ({ token }: any) => {
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
  const [startVerification, setStartVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <DashboardLayout token={token}>
      <Flex>
        <Link href="/account/settings">
          <Button
            variant="outlined"
            sx={{ fontSize: `0.7rem` }}
            startIcon={<AdminPanelSettingsIcon />}
          >
            Profile Settings
          </Button>
        </Link>
        {queryData?.role !== `user` && (
          <Link href="/account/settings/verify">
            <Button
              variant="contained"
              sx={{ marginLeft: `1rem`, fontSize: `0.7rem` }}
              startIcon={<AdminPanelSettingsIcon />}
            >
              Verification
            </Button>
          </Link>
        )}
      </Flex>
      {/* <VerifyAccountForm token={token} /> */}
      <Box
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          marginTop: {
            xs: 20,
            md: 20,
            lg: 40,
          },
        }}
      >
        <Box>
          {startVerification && (
            <VerificationFlow setIsVerified={setIsVerified} />
          )}
          <Box>
            {queryData?.verified || isVerified ? (
              <Box sx={{ textAlign: `center` }}>
                <VerifiedUserIcon
                  sx={{ fontSize: `4rem`, color: `secondary.main` }}
                />
                <Typography color="primary.main" fontWeight={500} mt={4}>
                  Your account has been verified
                </Typography>
              </Box>
            ) : (
              <Button
                variant="contained"
                sx={{ py: `1rem` }}
                onClick={() => setStartVerification(true)}
              >
                Start Verification
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

const Flex = styled(`div`)(({ theme }) => ({
  display: `flex`,
  alignItems: `center`,
  marginTop: `2rem`,
  // color: theme.palette.primary.main,
  color: theme.palette.grey[500],

  '.title': {
    marginRight: `0.5rem`,
    fontSize: `1rem`,
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

export default VerifyPage;
