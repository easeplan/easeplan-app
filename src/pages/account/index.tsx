import { useEffect } from 'react';
import Badge from '@/components/common/Badge';
import Dashboard from '@/components/Dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import FinderSection from '@/components/FinderSection';
import Box from '@mui/material/Box';
import bannerImg from '@/public/banner.png';
import Image from 'next/image';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenAsync } from '@/features/cookie/cookieMiddleware';
// export { getServerSideProps } from '@/context/contextStore';

interface Props {
  token: string;
}

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((store: any) => store.token);

  useEffect(() => {
    // dispatch(setTokenAsync());
  }, []);

  console.log(token);
  const { queryData, error, isLoading } = useFetch(
    `/provider-profiles/profile`,
    `${token}`,
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
        {/* {queryData?.details?.role === `planner` && (
          <Dashboard data={queryData} />
        )}
        {queryData?.details?.role === `vendor` && (
          <Dashboard data={queryData} />
        )} */}

        {/* {queryData?.identityVerify?.idDocument ? null : (
          <Badge data={queryData} />
        )} */}

        {queryData?.details?.role === `user` && <FinderSection />}

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

// export async function getServerSideProps({ req }: any) {
//   const { token } = parseCookies(req);

//   if (!token) {
//     return {
//       redirect: {
//         destination: `/login`,
//         permanent: false,
//       },
//     };
//   }

//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/providers/profile`,
//     {
//       headers: {
//         'Content-Type': `application/json`,
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   return {
//     props: {
//       token: token,
//       data: data?.data?.serviceProvider,
//     },
//   };
// }
