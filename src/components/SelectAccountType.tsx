import theme from '@/styles/theme';
import { Box, Container, Grid, Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FinderIcon from '@/public/finder.gif';
import PlannerIcon from '@/public/planner.gif';
import VendorIcon from '@/public/vendor.gif';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import LoadingScreen from './common/LoadingScreen';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/authSlice';

const SelectAccountType = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
    }
  }, []);

  const updateUserRole = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/add-role`,
        {
          role: 'user',
          email: `${userEmail}`,
        },
      );
      const { role, onboardStage, _id } = data?.data;
      dispatch(setCredentials({ role, onboardStage, _id }));
      router.push('/onboarding');
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // const updatePlannerRole = async () => {
  //   try {
  //     setIsLoading(true);
  //     const { data } = await axios.put(
  //       `${process.env.NEXT_PUBLIC_API_URL}/users/add-role`,
  //       {
  //         role: `planner`,
  //         email: `${userEmail}`,
  //       },
  //     );
  //     const { role, onboardStage, _id } = data?.data;
  //     dispatch(setCredentials({ role, onboardStage, _id }));
  //     router.push(`/onboarding`);
  //   } catch (error: any) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // };

  const updateVendorRole = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/add-role`,
        {
          role: 'provider',
          email: `${userEmail}`,
        },
      );
      if (data.status === 'success') {
        const { role, onboardStage, _id } = data?.data;
        dispatch(setCredentials({ role, onboardStage, _id }));
        router.push('/onboarding');
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Box
        style={{ zIndex: '99' }}
        sx={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '100%',
          height: '100vh',
          background: `${theme.palette.primary.main}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Container fixed>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: '1.5rem',
                    sm: '2rem',
                    md: '2.5rem',
                    lg: '2.5rem',
                  },
                  fontWeight: 'bold',
                  color: `${theme.palette.secondary.light}`,
                }}
              >
                What will you like to use easeplan to do?
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="stretch"
                mt={6}
              >
                <Grid item xs={6} sm={6} md={5}>
                  <Card
                    onClick={updateUserRole}
                    sx={{
                      minHeight: '250px',
                      // height: `400px`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      p: 2,
                      '&:hover': {
                        background: `${theme.palette.secondary.light}`,
                      },
                    }}
                  >
                    <div>
                      <Image
                        src={FinderIcon}
                        alt="waitlistImg"
                        width={100}
                        height={100}
                      />
                      <Typography
                        sx={{
                          fontSize: {
                            xs: '1rem',
                            sm: '1rem',
                            md: '1.2rem',
                            lg: '1.2rem',
                          },
                          fontWeight: '700',
                          color: `${theme.palette.primary.main}`,
                        }}
                        gutterBottom
                      >
                        I need a Service Provider
                      </Typography>
                    </div>
                  </Card>
                </Grid>
                {/* <Grid item xs={6} sm={6} md={5}>
                  <Card
                    onClick={updatePlannerRole}
                    sx={{
                      minHeight: `250px`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      textAlign: `center`,
                      cursor: `pointer`,
                      p: 2,
                      '&:hover': {
                        background: `${theme.palette.secondary.light}`,
                      },
                    }}
                  >
                    <div>
                      <Image
                        src={PlannerIcon}
                        alt="waitlistImg"
                        width={100}
                        height={100}
                      />
                      <Typography
                        sx={{
                          fontSize: {
                            xs: `1rem`,
                            sm: `1rem`,
                            md: `1.2rem`,
                            lg: `1.2rem`,
                          },
                          fontWeight: `700`,
                          color: `${theme.palette.primary.main}`,
                        }}
                        gutterBottom
                      >
                        I&apos;m an Event Planner
                      </Typography>
                    </div>
                  </Card>
                </Grid> */}
                <Grid item xs={8} sm={6} md={6}>
                  <Card
                    onClick={updateVendorRole}
                    sx={{
                      // minHeight: `200px`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      p: 2,
                      '&:hover': {
                        background: `${theme.palette.secondary.light}`,
                      },
                    }}
                  >
                    <div>
                      <Image
                        src={VendorIcon}
                        alt="waitlistImg"
                        width={100}
                        height={100}
                      />
                      <Typography
                        sx={{
                          fontSize: {
                            xs: '1rem',
                            sm: '1rem',
                            md: '1.2rem',
                            lg: '1.2rem',
                          },
                          fontWeight: '700',
                          color: `${theme.palette.primary.main}`,
                        }}
                        gutterBottom
                      >
                        I&apos;m a Service Provider
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: `${theme.palette.primary.main}`,
                        }}
                        gutterBottom
                      >
                        E.g: DJ, Catering, MC, Bouncer, Make-up Artist,
                        Photographer
                      </Typography>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default SelectAccountType;
