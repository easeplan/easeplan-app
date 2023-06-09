/* eslint-disable @typescript-eslint/no-use-before-define */
import Badge from '@/components/common/Badge';
import Dashboard from '@/components/Dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import FinderSection from '@/components/FinderSection';
import Box from '@mui/material/Box';
import bannerImg from '@/public/banner.png';
import Image from 'next/image';
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

        <Box
          sx={{
            width: `100%`,
            height: `100%`,
            position: `relative`,
            marginTop: {
              xs: `2rem`,
            },
            img: { width: `100%`, height: `100%` },
          }}
        >
          <Image
            src={bannerImg}
            alt="img"
            height={100}
            width={1200}
            loading="lazy"
          />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default HomePage;
