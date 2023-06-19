/* eslint-disable @typescript-eslint/no-use-before-define */
import Badge from '@/components/common/Badge';
import Dashboard from '@/components/Dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import FinderSection from '@/components/FinderSection';
import { Box, Typography } from '@mui/material';

import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import bannerImg from '@/public/banner.png';
import Image from 'next/image';
import Link from 'next/link';
import theme from '@/styles/theme';

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
        {userInfo?.role === `provider` || userInfo?.role === `planner` ? (
          <Box
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: `center`,
              flexDirection: {
                xs: `column`,
                sm: `column`,
                md: `row`,
                lg: `row`,
                xl: `row`,
              },
              p: 4,
              mt: 4,
              border: ` solid 1px #ccc`,
            }}
          >
            <Box>
              <Typography
                fontWeight="600"
                fontSize="1.2rem"
                color="primary.main"
              >
                Are you available for this gig?
              </Typography>
              <Typography color="#ccc" mt={1}>
                If you are please accept the event or decline if you are not
                available
              </Typography>
            </Box>
            <Box
              sx={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
                gap: `2rem`,
                mt: {
                  xs: `2rem`,
                  sm: `2rem`,
                },
              }}
            >
              <Box
                sx={{
                  border: `solid 1px ${theme.palette.primary.main}`,
                  color: `primary.main`,
                  py: 1,
                  px: 4,
                  fontWeight: `600`,
                }}
              >
                <Link href="/dashboard/support">Declined</Link>
              </Box>
              <Box
                sx={{
                  backgroundColor: `primary.main`,
                  color: `secondary.main`,
                  py: 1,
                  px: 6,
                  fontWeight: `600`,
                }}
              >
                <Link href={`/account/event/${78}`}>View</Link>
              </Box>
            </Box>
          </Box>
        ) : null}
        {userInfo?.role === `provider` || userInfo?.role === `planner` ? (
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
        ) : null}

        {userInfo?.role === `user` && (
          <FinderSection token={token} queryData={queryData} />
        )}
      </DashboardLayout>
    </>
  );
};

export default HomePage;
