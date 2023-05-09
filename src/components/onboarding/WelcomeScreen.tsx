import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import logoImg from '@/public/logo.png';
import Image from 'next/image';
import CustomButton from '../common/CustomButton';
import { motion } from 'framer-motion';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import { useAuthUser } from '@/context/contextStore';
import IllusImg from '@/public/onboarding-image/welcome-img.svg';
import { FaQuoteLeft } from 'react-icons/fa';

const WelcomeScreen = () => {
  const { queryData, intro, setIntro, introOne, setIntroOne, setStep1 } =
    useAuthUser();

  const handleNextSlide = () => {
    if (queryData?.details?.role === `user`) {
      setIntroOne(true);
      setIntro(false);
    } else {
      setIntro(false);
      setStep1(true);
    }
  };

  return (
    <>
      {intro && (
        <Box
          sx={{
            display: `flex`,
            height: `100vh`,
            backgroundColor: `primary.main`,
          }}
        >
          <Box
            sx={{
              p: `2rem`,
              backgroundColor: `primary.main`,
              width: `100%`,
              height: `100vh`,
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
              <Box
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
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: `40%`,
              display: {
                xs: `none`,
                sm: `none`,
                md: `none`,
                lg: `flex`,
                xl: `flex`,
              },
              alignItems: `center`,
              px: `3rem`,
              justifyContent: `center`,
              backgroundColor: `secondary.light`,
            }}
            component={motion.section}
            {...headContainerAnimation}
          >
            {queryData?.details?.role === `user` ? (
              <Typography variant="h5" fontWeight={600} color="primary.main">
                <FaQuoteLeft /> {` `}
                Welcome to the event app! Let&apos;s get you started in two
                quick and easy steps
              </Typography>
            ) : (
              <Typography variant="h5" fontWeight={600} color="primary.main">
                <FaQuoteLeft /> {` `}
                You are just a few clicks away from connecting with a wide range
                of customers and clients in need of your services.
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default WelcomeScreen;
