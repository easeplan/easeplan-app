import React from 'react';
import { Box, Button } from '@mui/material';
import logoImg from '@/public/logo.png';
import errImg from '@/public/404/404.png';
import Image from 'next/image';

const ErrorPage = () => {
  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        height: `100vh`,
        width: `100%`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `secondary.light`,
        position: `relative`,
      }}
    >
      <Box>
        <Box
          sx={{
            textAlign: `center`,
            mx: `auto`,
            position: `absolute`,
            top: `4rem`,
            left: `0`,
            right: `0`,
          }}
        >
          <Image src={logoImg} alt="logoImage" height={35} width={180} />
        </Box>
        <Box>
          <Image src={errImg} alt="logoImage" height={400} width={350} />
        </Box>
        <Box sx={{ textAlign: `center` }}>
          <Button variant="contained" onClick={handleReloadPage}>
            Try Again
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;
