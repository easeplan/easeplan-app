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
    if (typeof window !== `undefined`) {
      const email = localStorage.getItem(`userEmail`);
      setUserEmail(email);
    }
  }, []);

  const updateUserRole = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/add-role`,
        {
          role: `user`,
          email: `${userEmail}`,
        },
      );
      const { role, onboardStage, _id } = data?.data;
      dispatch(setCredentials({ role, onboardStage, _id }));
      router.push(`/onboarding`);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updatePlannerRole = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/add-role`,
        {
          role: `planner`,
          email: `${userEmail}`,
        },
      );
      const { role, onboardStage, _id } = data?.data;
      dispatch(setCredentials({ role, onboardStage, _id }));
      router.push(`/onboarding`);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updateVendorRole = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/add-role`,
        {
          role: `provider`,
          email: `${userEmail}`,
        },
      );
      console.log(data);
      if (data.status === `success`) {
        const { role, onboardStage, _id } = data?.data;
        dispatch(setCredentials({ role, onboardStage, _id }));
        router.push(`/onboarding`);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Box
        style={{ zIndex: `99` }}
        sx={{
          position: `fixed`,
          top: `0`,
          right: `0`,
          width: `100%`,
          height: `100vh`,
          background: `${theme.palette.primary.main}`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          textAlign: `center`,
        }}
      >
        <Container fixed>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <h2
                style={{
                  color: `${theme.palette.secondary.light}`,
                }}
              >
                What will you like to use easeplan to do?
              </h2>
              <Grid container spacing={2} justifyContent="center" mt={6}>
                <Grid item xs={6} sm={6} md={5}>
                  <Card
                    onClick={updateUserRole}
                    sx={{
                      minHeight: 100,
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
                        src={FinderIcon}
                        alt="waitlistImg"
                        width={70}
                        height={70}
                      />
                      <Typography
                        sx={{
                          fontSize: 16,
                          color: `${theme.palette.primary.main}`,
                        }}
                        gutterBottom
                      >
                        I need an event planner and vendors
                      </Typography>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={6} md={5}>
                  <Card
                    onClick={updatePlannerRole}
                    sx={{
                      minHeight: 100,
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
                        width={70}
                        height={70}
                      />
                      <Typography
                        sx={{
                          fontSize: 16,
                          color: `${theme.palette.primary.main}`,
                        }}
                        gutterBottom
                      >
                        I&apos;m an event planner
                      </Typography>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={8} sm={6} md={6}>
                  <Card
                    onClick={updateVendorRole}
                    sx={{
                      minHeight: 100,
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
                        src={VendorIcon}
                        alt="waitlistImg"
                        width={70}
                        height={70}
                      />
                      <Typography
                        sx={{
                          fontSize: 16,
                          color: `${theme.palette.primary.main}`,
                        }}
                        gutterBottom
                      >
                        I&apos;m a vendor
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
