/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '@/components/common/Label';
import FormInput from '@/components/common/FormInput';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Alert, Typography, Button, Box } from '@mui/material';
import CustomButton from '../common/CustomButton';
import { useDispatch } from 'react-redux';
import { useVerifyTokenMutation } from '@/features/usersApiSlice';
import { setCredentials } from '@/features/authSlice';
import axios from 'axios';
import Link from 'next/link';

const OtpSchema = Yup.object().shape({
  resetToken: Yup.string().required('Token is required'),
});

const OtpForm = () => {
  const [verifyToken] = useVerifyTokenMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<any>();
  const [userEmail] = useState<any>(
    typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '',
  );

  const submitCredentials = async (credentials: any) => {
    try {
      setIsLoading(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-otp`,
        { email: userEmail, resetToken: credentials.resetToken },
      );
      router.push('/forgetpassword/reset');
    } catch (error: any) {
      setIsLoading(false);
      setErrorMsg(error.data.message);
    }
  };

  return (
    <>
      <FormWrapper>
        <FormBody>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '1.5rem',
              color: 'primary.main',
              marginBottom: '2rem',
              textTransform: 'capitalize',
            }}
          >
            Verify OTP
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              color: 'primary.main',
              marginBottom: '1rem',
            }}
          >
            A one time OTP is send to <strong>{userEmail}</strong>
          </Typography>
          <Formik
            initialValues={{
              resetToken: '',
            }}
            onSubmit={(values) => submitCredentials(values)}
            validationSchema={OtpSchema}
          >
            {() => (
              <Form>
                {errorMsg && (
                  <Alert sx={{ mb: 2 }} severity="error">
                    {errorMsg}
                  </Alert>
                )}
                <InputControl>
                  <div>
                    <div>
                      <Label text="Enter OTP" />
                    </div>
                    <FormInput
                      ariaLabel="resetToken"
                      name="resetToken"
                      type="text"
                      placeholder="OTP"
                    />
                  </div>
                </InputControl>
                <CustomButton
                  bgPrimary
                  lgWidth="100%"
                  mdWidth="100%"
                  loading={isLoading}
                  type="submit"
                >
                  Verify
                </CustomButton>
              </Form>
            )}
          </Formik>
          <Box sx={{ mt: 4 }}>
            <Link href="/forgetpassword">
              <Button>Go Back</Button>
            </Link>
          </Box>
        </FormBody>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60%',
  height: '100%',
  paddingTop: '4rem',

  '@media (max-width: 900px)': {
    width: '100%',
  },

  form: {
    width: '100%',
  },
});

const FormBody = styled('div')({
  width: '50%',

  '@media (max-width: 1020px)': {
    width: '80%',
    padding: '2rem 0',
  },
});

const InputControl = styled('div')({
  marginBottom: '0.8rem',
});

export default OtpForm;
