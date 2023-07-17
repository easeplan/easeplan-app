import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RecieverMessage from './RecieverMessage';
import SenderMessage from './SenderMessage';
import cahtImg from '@/public/avatar.png';
import Image from 'next/image';
import theme from '@/styles/theme';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const ChatBoard = () => {
  return (
    <Box sx={{ overflowY: `hidden` }}>
      <Box
        sx={{
          // borderTop: `solid 1px #ccc`,
          position: `relative`,
          height: `100%`,
        }}
      >
        <Box
          sx={{ p: `1rem`, borderBottom: `solid 1px #ccc`, background: `#fff` }}
        >
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
              <Typography fontWeight="bold" fontSize="0.8rem">
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
          <RecieverMessage />
          <SenderMessage />
          <RecieverMessage />
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
          <form>
            <Box sx={{ display: `flex` }}>
              <IconButton aria-label="delete" size="large">
                <AttachFileIcon />
              </IconButton>
              <textarea
                id="txtid"
                name="txtname"
                rows={1}
                cols={50}
                placeholder="Type here"
                style={{
                  width: `100%`,
                  padding: `1rem`,
                  overflowY: `scroll`,
                  resize: `none`,
                  border: `none`,
                }}
              />
              <Button
                variant="contained"
                sx={{ px: 4, ml: 2 }}
                endIcon={<SendIcon />}
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
