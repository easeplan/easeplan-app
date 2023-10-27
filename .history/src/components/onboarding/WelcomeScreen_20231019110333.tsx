import { Box, Divider, Typography, Button, Modal } from '@mui/material';
import logoImg from '@/public/logo.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import IllusImg from '@/public/onboarding-image/welcome-img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIntro, setIntroOne } from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useState } from 'react';

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const { intro } = useSelector((state: RootState) => state.onboarding);
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNextSlide = () => {
    dispatch(setIntro(false));
    dispatch(setIntroOne(true));
  };

  return (
    <>
      {intro && (
        <Box
          sx={{
            display: `flex`,
            height: `100vh`,
            width: `100%`,
            backgroundColor: `primary.main`,
          }}
        >
          <Box
            sx={{
              width: `100%`,
              display: {
                xs: `flex`,
                sm: `flex`,
                md: `flex`,
                lg: `flex`,
                xl: `flex`,
              },
              alignItems: `center`,
              px: {
                xs: `2rem`,
                sm: `2rem`,
                md: `4rem`,
                lg: `6rem`,
              },
              justifyContent: `center`,
              backgroundColor: `secondary.light`,
            }}
            component={motion.section}
            {...headContainerAnimation}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary.main"
                sx={{
                  fontSize: {
                    xs: `1.1rem`,
                    md: `1.5rem`,
                    lg: `1.5rem`,
                  },
                  mb: 6,
                }}
              >
                Ready to start getting offers on Easeplan? <br /> Here`s the
                breakdown:
              </Typography>
              <Divider />
              <Box sx={{ display: `flex`, alignItems: `center`, my: 2 }}>
                <StorefrontIcon
                  sx={{
                    fontSize: {
                      xs: `2rem`,
                      md: `2rem`,
                      lg: `2.5rem`,
                    },
                    color: `primary.main`,
                  }}
                />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `1rem`,
                        md: `1.2rem`,
                        lg: `1.2rem`,
                      },
                    }}
                  >
                    Create your vendor profile
                  </Typography>
                  <Typography
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `0.9rem`,
                        md: `1rem`,
                        lg: `1rem`,
                      },
                      mt: 1,
                    }}
                  >
                    Add your profile picture, description, and professional
                    information.
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: `flex`, alignItems: `center`, my: 2 }}>
                <PortraitIcon
                  sx={{
                    fontSize: {
                      xs: `2rem`,
                      md: `2rem`,
                      lg: `2.5rem`,
                    },
                    color: `primary.main`,
                  }}
                />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `1rem`,
                        md: `1.2rem`,
                        lg: `1.2rem`,
                      },
                    }}
                  >
                    Upload your previous jobs
                  </Typography>
                  <Typography
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `0.9rem`,
                        md: `1rem`,
                        lg: `1rem`,
                      },
                      mt: 1,
                    }}
                  >
                    Add pictures of your previous jobs to convince clients / get
                    credits.
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: `flex`, alignItems: `center`, my: 2 }}>
                <LocalAtmIcon
                  sx={{
                    fontSize: {
                      xs: `2rem`,
                      md: `2rem`,
                      lg: `2.5rem`,
                    },
                    color: `primary.main`,
                  }}
                />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `1rem`,
                        md: `1.2rem`,
                        lg: `1.2rem`,
                      },
                    }}
                  >
                    Publish your profile and start making money.
                  </Typography>
                  <Typography
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `0.9rem`,
                        md: `1rem`,
                        lg: `1rem`,
                      },
                      mt: 1,
                    }}
                  >
                    Complete your profile information to be able to
                    withdraw your earnings.
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ textAlign: `center` }}>
                <Button
                  onClick={handleNextSlide}
                  sx={{
                    mt: `2rem`,
                    backgroundColor: `primary.main`,
                    color: `white`,
                    '&:hover': {
                      backgroundColor: `secondary.main`,
                      color: `primary.main`,
                    },
                    borderRadius: `30px`,
                    p: `0.7rem 4rem`,
                    fontWeight: 700,
                    fontSize: `1rem`,
                    textTransform: `inherit`,
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
            {/* <Typography variant="h5" fontWeight={600} color="primary.main">
              <FaQuoteLeft />
              You are just a few clicks away from connecting with a wide range
              of customers and clients in need of your services.
            </Typography> */}
          </Box>
          <Box
            sx={{
              display: {
                xs: `none`,
                sm: `none`,
                md: `none`,
                lg: `flex`,
                xl: `flex`,
              },
              alignItems: `center`,
              p: `2rem`,
              backgroundColor: `primary.main`,
              width: `50%`,
              height: `100%`,
            }}
          >
            <Box
              sx={{
                width: `100%`,
              }}
            >
              <Box
                component={motion.div}
                {...headTextAnimation}
                sx={{
                  position: `relative`,
                  textAlign: `center`,
                  mt: `2rem`,
                }}
              >
                <Image src={logoImg} alt="logoImage" height={35} width={180} />
              </Box>
              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `300px`,
                  mt: `2rem`,
                }}
              >
                <Image src={IllusImg} alt="logoImage" fill />
              </Box>
              {/* <Box
                sx={{
                  mt: {
                    xs: `3rem`,
                    sm: `1rem`,
                    lg: `6rem`,
                  },
                  px: `2rem`,
                  textAlign: `center`,
                }}
              >
                <CustomButton
                  bgSecondary
                  smWidth="100%"
                  lgWidth="50%"
                  onClick={handleNextSlide}
                >
                  Get Started
                </CustomButton>
              </Box> */}
            </Box>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
            }}
          >
            <Box
              style={{
                padding: 20,
                backgroundColor: `white`,
                borderRadius: 10,
                boxShadow: `0 3px 10px rgba(0, 0, 0, 0.2)`,
              }}
            >
              <Typography variant="h6" style={{ marginBottom: 20 }}>
                Service Provider Agreement
              </Typography>
              <Typography variant="body2" style={{ marginBottom: 20 }}>
                Some of the Agreements here
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                style={{ marginRight: 10 }}
                onClick={handleClose}
              >
                Learn more
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 10 }}
                onClick={handleClose}
                sx={{
                  position: `relative`,
                  textAlign: `center`,
                  mt: `2rem`,
                }}
              >
                Agree and Continue
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Decline
              </Button>
            </Box>
          </Modal>
        </Box>
      )}
    </>
  );
};

export default WelcomeScreen;
