import React from 'react';
import Header from './Header';
import { Box, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchDrawer from './SearchDrawer';

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <Box
        sx={{
          pt: 10,
          px: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 10,
            xl: 10,
          },
        }}
      >
        <Box
          sx={{
            display: {
              xs: `block`,
              sm: `block`,
              md: `block`,
              lg: `none`,
              xl: `none`,
            },
          }}
        >
          <Box sx={{ display: `flex` }}>
            <SearchDrawer />
            <Button variant="text" startIcon={<FilterListIcon />}>
              Filter
            </Button>
          </Box>
        </Box>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
