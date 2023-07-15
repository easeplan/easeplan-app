import DashboardLayout from '@/components/DashboardLayout';
import { styled } from '@mui/material/styles';
import VerifyAccountForm from '@/components/VerifyAccountForm';
import Link from 'next/link';
import LoadingScreen from '@/components/common/LoadingScreen';
// import FaceCapture from '@/components/FaceCapture';
import useFetch from '@/hooks/useFetch';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ErrorPage from '@/components/ErrorPage';

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
          <h3 className="title">Profile Settings</h3>
        </Link>
        <h3 className="title">{`/`}</h3>
        {queryData?.role !== `user` && (
          <Link href="/account/settings/verify">
            <h3 className="title active">Verification</h3>
          </Link>
        )}
      </Flex>
      <VerifyAccountForm token={token} />
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
