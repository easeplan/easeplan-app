import React from 'react';
import Layout from '@/components/vendors/Layout';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';
export { getServerSideProps } from '@/hooks/useFetchToken';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@/components/common/Divider';
import SettingsForm from '@/components/vendors/SettingsForm';
import Link from 'next/link';

const SettingPage = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData, isLoading } = useFetch(`/profiles/${userInfo}`, token);
  return (
    <Layout data={queryData?.provider}>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Stack
          direction="row"
          sx={{
            alignItems: `center`,
            mb: {
              xs: 3,
              sm: 3,
              md: 4,
              lg: 4,
              xl: 4,
            },
          }}
        >
          <SettingsIcon
            sx={{
              color: `primary.main`,
              fontSize: `1.5rem`,
              mr: 1,
            }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              color: `primary.main`,
              fontSize: `1.5rem`,
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
