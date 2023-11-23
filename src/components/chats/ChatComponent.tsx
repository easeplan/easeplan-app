import {
  Avatar,
  Box,
  Grid,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
  ListItemText,
  ListItemProps,
} from '@mui/material';
import chatImg from '@/public/avatar.png';
import Image from 'next/image';
import theme from '@/styles/theme';
import { forwardRef, useEffect, useRef } from 'react';

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
  const lastMessageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Grid container sx={{ pr: 2, pl: { xl: 1, lg: 1, md: 1, sm: 0, xs: 0 } }}>
      {messages?.map((message: any, index: any) => {
        const isCurrentUser = message.sender?._id === userInfoId?.provider?._id;

        return (
          <ListItem
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            alignItems="flex-start"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
            }}
          >
            {!isCurrentUser && (
              <ListItemAvatar>
                <Image
                  src={message?.sender?.profile?.picture || chatImg}
                  alt="Profile"
                  width={40}
                  height={40}
                  style={{
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                />
              </ListItemAvatar>
            )}
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: 'inline-block',
                    borderRadius: '10px',
                    backgroundColor:
                      message.type === 'text'
                        ? isCurrentUser
                          ? theme.palette.primary.main
                          : theme.palette.primary.light
                        : theme.palette.primary.light,
                    p: 1.2,
                    maxWidth: '75%',
                    textAlign: 'left',
                    color: 'white',
                    marginBottom: '0',
                  }}
                >
                  {message.type === 'text' ? (
                    <span>{message.message}</span>
                  ) : (
                    <Image
                      src={message.image}
                      alt="Chat content"
                      style={{
                        border: `3px solid ${
                          isCurrentUser
                            ? theme.palette.primary.main
                            : theme.palette.primary.light
                        }`,
                        borderRadius: '10px',
                      }}
                      width="150"
                      height="150"
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
                    textAlign: isCurrentUser ? 'right' : 'left',
                    color: 'gray',
                    marginBottom: '4px', // reduce this value as needed
                  }}
                >
                  {formatTime(message?.createdAt)}
                </Typography>
              }
              style={{
                textAlign: isCurrentUser ? 'right' : 'left',
              }}
            />
            {isCurrentUser && (
              <ListItemAvatar>
                <Image
                  src={userInfoId?.provider?.profile?.picture || chatImg}
                  alt="Profile"
                  width={40}
                  height={40}
                  style={{
                    borderRadius: '50%',
                    marginLeft: '8px', // Add a margin to the left if it's the current user
                  }}
                />
              </ListItemAvatar>
            )}
          </ListItem>
        );
      })}
    </Grid>
  );
};

export default ChatComponent;
