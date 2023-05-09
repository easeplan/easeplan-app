import React from 'react';
import { Box } from '@mui/material';
import logoImg from '@/public/logo.png';
import Image from 'next/image';
import Spinner from './Spinner';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        height: `100vh`,
        width: `100%`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `primary.main`,
        position: `relative`,
      }}
    >
      <Box>
        <Box
          sx={{
            textAlign: `center`,
          }}
        >
          <Spinner />
        </Box>
        <Box
          sx={{
            textAlign: `center`,
            mx: `auto`,
            position: `absolute`,
            bottom: `4rem`,
            left: `0`,
            right: `0`,
          }}
        >
          <Image src={logoImg} alt="logoImage" height={35} width={180} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
