import {
  Avatar,
  Box,
  Grid,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
  ListItemText,
} from '@mui/material';
import chatImg from '@/public/avatar.png';
import Image from 'next/image';
import theme from '@/styles/theme';
import { useEffect, useRef } from 'react';

const ChatComponent = ({ userInfoId, messages }: any) => {
  function formatTime(timestamp: any) {
    const date = new Date(timestamp);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = new Intl.DateTimeFormat(
      'en-US',
      options as any,
    ).format(date);

    // Extracting the minute and AM/PM part
    const timeParts = formattedTime.match(/(\d{2}:\d{2})([APMapm]{2})/);
    if (timeParts) {
      return `${timeParts[1]}${timeParts[2].toLowerCase()}`;
    }

    return formattedTime; // fallback
  }
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Grid container sx={{ pr: 4, pl: 4 }}>
      {messages?.map((message: any, index: any) => {
        const isCurrentUser = message.sender?._id === userInfoId?.provider?._id;

        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <ListItem
            key={message._id}
            //ref={index === messages.length - 1 ? lastMessageRef : null}
            alignItems="flex-start"
            style={{
              justifyContent: !isCurrentUser ? 'flex-end' : 'flex-start',
            }}
          >
            <ListItemAvatar
              style={{
                display: !isCurrentUser ? 'none' : 'inline-flex',
              }}
            >
              <Image
                src={
                  !isCurrentUser
                    ? userInfoId?.picture || chatImg
                    : message.sender?.profile.picture || chatImg
                }
                alt="Profile"
                width={40}
                height={40}
                style={{
                  borderRadius: '50%',
                  margin: '0 8px',
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: 'inline-block',
                    borderRadius: '10px',
                    bgcolor: !isCurrentUser
                      ? `${theme.palette.primary.light}`
                      : `${theme.palette.primary.main}`,
                    p: 1.2,
                    maxWidth: '75%',
                    textAlign: 'left',
                    color: 'white',
                  }}
                >
                  {message.type === 'text' ? (
                    <span>{message.message}</span>
                  ) : (
                    <Image
                      src={message.image}
                      alt="Chat content"
                      width={150}
                      height={150}
                    />
                  )}
                </Box>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  style={{
                    display: 'block',
                    textAlign: !isCurrentUser ? 'right' : 'left',
                    color: 'gray',
                  }}
                >
                  {formatTime(message?.createdAt)}
                </Typography>
              }
              style={{
                textAlign: !isCurrentUser ? 'right' : 'left',
              }}
            />
          </ListItem>
        );
      })}
    </Grid>
  );
};

export default ChatComponent;
