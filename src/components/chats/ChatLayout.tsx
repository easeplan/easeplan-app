import React from 'react';
import { Box } from '@mui/material';

const ChatLayout = ({ children }: any) => {
  return (
    <Box
      sx={{
        border: `solid 1px #ccc`,
        mt: `1rem`,
        display: `grid`,
        gridTemplateColumns: `1fr 2fr`,
        gridDirection: {
          xs: `column`,
          sm: `column`,
          md: `row`,
          lg: `row`,
          xl: `row`,
        },
        height: `70vh`,
      }}
    >
      {children}
    </Box>
  );
};

export default ChatLayout;
