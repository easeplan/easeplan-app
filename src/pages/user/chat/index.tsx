import { useEffect, useState, useRef } from 'react';
import ChatLayout from '@/components/chats/ChatLayout';
import RecentChats from '@/components/chats/RecentChats';
import ChatComponent from '@/components/chats/ChatComponent';
import { Box, Typography, Button, Container } from '@mui/material';
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
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import cahtImg from '@/public/avatar.png';
import chatPreviewImg from '@/public/chatImg.png';
import Image from 'next/image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import theme from '@/styles/theme';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Layout from '@/components/vendors/Layout';

const InboxPage = ({ token }: any) => {
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const { messages, activeUserData, mobileChatModal } = useSelector(
    (state: RootState) => state.chatsData,
  );
  const [conversationList, setConversationList] = useState<any>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [chatMessage, setChatMessage] = useState<any>(``);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  // console.log(userInfo);

  useEffect(() => {
    const socket = io(`https://apiv3.easeplan.io`, {
      auth: {
        userId: `${userInfo}`,
      },
    });

    socket.on(`unreadConversationMessagesCount`, (count) =>
      dispatch(setUnreadConversationMessagesCount(count)),
    );

    socket.on(`allUnreadConversationMessagesCount`, (count) =>
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
            'Content-Type': `application/json`,
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
      formData.append(`image`, selectedImage);
      formData.append(`conversationId`, activeUserData?._id);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations/image`,
        {
          image: selectedImage || ``,
          conversationId: activeUserData?._id || ``,
        },
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Update the Redux state with the new message
      dispatch(setMessages([...messages, data?.message]));
      setPreviewOpen(false);
    } catch (error) {
      console.error(`Error occurred during image upload:`, error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const socket = io(`https://apiv3.easeplan.io`, {
      auth: {
        userId: `${userInfo}`,
      },
    });

    socket.emit(`message`, {
      sender: userInfo,
      conversationId: activeUserData?._id,
      message: chatMessage,
    });

    setChatMessage(``);
  };

  useEffect(() => {
    const socket = io(`https://apiv3.easeplan.io`, {
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

  const activeConversation = activeUser(activeUserData?.participants);

  console.log(conversationList);

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

  return (
    <Layout data={queryData?.provider}>
      <Container
        sx={{
          // background: `red`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `end`,
        }}
        maxWidth="lg"
      >
        <ChatLayout>
          <RecentChats token={token} conversationList={conversationList} />
          {activeUserData ? (
            <Box
              className={`${
                mobileChatModal ? `mobileOpenSlider` : `mobileCloseSlider`
              }`}
            >
              {/* The Image Preview Modal */}
              <Dialog open={isPreviewOpen} onClose={handleClosePreview}>
                <DialogContent>
                  {selectedImage && (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Preview"
                      style={{ width: `100%` }}
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  <Box
                    sx={{
                      display: `flex`,
                      // alignItems: `center`,
                      justifyContent: `space-between`,
                      width: `100%`,
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
              <Box sx={{ background: `#fff` }}>
                {/* Active User at Header */}
                {activeConversation?.map((user: any) => (
                  <Box
                    key={user?._id}
                    sx={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                      pt: 6,
                      pb: 2,
                      px: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        cursor: `pointer`,
                      }}
                    >
                      <Box
                        sx={{
                          position: `relative`,
                          width: `30px`,
                          height: `30px`,
                          borderRadius: `50%`,
                          background: theme.palette.primary.main,
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
                      <Box>
                        <Typography
                          fontWeight="bold"
                          fontSize="0.8rem"
                          color="primary.main"
                          sx={{ marginLeft: `1rem` }}
                        >
                          {user?.profile?.firstName} {user?.profile?.lastName}
                        </Typography>
                      </Box>
                    </Box>
                    <ArrowForwardIosIcon
                      onClick={() => dispatch(setMobileChatModal(false))}
                      className="mobileCloseIcon"
                    />
                  </Box>
                ))}
              </Box>
              {/*  Chats */}
              <Box
                ref={divRef}
                sx={{
                  overflowY: `auto`,
                  height: `100%`,
                  scrollBehavior: `smooth`,
                }}
              >
                <Box
                  sx={{
                    px: `1rem`,
                    pt: `2rem`,
                    pb: {
                      xs: `13rem`,
                      sm: `13rem`,
                      md: `13rem`,
                      lg: `13rem`,
                      xl: `13rem`,
                    },
                  }}
                >
                  <ChatComponent userInfoId={queryData} messages={messages} />
                </Box>
              </Box>
              {/* Form for sending message */}
              <Box
                sx={{
                  position: `absolute`,
                  bottom: `0`,
                  width: `100%`,
                  p: `1rem`,
                  background: theme.palette.secondary.light,
                  borderTop: `solid 1px #ccc`,
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <IconButton
                      aria-label="upload-image"
                      size="medium"
                      onClick={handleUploadButtonClick}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: `none` }}
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                      />
                      <AttachFileIcon />
                    </IconButton>
                    <textarea
                      id="txtid"
                      name="txtname"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      rows={1}
                      cols={50}
                      required
                      placeholder="Type here"
                      style={{
                        width: `100%`,
                        padding: `1rem`,
                        overflowY: `scroll`,
                        resize: `none`,
                        border: `none`,
                        outline: `none`,
                      }}
                    />
                    <IconButton
                      type="submit"
                      sx={{
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        width: `40px`,
                        height: `40px`,
                        borderRadius: `50%`,
                        backgroundColor: `primary.main`,
                        ml: 2,
                      }}
                    >
                      <SendIcon sx={{ mx: 1, color: `secondary.main` }} />
                    </IconButton>
                  </Box>
                </form>
              </Box>
            </Box>
          ) : (
            <Box
              className={`${
                mobileChatModal ? `mobileOpenSlider` : `mobileCloseSlider`
              }`}
              sx={{
                position: `relative`,
                width: `100%`,
                height: `100%`,
                backgroundColor: `secondary.light`,
                borderRadius: `8px`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
              }}
            >
              <Box sx={{ textAlign: `center` }}>
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
        </ChatLayout>
      </Container>
    </Layout>
  );
};

export default InboxPage;
