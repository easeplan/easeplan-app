import { Box } from '@mui/material';
import React from 'react';
import Header from './Header';

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          width: {
            xs: `85%`,
            sm: `85%`,
            md: `70%`,
            lg: `70%`,
          },
          margin: `0 auto`,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
