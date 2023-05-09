import React from 'react';
import { Box, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const ManagePayment = () => {
  return (
    <Box>
      <Typography my={1} variant="h5" fontWeight="bold" color="primary.main">
        Manage Payment
      </Typography>
      <Box sx={{ border: `solid 1px #ccc`, p: 3 }}>
        <Box
          onClick={() => console.log(`Clicked`)}
          sx={{
            py: 6,
            textAlign: `center`,
            backgroundColor: `primary.main`,
            transition: `all 0.5s ease-in`,
            cursor: `pointer`,
            '&:hover': {
              backgroundColor: `primary.light`,
            },
          }}
        >
          <Typography my={1} variant="h6" color="common.white">
            Add primary card
          </Typography>
        </Box>
        <Box
          sx={{
            border: `solid 1px #ccc`,
            p: 3,
            mt: 4,
            textAlign: `center`,
            cursor: `pointer`,
          }}
        >
          <CreditCardIcon />
          <Typography my={1} color="common.black">
            Make payment with a new <br /> Debit/Credit
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ManagePayment;
