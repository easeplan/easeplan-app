import React from 'react';
import { Box, Typography } from '@mui/material';
import UsersCard from './UsersCard';
import cahtImg from '@/public/avatar.png';

const RecentChats = () => {
  return (
    <Box
      sx={{
        borderRight: `solid 1px #ccc`,
        overflowY: `hidden`,
        height: `100%`,
      }}
    >
      <Box sx={{ p: `1rem` }}>
        <Typography>Recent Messages</Typography>
      </Box>
      <Box
        sx={{
          borderTop: `solid 1px #ccc`,
          borderRight: `solid 1px #ccc`,
          overflowY: `scroll`,
          height: `100%`,
          pb: `3.5rem`,
        }}
      >
        <UsersCard />
        <UsersCard />
        <UsersCard />
        <UsersCard />
        <UsersCard />
        <UsersCard />
        <UsersCard />
      </Box>
    </Box>
  );
};

export default RecentChats;
