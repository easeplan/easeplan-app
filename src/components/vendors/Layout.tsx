import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import SearchInput from './SearchInput';

const Layout = ({ children, handleSearchChange }: any) => {
  return (
    <div>
      <Header handleSearchChange={handleSearchChange} />
      <Box
        sx={{
          display: {
            xs: `block`,
            sm: `block`,
            md: `block`,
            lg: `none`,
            xl: `none`,
          },
          pt: 10,
          px: 4,
        }}
      >
        <SearchInput handleSearchChange={handleSearchChange} />
      </Box>
      <>{children}</>
    </div>
  );
};

export default Layout;
