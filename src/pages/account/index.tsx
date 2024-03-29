/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import FinderSection from '@/components/FinderSection';
import { Box, Button, Typography, Alert } from '@mui/material';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorPage from '@/components/ErrorPage';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import bannerImg from '@/public/banner.png';
import Image from 'next/image';
import Link from 'next/link';
import theme from '@/styles/theme';
import { setNotifyData } from '@/features/notificationsSlice';
import { useDispatch } from 'react-redux';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface Props {
  token: string;
}

const HomePage = ({ token }: Props) => {
  const dispatch = useDispatch();
  const { notifyData } = useSelector((state: RootState) => state.notifications);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [contracts, setContracts] = useState<any>();
  const [notificationData, setNotificationData] = useState<any>();

  const fetchContracts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contracts/${userInfo?._id}`,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();
      setContracts(json?.data);
      dispatch(setNotifyData(json?.data));
      setNotificationData(json?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

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
    <>
      <DashboardLayout token={token}>
        {queryData?.provider?.providerProfile ? (
          <>
            {!queryData?.provider?.providerProfile?.verified && (
              <Alert
                severity="error"
                sx={{
                  mt: {
                    xs: 2,
                    md: 3,
                    lg: 3,
                  },
                  py: 1,
                }}
              >
                <Box
                  sx={{
                    display: `flex`,
                    flexDirection: {
                      xs: `column`,
                      sm: `row`,
                      md: `row`,
                    },
                    alignItems: `start`,
                  }}
                >
                  <Typography fontWeight={300}>
                    Verify your account to start getting bookings from client
                  </Typography>
                  <Link href="/account/settings/verify">
                    <Button
                      variant="outlined"
                      sx={{
                        ml: {
                          xs: `0rem`,
                          sm: `0rem`,
                          md: `1rem`,
                          lg: `1rem`,
                        },
                        fontSize: `0.7rem`,
                      }}
                      startIcon={<AdminPanelSettingsIcon />}
                    >
                      Start Verification
                    </Button>
                  </Link>
                </Box>
              </Alert>
            )}
          </>
        ) : null}

        {queryData?.provider?.providerProfile && <Dashboard data={queryData} />}
        {userInfo?.role === `provider` || userInfo?.role === `planner` ? (
          <>
            {contracts
              ?.filter((list: { status: string }) => list.status === `Accepted`)
              .map((list: any) => (
                <Box key={list?._id}>
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
                      {list.status === `Accepted` ? (
                        <>
                          <Typography
                            fontWeight="600"
                            fontSize="1.2rem"
                            color="primary.main"
                          >
                            Event Planning has started
                          </Typography>
                          <Typography color="grey.500" mt={1}>
                            The countdown is now ticking
                          </Typography>
                        </>
                      ) : (
                        <Box>
                          <Typography
                            fontWeight="600"
                            fontSize="1.2rem"
                            color="primary.main"
                          >
                            Are you available for this gig?
                          </Typography>
                          <Typography color="grey.500" mt={1}>
                            If you are please accept the event or decline if you
                            are not available
                          </Typography>
                        </Box>
                      )}
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
                      {list.status === `Accepted` ? null : (
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
                      )}

                      <Link href={`/account/contracts/${list?._id}`}>
                        <Button variant="outlined">View Event</Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              ))}
          </>
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

        <FinderSection
          token={token}
          queryData={queryData?.provider}
          notificationData={notificationData}
        />

        {/* <>
          {contracts?.length < 1 ? (
            <Box sx={{ textAlign: `center`, mt: 10, color: `grey.500` }}>
              <Typography>Your ongoing events will show here</Typography>
            </Box>
          ) : (
            <>
              {contracts?.map((list: any) => (
                <Box key={list._id}>
                  {list.status === `Requested` ? (
                    <Box
                      key={list?._id}
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
                        p: {
                          xs: 3,
                          sm: 3,
                          md: 3,
                          lg: 4,
                        },
                        mt: 4,
                        border: ` solid 1px #ccc`,
                      }}
                    >
                      <Box>
                        <Box>
                          <Typography
                            fontWeight="600"
                            fontSize="1.2rem"
                            color="primary.main"
                          >
                            Are you available for this gig?
                          </Typography>
                          <Typography color="grey.500" mt={1}>
                            If you are please accept the event or decline if you
                            are not available
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: `flex`,
                          justifyContent: `start`,
                          gap: `2rem`,
                          textAlign: `center`,
                          width: {
                            xs: `100%`,
                            sm: `100%`,
                            lg: `auto`,
                          },
                          mt: {
                            xs: `2rem`,
                            sm: `2rem`,
                          },
                        }}
                      >
                        <Link
                          href="/dashboard/support"
                          style={{ marginRight: `0.3rem` }}
                        >
                          <Button
                            type="button"
                            variant="outlined"
                            sx={{
                              textTransform: `capitalize`,
                            }}
                          >
                            Declined offer
                          </Button>
                        </Link>
                        <Link href={`/account/contracts/${list?._id}`}>
                          <Button
                            type="button"
                            variant="contained"
                            sx={{
                              textTransform: `capitalize`,
                              color: `secondary.main`,
                            }}
                          >
                            View offer
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
              ))}
            </>
          )}
        </> */}
      </DashboardLayout>
    </>
  );
};

export default HomePage;
