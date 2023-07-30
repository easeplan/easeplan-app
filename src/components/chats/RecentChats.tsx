import React from 'react';
import { Box, Typography } from '@mui/material';
import UsersCard from './UsersCard';
import cahtImg from '@/public/avatar.png';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';

const RecentChats = ({
  conversationList,
  setActiveUserID,
  setAllMessages,
  token,
}: any) => {
  return (
    <>
      <Box
        sx={{
          // borderRight: `solid 1px #ccc`,
          overflowY: `hidden`,
          height: `90%`,
        }}
      >
        <Box sx={{ p: `1rem` }}>
          <Typography
            fontWeight="bold"
            fontSize="1rem"
            color="primary.main"
            sx={{ borderBottom: `solid 1px #cccc`, mt: 1, pb: 2 }}
          >
            Recent Messages
          </Typography>
        </Box>
        <Box
          sx={{
            overflowY: `scroll`,
            height: `100%`,
            width: `100%`,
            pb: `3.5rem`,
            px: `1rem`,
          }}
        >
          {conversationList?.conversations?.length > 0 ? (
            <>
              {conversationList?.conversations?.map((conversation: any) => (
                <UsersCard
                  key={conversation?._id}
                  data={conversation}
                  conversations={conversationList?.conversations}
                  token={token}
                  setActiveUserID={setActiveUserID}
                  setAllMessages={setAllMessages}
                />
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
