import { Box } from '@mui/material';
import React from 'react';
import FeedbackForm from '@/components/FeedbackForm';

type MessageProps = {
  userId: string;
  token: string;
};

export default function SendMessage({ userId, token }: MessageProps) {
  return (
    <Box>
      <FeedbackForm token={token} />
    </Box>
  );
}
