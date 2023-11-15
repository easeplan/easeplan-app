import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatLayout from '@/components/chats/ChatLayout';
import RecentChats from '@/components/chats/RecentChats';
import ChatComponent from '@/components/chats/ChatComponent';
import { Box, Typography, Button, useTheme } from '@mui/material';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorPage from '@/components/ErrorPage';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {
  setCurrentMessage,
  setMessages,
  setMobileChatModal,
  setAllUnreadConversationMessagesCount,
  setUnreadConversationMessagesCount,
} from '@/features/chatsSlice';
import useFetchMessages from '@/hooks/useFetchMessages';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import cahtImg from '@/public/avatar.png';
import chatPreviewImg from '@/public/chatImg.png';
import Image from 'next/image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import theme from '@/styles/theme';
import user from '@/pages/api/user';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  InputBase,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const StyledBadge = styled(Badge)(({ theme }) => ({
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
// import './style.module.css'

const InboxPage = ({ token }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const { messages, activeUserData, mobileChatModal } = useSelector(
    (state: RootState) => state.chatsData,
  );
  const [conversationList, setConversationList] = useState<any>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [chatMessage, setChatMessage] = useState<any>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    const socket = io('https://easeplan.azurewebsites.net', {
      auth: {
        userId: `${userInfo}`,
      },
    });

    socket.on('unreadConversationMessagesCount', (count) =>
      dispatch(setUnreadConversationMessagesCount(count)),
    );

    socket.on('allUnreadConversationMessagesCount', (count) =>
      dispatch(setAllUnreadConversationMessagesCount(count)),
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const conversationData = await res.json();
      setConversationList(conversationData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Image Select Function
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      setSelectedImage(file); // Store the selected file in state
      setPreviewOpen(true); // Open the preview modal
    }
  };

  // Trigger the file selection dialog function
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false); // Close the preview modal
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return;

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('conversationId', activeUserData?._id);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations/image`,
        {
          image: selectedImage || '',
          conversationId: activeUserData?._id || '',
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Update the Redux state with the new message
      dispatch(setMessages([...messages, data?.message]));
      setPreviewOpen(false);
    } catch (error) {
      console.error('Error occurred during image upload:', error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const socket = io('https://easeplan.azurewebsites.net', {
      auth: {
        userId: `${userInfo}`,
      },
    });

    socket.emit('message', {
      sender: userInfo?._id,
      conversationId: activeUserData?._id,
      message: chatMessage,
    });

    setChatMessage('');
  };

  useEffect(() => {
    const socket = io('https://easeplan.azurewebsites.net', {
      auth: {
        userId: `${userInfo}`,
      },
    });

    socket.on(`conversation-${activeUserData?._id}`, (data: any) => {
      // Update the Redux state with the new message
      dispatch(setMessages([...messages, data]));
      dispatch(setCurrentMessage(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, messages, userInfo, activeUserData?._id]);

  const activeUser = (arr: any) => {
    const activeUsers: any = [];
    arr
      ?.filter((user: any) => user?._id != userInfo)
      ?.map((user: any) => activeUsers.push(user));

    return activeUsers;
  };
  console.log(activeUserData);

  const activeConversation = activeUser(activeUserData?.participants);
  {
    /* Smooth Scroll to the last Message */
  }
  useEffect(() => {
    if (divRef.current) {
      divRef.current!.scrollTop = divRef.current!.scrollHeight;
    }
  }, [messages]);

  const { queryData, error, isLoading } = useFetch(
    `/profiles/${userInfo}`,
    token,
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }
  const messages1 = [
    {
      id: 1,
      text: 'Hi, how are you samim?',
      timestamp: '8:40 AM, Today',
      avatar: '/path/to/avatar1.jpg',
      sender: 'other',
    },
    {
      id: 2,
      text: 'Hi Khalid I am good tnx how about you?',
      timestamp: '8:55 AM, Today',
      avatar: '/path/to/avatar2.jpg',
      sender: 'you',
    },
    // ... more messages
  ];
  const headerHeight = '64px'; // Adjust as needed
  const footerHeight = '64px'; // Adjust as needed
  const messagesHeight = `calc(100% - ${headerHeight} - ${footerHeight})`;
  return (
    <DashboardLayout token={token} sx={{ height: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          flexGrow: 1,
          position: {
            xs: 'fixed',
            sm: 'fixed',
            md: 'relative',
            lg: 'relative',
            xl: 'relative',
          },
          left: { xs: 0, sm: 0, md: 0 },
          border: {
            xl: '0.1px solid #71F79F',
            lg: '0.1px solid #71F79F',
            md: '0.1px solid #71F79F',
            xs: 'none',
          },
          mt: { xs: 0, sm: 0, md: 2, lg: 2, xl: 2 },
          height: {
            xl: '90%',
            lg: '90%',
            md: '97%',
            sm: '88%',
            xs: '80%',
          },
          [theme.breakpoints.down(375)]: { height: '82%' },
          width: '100%',
        }}
        className="container-fluid h-100"
      >
        <Grid
          container
          className="justify-content-center"
          sx={{ height: '100%' }}
        >
          <Grid
            item
            xs={12}
            md={4}
            xl={3}
            sx={{
              borderRight: '0.1px solid #71F79F',
              display: {
                xs: `${openChat ? 'none' : 'flex'}`,
                sm: `${openChat ? 'none' : 'flex'}`,
                md: 'block',
                lg: 'block',
                xl: 'block',
              },
              flexDirection: 'column',
              height: {
                xl: '100%',
                lg: '100%',
                md: '97%',
                sm: '88%',
                xs: '80%',
              },
              overflowY: 'auto',
            }}
          >
            <Paper
              elevation={3}
              className="contacts_card"
              sx={{
                borderRight: '0.1px solid #71F79F',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box p={2} className="search-box">
                <InputBase
                  fullWidth
                  placeholder="Search..."
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon fontSize="small" sx={{ m: 2 }} />
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: '15px',
                    background: theme.palette.secondary.light,
                    border: '0 !important',
                    p: 0.7,
                    pl: 2,
                  }}
                />
              </Box>
              <List
                className="contacts"
                sx={{
                  overflowY: { sm: 'auto', xs: 'auto' },
                  maxHeight: {
                    sm: 'calc(100% - 48px)',
                    xs: 'calc(100% - 48px)',
                  },
                }}
              >
                {conversationList?.conversations?.length > 0 ? (
                  conversationList.conversations.map((conversation: any) => {
                    const otherParticipant = conversation.participants.find(
                      (participant: any) => participant._id !== userInfo,
                    );

                    if (!otherParticipant || !otherParticipant.profile) {
                      return null; // or some fallback UI
                    }

                    return (
                      <ListItem
                        button
                        key={conversation?._id}
                        onClick={() => setOpenChat(true)}
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
                          sx={{ borderBottom: '0.1px solid #71F79F', p: 1 }}
                          primary={`${otherParticipant?.profile?.firstName} ${otherParticipant?.profile?.lastName}`}
                          secondary={conversation?.lastMessage?.message}
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <p>No conversations to display.</p>
                )}

                {/* Repeat for other contacts */}
              </List>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            xl={6}
            sx={{
              display: {
                xs: `${!openChat ? 'none' : 'block'}`,
                sm: `${!openChat ? 'none' : 'block'}`,
                md: 'block',
                lg: 'block',
                xl: 'block',
              },
            }}
          >
            <Paper
              elevation={3}
              className="chat_card"
              sx={{ position: 'relative', height: '100%' }}
            >
              {!activeUserData ? (
                <>
                  <Dialog open={isPreviewOpen} onClose={handleClosePreview}>
                    <DialogContent>
                      {selectedImage && (
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected Preview"
                          style={{ width: '100%' }}
                        />
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Box
                        sx={{
                          display: 'flex',
                          // alignItems: `center`,
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <Button onClick={handleClosePreview} color="primary">
                          Close
                        </Button>
                        <Button onClick={handleUploadImage} variant="contained">
                          Upload
                        </Button>
                      </Box>
                    </DialogActions>
                  </Dialog>
                  <Box
                    p={1}
                    className="msg_head"
                    sx={{ background: theme.palette.secondary.light, m: 0 }}
                  >
                    {/* Chat header */}
                    <Grid container alignItems="center">
                      <IconButton onClick={() => setOpenChat(false)}>
                        <ArrowBackIosIcon />
                      </IconButton>
                      <Grid item sx={{ mr: 1 }}>
                        <Avatar
                          alt="Contact Name"
                          src="contact_image_url.jpg"
                        />
                      </Grid>
                      <Grid item xs sx={{ mr: '3' }}>
                        <Typography variant="h6">Contact Name</Typography>
                        <Typography variant="caption">
                          Last seen recently
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ height: messagesHeight, overflowY: 'scroll' }}>
                    <List className="msg_card_body">
                      <ChatComponent
                        userInfoId={queryData}
                        messages={messages}
                      />
                      {/* {messages1.map((message) => (
                        <ListItem
                          key={message.id}
                          alignItems="flex-start"
                          style={{
                            justifyContent:
                              message.sender === 'you'
                                ? 'flex-end'
                                : 'flex-start',
                          }}
                        >
                          <ListItemAvatar
                            style={{
                              display:
                                message.sender === 'you'
                                  ? 'none'
                                  : 'inline-flex',
                            }}
                          >
                            <Avatar alt="Remy Sharp" src={message.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box
                                sx={{
                                  display: 'inline-block',
                                  borderRadius: '20px',
                                  bgcolor:
                                    message.sender === 'you'
                                      ? '#78e08f'
                                      : '#82ccdd',
                                  p: 1,
                                  maxWidth: '75%',
                                  textAlign: 'left',
                                }}
                              >
                                {message.text}
                              </Box>
                            }
                            secondary={
                              <Typography
                                component="span"
                                variant="body2"
                                style={{
                                  display: 'block',
                                  textAlign:
                                    message.sender === 'you' ? 'right' : 'left',
                                  color: 'gray',
                                }}
                              >
                                {message.timestamp}
                              </Typography>
                            }
                            style={{
                              textAlign:
                                message.sender === 'you' ? 'right' : 'left',
                            }}
                          />
                        </ListItem>
                      ))} */}
                    </List>
                  </Box>
                  <Box
                    p={2}
                    className="card-footer"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: theme.palette.secondary.light,
                      borderTop: 'solid 1px #ccc',
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <IconButton
                            aria-label="upload-image"
                            size="medium"
                            onClick={handleUploadButtonClick}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              ref={fileInputRef}
                              onChange={handleFileInputChange}
                            />
                            <AttachFileIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs>
                          <InputBase
                            fullWidth
                            placeholder="Type your message..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                          />
                        </Grid>
                        <Grid item>
                          <IconButton color="primary" type="submit">
                            <SendIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'secondary.light',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Image
                      src={chatPreviewImg}
                      alt="previewChatScreen"
                      width={300}
                      height={300}
                    />
                    <Typography fontSize="1.2rem" color="primary.main">
                      Start Chatting
                    </Typography>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default InboxPage;
