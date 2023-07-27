import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import cahtImg from '@/public/avatar.png';
import theme from '@/styles/theme';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages, setActiveUserData } from '@/features/chatsSlice';

const UsersCard = ({ data, token }: any) => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const { messages } = useSelector((state: RootState) => state.chatsData);

  // console.log(messages);

  const handleSelectChat = async () => {
    const conversationID = data?._id;
    dispatch(setActiveUserData(data));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationID}/messages`,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const messagesHistory = await res.json();
      dispatch(setMessages(messagesHistory));
      // console.log(messagesHistory);
    } catch (error) {}
  };
  return (
    <Box
      onClick={handleSelectChat}
      sx={{
        display: `flex`,
        justifyContent: `space-between`,
        cursor: `pointer`,
        transition: `all 0.5s ease`,
        borderBottom: `solid 1px #ccc`,
        '&:hover': {
          background: theme.palette.secondary.light,
          // boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
        },
        '&::focus': {
          background: theme.palette.primary.main,
          // boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
        },
        p: `1rem`,
      }}
    >
      <Box
        sx={{
          position: `relative`,
          width: `40px`,
          height: `40px`,
          borderRadius: `50%`,
          background: `red`,
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
      <Box sx={{ width: `82%` }}>
        <Typography fontWeight="bold" fontSize="0.8rem">
          John Doe
        </Typography>
        <Typography fontSize="0.8rem">
          Gee, its been good news all day. i met someone special today. she
          really pretty.
        </Typography>
      </Box>
    </Box>
  );
};

export default UsersCard;
