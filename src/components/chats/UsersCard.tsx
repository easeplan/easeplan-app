import { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import Image from 'next/image';
import cahtImg from '@/public/avatar.png';
import theme from '@/styles/theme';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessages,
  setActiveUserData,
  setMobileChatModal,
} from '@/features/chatsSlice';
import io from 'socket.io-client';

const StyledBadge = styled(Badge)(({ theme }: any) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const UsersCard = ({
  data,
  conversations,
  setAllMessages,
  token,
  index,
  conversation,
  otherParticipant,
  setOpenChat,
  setInchat,
}: any) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { messages } = useSelector((state: RootState) => state.chatsData);
  const [localConversation, setLocalConversation] = useState<any>(null);
  const [localUser, setLocalUser] = useState<any>(null);

  const activeUser = (arr: any) => {
    const activeUsers: any = [];
    arr
      .filter((user: any) => user._id != userInfo?._id)
      .map((user: any) => activeUsers.push(user));

    return activeUsers;
  };

  const activeConversation = activeUser(data?.participants);

  const handleSelectChat = async () => {
    setInchat(true);
    setOpenChat(true);
    dispatch(setMobileChatModal(true));
    const conversationID = data?._id;
    dispatch(setActiveUserData(data));

    const socket = io('https://easeplan.azurewebsites.net', {
      auth: {
        userId: `${userInfo?._id}`,
      },
    });

    // socket.on(`unreadConversationMessagesCount`, (count) =>
    //   dispatch(setUnreadConversationMessagesCount(count)),
    // );

    // socket.on(`allUnreadConversationMessagesCount`, (count) =>
    //   dispatch(setAllUnreadConversationMessagesCount(count)),
    // );

    socket.emit('markAsRead', {
      conversationId: conversationID,
    });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversationID}/messages`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const messagesHistory = await res.json();
      dispatch(setMessages(messagesHistory?.messages));
      setAllMessages(messagesHistory?.messages);
    } catch (error) {}
  };

  // const fetchAllConversation = () => {
  //   for (
  //     let i = 0;
  //     i < Math.min(conversations.length, activeConversation.length);
  //     i++
  //   ) {
  //     const conversation = conversations[i];
  //     const user = activeConversation[i];

  //     setLocalConversation(conversation);
  //     setLocalUser(user);
  //     break; // exit loop after setting state
  //   }
  // };

  // useEffect(() => {
  //   fetchAllConversation();
  // }, [messages]);

  // console.log(conversations);

  function truncateWords(sentence: any, limit = 5) {
    const words = sentence?.split(' ');
    if (words?.length > limit) {
      return words?.slice(0, limit)?.join(' ') + '...';
    }
    return sentence;
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();

    // You might want to add more complex logic here to handle different date formats
    // This is a simple example where if the message was sent today, it will only show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleDateString();
    }
  }

  return (
    <>
      <ListItem
        button
        key={conversation?._id}
        onClick={handleSelectChat}
        sx={{ cursor: 'pointer', pd: 0, m: 0 }}
      >
        <ListItemAvatar>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar
              alt={`${otherParticipant?.profile?.firstName} ${otherParticipant?.profile?.lastName}`}
              src={otherParticipant?.profile?.picture}
            />
          </StyledBadge>
        </ListItemAvatar>
        <ListItemText
          sx={{
            p: 1,
          }}
          primary={`${otherParticipant?.profile?.firstName} ${otherParticipant?.profile?.lastName}`}
          secondary={
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box component="span" sx={{ mb: 0.5 }}>
                {truncateWords(conversation?.lastMessage?.message)}
              </Box>
              <Box
                component="span"
                sx={{ fontSize: '0.75rem', color: 'text.secondary' }}
              >
                {formatDate(conversation?.lastMessage?.createdAt)}
              </Box>
            </Box>
          }
        />
      </ListItem>
    </>
  );
};

export default UsersCard;
