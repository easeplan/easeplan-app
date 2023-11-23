import { Box } from '@mui/material';
import React from 'react';
import Header from './Header';
import Footer from '../Footer';

const Layout = ({ children, publicId, userData }: any) => {
  return (
    <Box sx={{ background: '#fafafa' }}>
      <Header publicId={publicId} userData={userData} />
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '100%',
          },
          margin: '0 auto',
        }}
      >
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
