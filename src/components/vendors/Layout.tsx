import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import SearchInput from './SearchInput';

const Layout = ({
  children,
  handleSearchChange,
  data,
  isSearch,
  inchat,
  searchParams,
}: any) => {
  return (
    <div>
      {!inchat && (
        <Header
          isSearch={isSearch}
          handleSearchChange={handleSearchChange}
          data={data}
        />
      )}
      <Box sx={{ pt: { md: 2, lg: 0, xl: 0 } }}>
        {isSearch && (
          <Box
            sx={{
              display: {
                xs: 'block',
                sm: 'block',
                md: 'none',
                lg: 'none',
                xl: 'none',
              },
              pt: { xs: 10, sm: 10, md: 15 },
              px: 4,
            }}
          >
            <SearchInput
              handleSearchChange={handleSearchChange}
              searchParams={searchParams}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          height: '89vh',
          mt: {
            xs: inchat ? 0 : 0,
            sm: inchat ? 0 : 0,
            md: 8,
            lg: 10,
            xl: 10,
          },
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default Layout;
