import DashboardLayout from '@/components/DashboardLayout';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
import UserProfile from '@/components/UserProfile';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import ErrorPage from '@/components/ErrorPage';
import { useAuth } from '@/hooks/authContext';
import { useEffect } from 'react';

const ProfilePage = ({ token, userData }: any) => {
  const { setUser, user } = useAuth();
  // When the component mounts, update the user data in the context
  useEffect(() => {
    if (userData) {
      setUser(userData.provider);
    }
  }, [userData, setUser]);

  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = userData?.provider._id;
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
