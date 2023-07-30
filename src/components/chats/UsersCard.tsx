import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import cahtImg from '@/public/avatar.png';
import theme from '@/styles/theme';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages, setActiveUserData } from '@/features/chatsSlice';

const UsersCard = ({ data, conversations, setAllMessages, token }: any) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const { messages } = useSelector((state: RootState) => state.chatsData);
  const [newConversation, setNewConversation] = useState();
  const [lastMessage, setLastMessage] = useState();

  // console.log(data?.participants.filter((user) => user));

  const activeUser = (arr: any) => {
    const activeUsers: any = [];
    arr
      .filter((user: any) => user._id != userInfo?._id)
      .map((user: any) => activeUsers.push(user));

    return activeUsers;
  };

  const activeConversation = activeUser(data?.participants);

  const newUpdate = activeConversation?.map((conversation: any) => {
    return conversation;
  });

  const [activeUserID] = useState<any>(
    typeof window !== `undefined`
      ? localStorage.setItem(`activeUserID`, `${newUpdate[0]?._id}`)
      : ``,
  );

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
      dispatch(setMessages(messagesHistory?.messages));
      setAllMessages(messagesHistory?.messages);
    } catch (error) {}
  };

  const fetchAllConversation = () => {
    for (
      let i = 0;
      i < Math.min(conversations.length, activeConversation.length);
      i++
    ) {
      const conversation = conversations[i];
      const user = activeConversation[i];

      return { conversation, user };
    }
  };

  const { conversation, user } = fetchAllConversation() as any;

  function truncateWords(sentence: any, limit = 5) {
    const words = sentence.split(` `);
    if (words.length > limit) {
      return words.slice(0, limit).join(` `) + `...`;
    }
    return sentence;
  }

  return (
    <>
      <Box
        onClick={handleSelectChat}
        sx={{
          display: `flex`,
          justifyContent: `space-between`,
          cursor: `pointer`,
          transition: `all 0.5s ease`,
          // borderBottom: `solid 1px #ccc`,
          boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
          mt: 4,
          borderRadius: `8px`,
          '&:hover': {
            background: theme.palette.secondary.light,
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
            backgroundColor: `primary.main`,
            marginRight: `0.8rem`,
          }}
        >
          <Image
            src={user?.profile?.picture || cahtImg}
            alt="profileImg"
            fill
            style={{
              borderRadius: `50%`,
            }}
          />
        </Box>
        <Box sx={{ width: `82%` }}>
          <Typography fontWeight="bold" fontSize="0.8rem" color="primary.main">
            {user?.profile?.firstName} {user?.profile?.lastName}
          </Typography>
          <Typography fontSize="0.8rem">
            {truncateWords(conversation?.lastMessage?.message)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default UsersCard;
