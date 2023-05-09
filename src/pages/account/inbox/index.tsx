import DashboardLayout from '@/components/DashboardLayout';
import React from 'react';

const InboxPage = ({ token }: any) => {
  return (
    <DashboardLayout token={token}>
      <h1>Inbox Page</h1>
    </DashboardLayout>
  );
};

export default InboxPage;
