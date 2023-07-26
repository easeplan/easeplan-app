import React from 'react';
import { Box, Typography } from '@mui/material';
import UsersCard from './UsersCard';
import cahtImg from '@/public/avatar.png';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';

const RecentChats = ({ conversationList, token }: any) => {
  return (
    <>
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
            width: `100%`,
            pb: `3.5rem`,
          }}
        >
          {conversationList?.conversations?.length > 0 ? (
            <>
              {conversationList?.conversations?.map((user: any) => (
                <UsersCard key={user?._id} data={user} token={token} />
              ))}
            </>
          ) : (
            <Box
              sx={{
                height: `100%`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
              }}
            >
              <Box sx={{ textAlign: `center`, color: `#ccc` }}>
                <CommentsDisabledIcon />
                <Typography>No Recent Messages</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RecentChats;
