import DashboardLayout from '@/components/DashboardLayout';
import React from 'react';

const HistoryPage = ({ token }: any) => {
  return (
    <DashboardLayout token={token}>
      <h1>History Page</h1>
    </DashboardLayout>
  );
};

export default HistoryPage;
