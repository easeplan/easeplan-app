/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import { Box, Button, Typography, Alert } from '@mui/material';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorPage from '@/components/ErrorPage';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import Link from 'next/link';
import { setNotifyData } from '@/features/notificationsSlice';
import { useDispatch } from 'react-redux';
import Divider from '@/components/common/Divider';
import { useAuth } from '@/hooks/authContext';

interface Props {
  token: string;
  userData: any;
}

const HomePage = ({ token, userData }: Props) => {
  const dispatch = useDispatch();
  const { setUser } = useAuth();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = userData?.provider?._id;
  const [contracts, setContracts] = useState<any>();
  const [notificationData, setNotificationData] = useState<any>();
  // useActivityTracker(userInfo as string);
  useEffect(() => {
    if (userData) {
      setUser(userData.provider);
    }
  }, [userData, setUser]);

  const fetchContracts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contracts/${userInfo}`,
        {
          headers: {
            'Content-Type': 'application/json',
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
        <Box sx={{ mt: { xs: 10, sm: 0, lg: 0, md: 0 } }}>
          {queryData?.provider?.providerProfile ? (
            <>
              {!queryData?.provider?.providerProfile?.verified && (
                <Alert
                  severity="error"
                  sx={{
                    mt: {
                      xs: 5,
                      md: 3,
                      lg: 3,
                      sm: 2,
                    },
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        sm: 'row',
                        md: 'row',
                      },
                      alignItems: 'start',
                    }}
                  >
                    <Typography fontWeight={300}>
                      You have a pending verification{' '}
                      <Link
                        href="/account/onboard"
                        style={{ fontWeight: '600' }}
                      >
                        [Continue]
                      </Link>
                    </Typography>
                  </Box>
                </Alert>
              )}
            </>
          ) : null}

          {queryData?.provider?.providerProfile && (
            <Dashboard data={queryData} />
          )}
          <>
            <Typography
              mt={4}
              fontSize="1.5rem"
              color="primary.main"
              fontWeight={700}
            >
              Recent Gigs
            </Typography>
            <Divider />
            {contracts?.length < 1 ? (
              <Box sx={{ textAlign: 'center', mt: 10, color: 'grey.500' }}>
                <Typography>Your ongoing events will show here</Typography>
              </Box>
            ) : (
              <>
                {contracts
                  ?.filter(
                    (list: { status: string }) => list.status === 'Requested',
                  )
                  .map((list: any) => (
                    <Box key={list?._id}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: {
                            xs: 'column',
                            sm: 'column',
                            md: 'row',
                            lg: 'row',
                            xl: 'row',
                          },
                          px: 4,
                          py: 2,
                          mt: 4,
                          border: ' solid 1px #ccc',
                        }}
                      >
                        <Box>
                          {list.status === 'Accepted' && (
                            <>
                              <Typography
                                fontWeight="600"
                                fontSize="1.2rem"
                                color="primary.main"
                              >
                                Awaiting Payment
                              </Typography>
                              <Typography color="grey.500" mt={1}>
                                We&apos;ll inform you once customer makes
                                payment
                              </Typography>
                            </>
                          )}

                          {list.status === 'Requested' && (
                            <Box>
                              <Typography
                                fontWeight="600"
                                fontSize="1.2rem"
                                color="primary.main"
                              >
                                Are you available for this gig?
                              </Typography>
                              <Typography color="grey.500" mt={1}>
                                If you are please accept the event or decline if
                                you are not available
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '2rem',
                            mt: {
                              xs: '2rem',
                              sm: '2rem',
                            },
                          }}
                        >
                          {/* {list.status === `Accepted` ? null : (
                          <Box
                            sx={{
                              border: `solid 1px ${theme.palette.primary.main}`,
                              color: `primary.main`,
                              py: 1,
                              px: 4,
                              fontWeight: `600`,
                            }}
                          >
                            <Link href="/">Declined</Link>
                          </Box>
                        )} */}

                          <Link href={`/account/contracts/${list?._id}`}>
                            <Button variant="outlined">View Offer</Button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </>
            )}
          </>

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
        </Box>
      </DashboardLayout>
    </>
  );
};

export default HomePage;
