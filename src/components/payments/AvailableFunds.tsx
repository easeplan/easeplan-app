/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import CustomButton from '../common/CustomButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import Label from '../common/Label';
import PaymentModal from './PaymentModal';

const PaymentSchema = Yup.object().shape({
  amount: Yup.string().required(`Amount is required`),
});

const AvailableFunds = ({ token }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [paymentModal, setPaymentModal] = useState<any>();
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
      <PaymentModal
        isOpen={paymentModal}
        isClose={() => setPaymentModal(false)}
      />
      <Box sx={{ border: `solid 1px #ccc`, p: 4 }}>
        <Typography my={2} variant="h6" fontWeight="bold" color="primary.main">
          Available Balance
        </Typography>
        {/* Balance card */}
        <Box sx={{ border: `solid 1px #ccc`, p: 4 }}>
          <Typography
            my={1}
            fontWeight="bold"
            color="primary.main"
            textAlign="center"
            variant="h4"
          >
            ₦0.00
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography my={3}>Withdraw funds to bank or card added</Typography>
          <CustomButton onClick={() => setPaymentModal(true)} bgPrimary>
            Withdraw Funds
          </CustomButton>
        </Box>
        <Typography
          mb={2}
          mt={4}
          variant="h6"
          fontWeight="bold"
          color="primary.main"
        >
          Add Bank Details
        </Typography>
        <Box sx={{ border: `solid 1px #ccc`, p: 4 }}>
          <Typography mb={3}>Add bank details to recieve payment</Typography>
          <Box>
            <Formik
              initialValues={{
                amount: ``,
              }}
              onSubmit={(values) => submitCredentials(values)}
              validationSchema={PaymentSchema}
            >
              {() => (
                <Form>
                  <Box sx={{ mb: 2 }}>
                    <Label text="Account Holder Name" />
                    <FormInput
                      ariaLabel="accountName"
                      name="accountName"
                      type="text"
                      placeholder="Full Name"
                    />
                  </Box>
                  <Box>
                    <Label text="Select Bank" />
                    <FormInput
                      ariaLabel="accountName"
                      name="accountName"
                      type="text"
                      isSelect
                      placeholder="e.g ₦1000.00"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Label text="Account Number" />
                    <FormInput
                      ariaLabel="accountNumber"
                      name="accountNumber"
                      type="text"
                      placeholder="1748-9938-948"
                    />
                  </Box>
                  <CustomButton
                    bgPrimary
                    loading={isLoading}
                    loadingText="Processing..."
                    type="submit"
                  >
                    {isSuccess ? `Paid` : `Make payment`}
                  </CustomButton>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AvailableFunds;
