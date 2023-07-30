import React from 'react';
import { Box } from '@mui/material';

const ChatLayout = ({ children }: any) => {
  return (
    <Box
      sx={{
        // border: `solid 1px #ccc`,
        boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
        p: 2,
        borderRadius: `8px`,
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
        height: `80vh`,
      }}
    >
      {children}
    </Box>
  );
};

export default ChatLayout;
