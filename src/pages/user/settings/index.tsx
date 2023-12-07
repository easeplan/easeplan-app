import React, { useEffect } from 'react';
import Layout from '@/components/vendors/Layout';
import { Box, Container, Stack, Typography } from '@mui/material';
import useFetch from '@/hooks/useFetch';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@/components/common/Divider';
import SettingsForm from '@/components/vendors/SettingsForm';
import { useAuth } from '@/hooks/authContext';

const SettingPage = ({ token, userData }: any) => {
  const { setUser } = useAuth();
  useEffect(() => {
    if (userData) {
      setUser(userData?.provider);
    }
  }, [userData, setUser, userData?.provider]);
  const userInfo = userData.provider?._id;
  const { queryData, isLoading } = useFetch(`/profiles/${userInfo}`, token);

  return (
    <Layout data={queryData?.provider}>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            mb: {
              xs: 3,
              sm: 3,
              md: 4,
              lg: 4,
              xl: 4,
            },
            mt: {
              xs: 5,
              sm: 5,
              md: 5,
              lg: 0,
              xl: 0,
            },
          }}
        >
          <SettingsIcon
            sx={{
              color: 'primary.main',
              fontSize: '1.5rem',
              mr: 1,
            }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              color: 'primary.main',
              fontSize: '1.5rem',
            }}
          >
            Settings
          </Typography>
        </Stack>
        <Divider />

        <Box>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <SettingsForm token={token} queryData={queryData} />
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default SettingPage;
