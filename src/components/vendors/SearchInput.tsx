import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

const SearchInput = ({ handleSearchChange }: any) => {
  return (
    <Box
      sx={{
        boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
        color: `primary.main`,
        background: `#fff`,
        borderRadius: `10px`,
        borderColor: `secondary.main`,
        textTransform: `inherit`,
        mr: 6,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `space-between`,
        position: `relative`,
        width: {
          xs: `100%`,
          sm: `100%`,
          md: `20rem`,
          lg: `30rem`,
          xl: `30rem`,
        },
        '&:hover': {
          background: `#fff`,
        },
      }}
    >
      <input
        placeholder="Search"
        onKeyUp={handleSearchChange}
        className="searchInput"
      />
      <SearchIcon className="searchIcon" />
    </Box>
  );
};

export default SearchInput;
