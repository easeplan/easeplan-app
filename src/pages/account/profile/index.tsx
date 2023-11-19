import DashboardLayout from '@/components/DashboardLayout';
import { styled } from '@mui/material/styles';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
import UserProfile from '@/components/UserProfile';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ErrorPage from '@/components/ErrorPage';
import { useAuth } from '@/hooks/authContext';

const ProfilePage = ({ token }: any) => {
  const { user } = useAuth();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = user?.provider?._id;
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
      <UserProfile token={token} queryData={queryData.provider} />
    </DashboardLayout>
  );
};

export default ProfilePage;
