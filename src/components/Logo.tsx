/* eslint-disable @typescript-eslint/no-use-before-define */
import Image from 'next/image';
import React from 'react';
import logoImg from '@/public/easeplanlogo.png';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Logo = () => {
  return (
    <LogoWrapper>
      <Image src={logoImg} alt="logoImage" width={50} height={30} />
      <Text>easeplan</Text>
    </LogoWrapper>
  );
};

const LogoWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  ...theme.typography.h6,

  '@media (max-width: 900px)': {
    img: {
      width: '70%',
      height: '70%',
    },
  },
}));

const Text = styled('p')({
  fontSize: '1.5rem;',

  '@media (max-width: 900px)': {
    display: 'none',
    // fontSize: `1rem;`,
  },
});

export default Logo;
