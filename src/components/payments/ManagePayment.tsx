/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import CustomButton from '../common/CustomButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import Label from '../common/Label';

const PaymentSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
});

const ManagePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [isSuccessMessage, setIsSuccessMessage] = useState<any>();
  const [isError, setIsError] = useState<boolean>();
  const [isErrorMessage, setIsErrorMessage] = useState<any>();

  const submitCredentials = async (credentials: any) => {
    // try {
    //   const budgetStructure = {
    //     budget: {
    //       maximum: credentials.maximum,
    //       minimum: credentials.minimum,
    //     },
    //   };
    //   setIsLoading(true);
    //   const { data } = await axios.put(
    //     `${process.env.NEXT_PUBLIC_API_URL}/providers/verification/add-budget`,
    //     budgetStructure,
    //     {
    //       headers: {
    //         'Content-Type': `application/json`,
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   if (data.status === `success`) {
    //     setIsLoading(false);
    //     setIsSuccess(true);
    //   }
    //   setIsSuccessMessage(data.message);
    // } catch (error: any) {
    //   setIsLoading(false);
    //   setIsErrorMessage(error.message);
    //   setIsSuccess(false);
    // }
  };

  return (
    <Box>
      <Box sx={{ border: 'solid 1px #ccc', p: 2 }}>
        <Typography my={2} variant="h6" fontWeight="bold" color="primary.main">
          Pending Contract Payments
        </Typography>
        {/* Balance card */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: 'solid 1px #ccc',
            px: 4,
            mb: 2,
          }}
        >
          <Typography
            my={1}
            fontWeight="bold"
            color="primary.main"
            textAlign="center"
          >
            ₦0.00
          </Typography>
          <Typography my={1} color="info.main" textAlign="center">
            Pending
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: 'solid 1px #ccc',
            px: 4,
            mb: 2,
          }}
        >
          <Typography
            my={1}
            fontWeight="bold"
            color="primary.main"
            textAlign="center"
          >
            ₦0.00
          </Typography>
          <Typography my={1} color="info.main" textAlign="center">
            Pending
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ManagePayment;
