import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import cahtImg from '@/public/banner.png';
import Image from 'next/image';
import theme from '@/styles/theme';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '@/features/chatsSlice';

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, currentMessage } = useSelector(
    (state: RootState) => state.chatsData,
  );
  // const [newMessages, setMessages] = useState(messages?.messages);

  // const addNewObject = () => {
  //   setMessages((prevMessages: any) => [...prevMessages, currentMessage]);
  // };

  console.log(currentMessage);
  return (
    <>
      {
        <Box sx={{ display: `flex` }}>
          <h1>Hello Message Card</h1>
        </Box>
      }
    </>
  );
};

export default Messages;
