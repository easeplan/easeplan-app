import React from 'react';
import theme from '@/styles/theme';
import { Box } from '@mui/material';
import Image from 'next/image';
import logoImg from '@/public/easeplanlogo.png';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        background: `${theme.palette.primary.main}`,
        height: `100vh`,
        width: `100%`,
        position: `fixed`,
        top: `0`,
        left: `0`,
        zIndex: `99`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        textAlign: `center`,
      }}
    >
      <div>
        <Image src={logoImg} alt="logo" height={60} width={100} />
        <p>Creating your account in seconds!!!</p>
      </div>
    </Box>
  );
};

export default LoadingScreen;
