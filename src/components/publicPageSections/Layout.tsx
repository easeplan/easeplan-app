import { Box } from '@mui/material';
import React from 'react';
import Header from './Header';
import Footer from '../Footer';

const Layout = ({ children, publicId }: any) => {
  return (
    <Box sx={{ background: `#fafafa` }}>
      <Header publicId={publicId} />
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
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
