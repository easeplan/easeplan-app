import CardList from '@/components/vendors/CardList';
import Layout from '@/components/vendors/Layout';
import { Box } from '@mui/material';
import React from 'react';

const VendorPage = () => {
  return (
    <Layout>
      <Box sx={{ mt: 4 }}>
        <CardList />
      </Box>
    </Layout>
  );
};

export default VendorPage;
