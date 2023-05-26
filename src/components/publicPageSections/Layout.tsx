import { Box } from '@mui/material';
import React from 'react';

const Layout = ({ children }: any) => {
  return (
    <>
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
