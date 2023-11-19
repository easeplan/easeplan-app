import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import UsersCard from './UsersCard';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';

const RecentChats = ({
  conversationList,
  setActiveUserID,
  setAllMessages,
  token,
  userInfo,
  setOpenChat,
  handleInChat,
}: any) => {
  return (
    <>
      {conversationList?.conversations?.length > 0 ? (
        conversationList.conversations.map((conversation: any) => {
          const otherParticipant = conversation.participants.find(
            (participant: any) => participant._id !== userInfo,
          );

          if (!otherParticipant || !otherParticipant.profile) {
            return null; // or some fallback UI
          }

          return (
            <UsersCard
              key={conversation?._id}
              data={conversation}
              conversations={conversationList?.conversations}
              token={token}
              setActiveUserID={setActiveUserID}
              setAllMessages={setAllMessages}
              conversation={conversation}
              otherParticipant={otherParticipant}
              setOpenChat={setOpenChat}
              handleInChat={handleInChat}
            />
          );
        })
      ) : (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box sx={{ textAlign: 'center', color: '#ccc' }}>
            <CommentsDisabledIcon />
            <Typography>No Recent Messages</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default RecentChats;
