import { Alert, Box, Typography } from '@mui/material';
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
import TaskAltIcon from '@mui/icons-material/TaskAlt';

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

const PaymentOptModal = ({ isOpen, token, isClose }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<any>();
  const [isError, setIsError] = useState<boolean>();
  const [isErrorMessage, setIsErrorMessage] = useState<any>();

  // console.log(isErrorMessage);

  const submitCredentials = async (credentials: any) => {
    // setIsSuccess(true);
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-payment-token`,
        credentials,
        {
          headers: {
            'Content-Type': `application/json`,
            // Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        setIsLoading(false);
        setIsSuccess(true);
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
          <>
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
                {isSuccess ? `Successfully` : `Enter Payment OTP`}
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
            {isSuccess ? (
              <Box sx={{ px: `1rem`, py: `3rem`, textAlign: `center` }}>
                <TaskAltIcon
                  sx={{ fontSize: `5rem`, color: `secondary.main` }}
                />
                <Typography
                  sx={{
                    cursor: `pointer`,
                    textAlign: `center`,
                    color: `primary.main`,
                  }}
                >
                  Payment Successful
                </Typography>
              </Box>
            ) : (
              <Box sx={{ border: `solid 1px #ccc`, p: 4 }}>
                {isErrorMessage && (
                  <Alert severity="error">{isErrorMessage}</Alert>
                )}
                <Box>
                  <Typography>An OTP has been send to your email</Typography>
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
                          <Label text="Enter OTP" />
                          <FormInput
                            ariaLabel="otp"
                            name="otp"
                            type="text"
                            placeholder="Enter OTP"
                          />
                        </Box>
                        <CustomButton
                          bgPrimary
                          loading={isLoading}
                          loadingText="Processing..."
                          type="submit"
                        >
                          COMPLETE PAYMENT
                        </CustomButton>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            )}
          </>
        </Box>
      </Container>
    </Modal>
  );
};

export default PaymentOptModal;
