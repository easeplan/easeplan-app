import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Messages from './Messages';
import cahtImg from '@/public/avatar.png';
import Image from 'next/image';
import theme from '@/styles/theme';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ChatIcon from '@mui/icons-material/Chat';

const ChatBoard = ({ sendMessage, setChatMessage, chatMessage }: any) => {
  const { messages } = useSelector((state: RootState) => state.chatsData);

  return (
    <Box sx={{ overflowY: `hidden` }}>
      <Box
        sx={{
          position: `relative`,
          width: `100%`,
          height: `100%`,
          backgroundColor: `secondary.light`,
          borderRadius: `8px`,
        }}
      >
        <Box sx={{ p: `1rem`, background: `#fff` }}>
          {/* Active User at Header */}
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
              cursor: `pointer`,
            }}
          >
            <Box
              sx={{
                position: `relative`,
                width: `30px`,
                height: `30px`,
                borderRadius: `50%`,
                background: theme.palette.primary.main,
              }}
            >
              <Image
                src={cahtImg}
                alt="profileImg"
                fill
                style={{
                  borderRadius: `50%`,
                }}
              />
            </Box>
            <Box sx={{ width: `95%` }}>
              <Typography
                fontWeight="bold"
                fontSize="0.8rem"
                color="primary.main"
              >
                John Doe
              </Typography>
            </Box>
          </Box>
        </Box>
        {/*  Chats */}
        <Box
          sx={{
            overflowY: `scroll`,
            height: `100%`,
            px: `1rem`,
            pt: `2rem`,
            pb: `12rem`,
          }}
        >
          {messages?.length < 1 ? (
            <Box sx={{ textAlign: `center`, mt: `4rem` }}>
              <ChatIcon sx={{ fontSize: `3rem`, color: `#ccc` }} />
              <Typography color="#ccc">You have no messages yet!</Typography>
            </Box>
          ) : (
            <>
              <Messages />
            </>
          )}
        </Box>
        {/* Form for sending message */}
        <Box
          sx={{
            position: `absolute`,
            bottom: `0`,
            width: `100%`,
            p: `1rem`,
            background: theme.palette.secondary.light,
            borderTop: `solid 1px #ccc`,
          }}
        >
          <form onSubmit={sendMessage}>
            <Box sx={{ display: `flex` }}>
              <IconButton aria-label="delete" size="large">
                <AttachFileIcon />
              </IconButton>
              <textarea
                id="txtid"
                name="txtname"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                rows={1}
                cols={50}
                placeholder="Type here"
                style={{
                  width: `100%`,
                  padding: `1rem`,
                  overflowY: `scroll`,
                  resize: `none`,
                  border: `none`,
                  outline: `none`,
                }}
              />
              <Button
                variant="contained"
                sx={{ px: 4, ml: 2 }}
                endIcon={<SendIcon />}
                type="submit"
              >
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBoard;
