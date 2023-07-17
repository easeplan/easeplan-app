import React from 'react';
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

const InboxPage = ({ token }: any) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
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
        <RecentChats />
        <ChatBoard />
      </ChatLayout>
    </DashboardLayout>
  );
};

export default InboxPage;
