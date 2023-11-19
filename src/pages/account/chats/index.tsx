import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatLayout from '@/components/chats/ChatLayout';
import RecentChats from '@/components/chats/RecentChats';
import ChatComponent from '@/components/chats/ChatComponent';
import { Box, Typography, Button, useTheme, Theme } from '@mui/material';
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
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { stringMap } from 'aws-sdk/clients/backup';
import { useSocket } from '@/hooks/useSocketContext';
import { useActivityTracker } from '@/utils/InteractionTracker';
import { uploadFileToS3 } from '@/utils/uploadFile';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from '@/hooks/authContext';

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
  const [inchat, setInchat] = useState(false);
  const socket = useSocket();
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  const matchesXS = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs'),
  );
  const matchesSM = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );
  const matchesMD = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  // useEffect(() => {
  //   if (matchesXS || matchesSM || matchesMD) {
  //     setInchat(true);
  //   } else {
  //     setInchat(false); // You might want to reset the state in other cases
  //   }
  // }, [matchesXS, matchesSM, matchesMD]);

  const handleInChat = () => {
    // Check if the screen is either xs or sm
    if (matchesXS || matchesSM || matchesMD) {
      setInchat(!inchat);
    }
  };

  // useActivityTracker(user?.provider._id as string);
  const getLastSeen = (lastActive: Date) => {
    const lastActiveDate = new Date(lastActive) as any;
    const now = new Date() as any;

    const diffInSeconds = Math.floor((now - lastActiveDate) / 1000);

    if (diffInSeconds < 60) {
      return 'Active now';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return lastActiveDate.toLocaleDateString();
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on('unreadConversationMessagesCount', (count) =>
        dispatch(setUnreadConversationMessagesCount(count)),
      );

      socket.on('allUnreadConversationMessagesCount', (count) =>
        dispatch(setAllUnreadConversationMessagesCount(count)),
      );

      socket.on(`conversation-${activeUserData?._id}`, (data) => {
        dispatch(setMessages([...messages, data]));
        dispatch(setCurrentMessage(data));
      });

      // socket.on('activeState', (data) => {
      //   setConversationList({ conversations: data });
      // });

      return () => {
        socket.off('unreadConversationMessagesCount');
        socket.off('allUnreadConversationMessagesCount');
        socket.off(`conversation-${activeUserData?._id}`);
      };
    }
  }, [socket, activeUserData?._id, dispatch, messages, user?.provider?._id]);

  const fetchConversations = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
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
    setIsUploading(true);
    try {
      const { Location } = await uploadFileToS3('chats', selectedImage);
      socket?.emit('image-message', {
        sender: user?.provider?._id,
        conversationId: activeUserData?._id,
        image: Location,
      });

      setIsUploading(false);
      setPreviewOpen(false);
    } catch (error) {
      console.error('Error occurred during image upload:', error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    socket?.emit('message', {
      sender: user?.provider?._id,
      conversationId: activeUserData?._id,
      message: chatMessage,
    });

    setChatMessage('');
  };

  const activeUser = (arr: any) => {
    const activeUsers: any = [];
    arr
      ?.filter((user: any) => user?._id != user?.provider?._id)
      ?.map((user: any) => activeUsers.push(user));

    return activeUsers[0];
  };

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
    `/profiles/${user?.provider._id}`,
    token,
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const headerHeight = '57px'; // Adjust as needed
  const footerHeight = '57px'; // Adjust as needed
  const messagesHeight = `calc(100% - ${headerHeight} - ${footerHeight})`;

  return (
    <DashboardLayout
      token={token}
      sx={{ height: '100%', overflow: 'hidden' }}
      inchat={inchat}
    >
      <Box
        sx={{
          overflow: 'hidden',
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
            md: '98%',
            sm: inchat ? '100%' : '88',
            xs: inchat ? '100%' : '88%',
          },
          [theme.breakpoints.down(375)]: { height: '82%' },
          width: '100%',
        }}
        className="container-fluid h-100"
      >
        <Grid
          container
          className="justify-content-center"
          sx={{
            height: {
              md: '81.5%',
              xl: '81.5%',
              lg: '81.5%',
              xs: '100%',
              sm: '100%',
            },
            width: { md: '79%', lg: '79%', xl: '79%', xs: '100%', sm: '100%' },
            position: { md: 'fixed', lg: 'fixed', xl: 'fixed' },
          }}
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
              height: '100%',
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
              <Box
                p={2}
                className="search-box"
                sx={{
                  m: 0,
                  p: 0.5,
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  sx={{ borderBottom: 'solid 1px #cccc', m: 0, mt: 1, pb: 1 }}
                >
                  <Grid item>
                    <Box sx={{ p: '0.2rem' }}>
                      <Typography
                        fontWeight="bold"
                        fontSize="1rem"
                        color="primary.main"
                        position="sticky"
                      >
                        Recent Messages
                      </Typography>
                    </Box>
                  </Grid>
                  {/* <Grid item xs>
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
                        p: 0.2,
                        pl: 2,
                        fontSize: '15px',
                        width: '100%',
                      }}
                    />
                  </Grid> */}
                </Grid>
              </Box>
              <List
                className="contacts"
                sx={{
                  overflowY: { sm: 'auto', xs: 'auto' },
                  height: '100%',
                  m: 0,
                  p: 0,
                }}
              >
                <RecentChats
                  token={token}
                  conversationList={conversationList}
                  userInfo={user?.provider._id}
                  setOpenChat={setOpenChat}
                  handleInChat={handleInChat}
                />
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
              width: '100%',
            }}
          >
            <Paper
              elevation={3}
              className="chat_card"
              sx={{
                position: 'absolute',
                height: '100%',
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: '66.8%',
                  lg: '66.8%',
                  xl: '66.8%',
                },
              }}
            >
              {activeUserData ? (
                <>
                  <Dialog open={isPreviewOpen} onClose={handleClosePreview}>
                    <DialogContent>
                      {selectedImage && (
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected Preview"
                          style={{ width: '100%' }}
                          width={300}
                          height={300}
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
                          {!isUploading ? 'Send' : 'Uploading...'}
                        </Button>
                      </Box>
                    </DialogActions>
                  </Dialog>
                  <Box
                    p={1}
                    className="msg_head"
                    sx={{
                      background: theme.palette.secondary.light,
                      m: 0,
                      width: '100%',
                    }}
                  >
                    {/* Chat header */}
                    <Grid container alignItems="center">
                      <IconButton
                        onClick={() => {
                          handleInChat();
                          setOpenChat(false);
                        }}
                        sx={{ display: { lg: 'none', xl: 'none', md: 'none' } }}
                      >
                        <ArrowBackIosIcon />
                      </IconButton>

                      <Grid item sx={{ mr: 1 }}>
                        <Avatar
                          sx={{ width: '40px', height: '40px' }}
                          alt="Contact Name"
                          src={activeConversation?.profile?.picture}
                        />
                      </Grid>
                      <Grid item xs sx={{ mr: '3' }}>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: '15px', m: 0 }}
                        >
                          {activeConversation?.profile?.firstName +
                            ' ' +
                            activeConversation?.profile?.lastName}
                        </Typography>
                        <Typography variant="caption" sx={{ m: 0, p: 0 }}>
                          {activeConversation?.lastActive
                            ? getLastSeen(activeConversation?.lastActive)
                            : 'Offline '}
                        </Typography>
                      </Grid>
                      {/* <Grid item>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </Grid> */}
                    </Grid>
                  </Box>
                  <Box sx={{ height: messagesHeight, overflowY: 'scroll' }}>
                    <List className="msg_card_body">
                      <ChatComponent
                        userInfoId={queryData}
                        messages={messages}
                        handleInChat={handleInChat}
                        inchat={inchat}
                      />
                    </List>
                  </Box>
                  <Box
                    className="card-footer"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      ml: 2,
                      mr: 2,
                      mb: 1,
                      right: 0,
                      //background: theme.palette.secondary.light,
                      border: 'solid 1px #ccc',
                      borderRadius: '50px',
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <IconButton
                            aria-label={!isUploading ? 'Send' : 'Uploading...'}
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
