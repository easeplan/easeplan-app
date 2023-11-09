import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import SearchInput from './SearchInput';

const Layout = ({ children, handleSearchChange, data, isSearch }: any) => {
  return (
    <div>
      <Header
        isSearch={isSearch}
        handleSearchChange={handleSearchChange}
        data={data}
      />
      <Box sx={{ pt: { md: 2, lg: 0, xl: 0 } }}>
        {isSearch && (
          <Box
            sx={{
              display: {
                xs: `block`,
                sm: `block`,
                md: `none`,
                lg: `none`,
                xl: `none`,
              },
              pt: { xs: 10, sm: 10, md: 15 },
              px: 4,
            }}
          >
            <SearchInput handleSearchChange={handleSearchChange} />
          </Box>
        )}
      </Box>
      <Box sx={{ height: `89vh`, mt: { xs: 2, sm: 3, md: 12, lg: 2, xl: 2 } }}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
