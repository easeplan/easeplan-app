/* eslint-disable @typescript-eslint/no-use-before-define */
import Badge from '@/components/common/Badge';
import Dashboard from '@/components/Dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import FinderSection from '@/components/FinderSection';
import Box from '@mui/material/Box';

import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

interface Props {
  token: string;
}

const HomePage = ({ token }: Props) => {
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
    <>
      <DashboardLayout token={token}>
        {userInfo?.role === `provider` || userInfo?.role === `planner` ? (
          <Dashboard data={queryData} />
        ) : null}

        {userInfo?.role === `user` && (
          <FinderSection token={token} queryData={queryData} />
        )}
      </DashboardLayout>
    </>
  );
};

export default HomePage;
