import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { styled } from '@mui/material/styles';
import ProfileForm from '@/components/ProfileForm';
import Link from 'next/link';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ErrorPage from '@/components/ErrorPage';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const SettingsPage = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData, error, isLoading } = useFetch(
    `/profiles/${userInfo}`,
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
        {/* <h3 className="title">{`||`}</h3> */}
        {queryData?.provider?.providerProfile && (
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
      <ProfileForm token={token} queryData={queryData?.provider} />
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

export default SettingsPage;
