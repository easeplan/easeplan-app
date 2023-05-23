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

interface Props {
  token: string;
}

const HomePage = ({ token }: Props) => {
  // const { queryData, error, isLoading } = useFetch(`/users`, token);

  // console.log(queryData);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // if (error) {
  //   return <p>Error:</p>;
  // }

  return (
    <>
      <DashboardLayout token={token}>
        {/* {queryData?.details?.role === `planner` && (
          <Dashboard data={queryData} />
        )}
        {queryData?.details?.role === `vendor` && (
          <Dashboard data={queryData} />
        )} */}

        {/* {queryData?.identityVerify?.idDocument ? null : (
          <Badge data={queryData} />
        )} */}

        {/* {queryData?.details?.role === `user` && <FinderSection />}

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
        </Box> */}
      </DashboardLayout>
    </>
  );
};

export default HomePage;
