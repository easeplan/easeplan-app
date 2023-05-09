import React from 'react';
import { Box } from '@mui/material';

interface PropsTypes {
  children: React.ReactElement;
}

const Layout = ({ children }: PropsTypes) => {
  return (
    <Box
      sx={{
        height: `100vh`,
        position: `relative`,
        transition: `all 0.5s ease-in`,
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
