import DashboardLayout from '@/components/DashboardLayout';
import FeedbackForm from '@/components/FeedbackForm';
import { Box } from '@mui/material';
import React from 'react';
// export { getServerSideProps } from '@/hooks/getServerSideProps';

interface PropsTypes {
  token: string;
}

const SupportPage = ({ token }: PropsTypes) => {
  return (
    <DashboardLayout token={token}>
      <Box>
        <FeedbackForm token={token} />
      </Box>
    </DashboardLayout>
  );
};

export default SupportPage;
