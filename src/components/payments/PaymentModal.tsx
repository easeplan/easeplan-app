import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import CustomButton from '../common/CustomButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import Label from '../common/Label';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: `absolute` as const,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: {
    xs: `85%`,
    sm: `45%`,
    md: `40%`,
    lg: `30%`,
    xl: `30%`,
  },
  height: `auto`,
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  borderRadius: `1rem`,
};

const PaymentSchema = Yup.object().shape({
  amount: Yup.string().required(`Amount is required`),
});

const PaymentModal = ({
  isOpen,
  token,
  isClose,
  setIsPaymentOtp,
  setPaymentModal,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [isSuccessMessage, setIsSuccessMessage] = useState<any>();
  const [isError, setIsError] = useState<boolean>();
  const [isErrorMessage, setIsErrorMessage] = useState<any>();

  // console.log(isErrorMessage);

  const submitCredentials = async (credentials: any) => {
    // setIsPaymentOtp(true);
    // setPaymentModal(false);
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-payment-token`,
        credentials,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        setIsLoading(false);
        setIsSuccess(true);
        setIsPaymentOtp(true);
        setPaymentModal(false);
      }
      setIsSuccessMessage(data.message);
    } catch (error: any) {
      setIsLoading(false);
      setIsErrorMessage(error.message);
      setIsSuccess(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="sm">
        <Box sx={style}>
          <Box
            sx={{
              p: 2,
              backgroundColor: `primary.main`,
              borderTopRightRadius: `1rem`,
              borderTopLeftRadius: `1rem`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
            }}
          >
            <Typography color="secondary.main" fontWeight={600}>
              Payment
            </Typography>
            <Typography
              sx={{
                cursor: `pointer`,
                textAlign: `center`,
                color: `secondary.light`,
              }}
            >
              <CloseIcon onClick={isClose} />
            </Typography>
          </Box>
          <Box sx={{ border: `solid 1px #ccc`, p: 4 }}>
            <Typography>Withdraw to your bank</Typography>
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
                    <Box sx={{ mb: 5, pt: 2 }}>
                      <Label text="Amount" />
                      <FormInput
                        ariaLabel="amount"
                        name="amount"
                        type="text"
                        placeholder="₦1000.00"
                      />
                      <Typography sx={{ fontSize: `0.8rem` }}>
                        Note: Payment will sent to the account details provided
                      </Typography>
                    </Box>
                    <CustomButton
                      bgPrimary
                      loading={isLoading}
                      loadingText="Processing..."
                      type="submit"
                    >
                      PROCEED
                    </CustomButton>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default PaymentModal;
