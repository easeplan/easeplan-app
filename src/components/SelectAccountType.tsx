import theme from '@/styles/theme';
import { Box, Container, Grid, Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FinderIcon from '@/public/finder.gif';
import PlannerIcon from '@/public/planner.gif';
import VendorIcon from '@/public/vendor.gif';
import Loader from '@/public/loader.gif';
import Logo from '@/public/easeplanlogo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

const SelectAccountType = () => {
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
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/add-role`, {
        role: `user`,
        email: `${userEmail}`,
      });
      router.push(`/onboarding`);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updatePlannerRole = async () => {
    try {
      setIsLoading(true);
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/add-role`, {
        role: `planner`,
        email: `${userEmail}`,
      });
      router.push(`/onboarding`);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updateVendorRole = async () => {
    try {
      setIsLoading(true);
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/add-role`, {
        role: `vendor`,
        email: `${userEmail}`,
      });
      router.push(`/onboarding`);
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
            <div>
              <Box sx={{ marginBottom: `2rem` }}>
                <Image src={Logo} alt="loaderImg" width={80} height={50} />
              </Box>
              <Image src={Loader} alt="loaderImg" width={100} height={100} />
              <Typography
                sx={{
                  fontSize: 20,
                  color: `${theme.palette.secondary.light}`,
                }}
              >
                Creating account...
              </Typography>
            </div>
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
