import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import cahtImg from '@/public/avatar.png';
import theme from '@/styles/theme';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessages,
  setActiveUserData,
  setMobileChatModal,
  setAllUnreadConversationMessagesCount,
} from '@/features/chatsSlice';
import io from 'socket.io-client';

const UsersCard = ({ data, conversations, setAllMessages, token }: any) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const { messages } = useSelector((state: RootState) => state.chatsData);
  const [localConversation, setLocalConversation] = useState<any>(null);
  const [localUser, setLocalUser] = useState<any>(null);
  const [unreadConversationMessagesCount, setUnreadConversationMessagesCount] =
    useState();

  console.log(unreadConversationMessagesCount);

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

  const handleSelectChat = async () => {
    dispatch(setMobileChatModal(true));
    const conversationID = data?._id;
    dispatch(setActiveUserData(data));

    const socket = io(`https://apiv3.easeplan.io`, {
      auth: {
        userId: `${userInfo?._id}`,
      },
    });

    socket.on(`unreadConversationMessagesCount`, (count) =>
      setUnreadConversationMessagesCount(count),
    );
    socket.on(`allUnreadConversationMessagesCount`, (count) =>
      dispatch(setAllUnreadConversationMessagesCount(count)),
    );

    socket.emit(`markAsRead`, {
      conversationId: conversationID,
    });
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

      setLocalConversation(conversation);
      setLocalUser(user);
      break; // exit loop after setting state
    }
  };

  console.log(activeConversation);

  useEffect(() => {
    fetchAllConversation();
  }, [messages]);

  function truncateWords(sentence: any, limit = 5) {
    const words = sentence?.split(` `);
    if (words?.length > limit) {
      return words?.slice(0, limit)?.join(` `) + `...`;
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
          mt: {
            xs: 0,
            md: 2,
            lg: 4,
          },
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
            src={localUser?.profile?.picture || cahtImg}
            alt="profileImg"
            fill
            style={{
              borderRadius: `50%`,
            }}
          />
        </Box>
        <Box sx={{ width: `82%`, position: `relative` }}>
          <Box
            sx={{
              width: `15px`,
              height: `15px`,
              border: `solid 2px #fff`,
              borderRadius: `16px`,
              position: `absolute`,
              top: `-0.5rem`,
              left: `-3rem`,
              background: theme.palette.info.main,

              '@media (max-width: 900px)': {
                width: `9px`,
                height: `9px`,
                border: `solid 1.5px #fff`,
                position: `absolute`,
                top: `0.6rem`,
                right: `0.5rem`,
              },
            }}
          ></Box>
          <Typography fontWeight="bold" fontSize="0.8rem" color="primary.main">
            {localUser?.profile?.firstName} {localUser?.profile?.lastName}
          </Typography>
          <Typography fontSize="0.8rem">
            {truncateWords(localConversation?.lastMessage?.message)}
          </Typography>
          <Typography>{unreadConversationMessagesCount}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default UsersCard;
