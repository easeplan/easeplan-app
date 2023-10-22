import React from 'react';
import { Box } from '@mui/material';

const ChatLayout = ({ children }: any) => {
  return (
    <Box
      sx={{
        position: `relative`,
        // boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
        borderRadius: `8px`,
        display: `grid`,
        gridTemplateColumns: `1fr 2fr`,
        gridDirection: {
          xs: `column`,
          sm: `column`,
          md: `row`,
          lg: `row`,
          xl: `row`,
        },
        height: `88vh`,
        width: `100%`,
      }}
    >
      {children}
    </Box>
  );
};

export default ChatLayout;
