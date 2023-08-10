import { Grid, Paper, Typography } from '@mui/material';
import chatImg from '@/public/avatar.png';
import Image from 'next/image';

const ChatComponent = ({ userInfoId, messages }: any) => {
  function formatTime(timestamp: any) {
    const date = new Date(timestamp);
    const options = { hour: `2-digit`, minute: `2-digit`, hour12: true };
    const formattedTime = new Intl.DateTimeFormat(
      `en-US`,
      options as any,
    ).format(date);

    // Extracting the minute and AM/PM part
    const timeParts = formattedTime.match(/(\d{2}:\d{2})([APMapm]{2})/);
    if (timeParts) {
      return `${timeParts[1]}${timeParts[2].toLowerCase()}`;
    }

    return formattedTime; // fallback
  }

  return (
    <Grid container spacing={2}>
      {messages.map((message: any, index: any) => {
        const isCurrentUser = message.sender?._id === userInfoId?.userId;

        return (
          <Grid
            item
            xs={12}
            key={index}
            style={{
              display: `flex`,
              flexDirection: isCurrentUser ? `row-reverse` : `row`,
              alignItems: `flex-end`, // Align to the bottom of the chat box
            }}
          >
            <Image
              src={
                isCurrentUser
                  ? userInfoId?.picture || chatImg
                  : message.sender?.profile.picture || chatImg
              }
              alt="Profile"
              width={40}
              height={40}
              style={{
                borderRadius: `50%`,
                margin: `0 8px`,
              }}
            />

            <div
              style={{
                display: `flex`,
                flexDirection: `column`,
                alignItems: isCurrentUser ? `flex-end` : `flex-start`,
                flex: 1,
              }}
            >
              <>
                <Paper
                  id="message"
                  sx={{
                    py: 1,
                    pl: 2,
                    pr: 2,
                    maxWidth: `80%`,
                    borderRadius: `10px`,
                    backgroundColor: isCurrentUser ? `#fff` : `primary.light`,
                    color: isCurrentUser ? `primary.main` : `#fff`,
                  }}
                >
                  {message.type === `text` ? (
                    <span>{message.message}</span>
                  ) : (
                    <img src={message.image} alt="Chat content" width={150} />
                  )}
                </Paper>
                <Typography fontSize="0.6rem" mt={0.5}>
                  {formatTime(message?.createdAt)}
                </Typography>
              </>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ChatComponent;
