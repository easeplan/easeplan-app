import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import SearchInput from './SearchInput';

const Layout = ({ children, handleSearchChange, data }: any) => {
  return (
    <div>
      <Header handleSearchChange={handleSearchChange} data={data} />
      <Box>
        <Box
          sx={{
            display: {
              xs: `block`,
              sm: `block`,
              md: `none`,
              lg: `none`,
              xl: `none`,
            },
            pt: { xs: 10, sm: 10 },
            px: 4,
          }}
        >
          <SearchInput handleSearchChange={handleSearchChange} />
        </Box>
      </Box>
      <>{children}</>
    </div>
  );
};

export default Layout;
