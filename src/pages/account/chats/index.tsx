import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatBoard from '@/components/chats/ChatBoard';
import ChatLayout from '@/components/chats/ChatLayout';
import RecentChats from '@/components/chats/RecentChats';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorPage from '@/components/ErrorPage';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setCurrentMessage, setMessages } from '@/features/chatsSlice';

type Message = {
  message: string;
};

const InboxPage = ({ token }: any) => {
  const dispatch = useDispatch();
  const { messages, activeUserData, currentMessage } = useSelector(
    (state: RootState) => state.chatsData,
  );
  const [conversationList, setConversationList] = useState<any>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [chatMessage, setChatMessage] = useState(``);
  // const [currentMessage, setCurrentMessage] = useState<any>(``);

  // console.log(currentMessage);

  useEffect(() => {
    const socket = io(`https://apiv3.easeplan.io`, {
      auth: {
        userId: `${userInfo?._id}`,
      },
    });

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
  }, [currentMessage]);

  // Send Message
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // try {
    //   console.log(activeUserData?._id);
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/conversations/${activeUserData?._id}/messages`,
    //     {
    //       headers: {
    //         'Content-Type': `application/json`,
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   const messagesHistory = await res.json();
    //   dispatch(setMessages(messagesHistory));
    //   console.log(messagesHistory);
    // } catch (error) {}

    const socket = io(`https://apiv3.easeplan.io`, {
      auth: {
        userId: `${userInfo?._id}`,
      },
    });
    socket.emit(`message`, {
      sender: userInfo?._id,
      conversationId: activeUserData?._id,
      message: chatMessage,
    });

    setChatMessage(` `);

    socket.on(`conversation-${activeUserData?._id}`, (data: any) =>
      console.log(data?.message),
    );
  };

  const { queryData, error, isLoading } = useFetch(
    `/${
      userInfo?.role === `provider`
        ? `provider-profiles`
        : userInfo?.role === `planner`
        ? `planner-profiles`
        : userInfo?.role === `user`
        ? `user-profiles`
        : `user-profiles`
    }/${userInfo?._id}`,
    token,
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <DashboardLayout token={token}>
      <ChatLayout>
        <RecentChats token={token} conversationList={conversationList} />
        <ChatBoard
          setChatMessage={setChatMessage}
          messages={messages}
          chatMessage={chatMessage}
          sendMessage={handleSubmit}
        />
      </ChatLayout>
    </DashboardLayout>
  );
};

export default InboxPage;
