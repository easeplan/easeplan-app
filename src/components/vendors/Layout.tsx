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
      <Box sx={{ pt: { md: 15, lg: 0, xl: 0 } }}>
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
              pt: { xs: 15, sm: 15, md: 15 },
              px: 4,
            }}
          >
            <SearchInput handleSearchChange={handleSearchChange} />
          </Box>
        )}
      </Box>
      <>{children}</>
    </div>
  );
};

export default Layout;
