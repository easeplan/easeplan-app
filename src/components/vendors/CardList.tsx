import React from 'react';
import Card from './Card';
import { Box } from '@mui/material';

const CardList = () => {
  return (
    <Box
      sx={{
        display: `grid`,
        gridTemplateColumns: {
          xs: `1fr`,
          sm: `1fr`,
          md: `1fr 1fr 1fr`,
          lg: `1fr 1fr 1fr 1fr`,
          xl: `1fr 1fr 1fr 1fr`,
        },
        gap: `2rem`,
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map((data, i) => (
        <Card key={i} />
      ))}
    </Box>
  );
};

export default CardList;
