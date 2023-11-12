/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '@/components/common/Label';
import FormInput from '@/components/common/FormInput';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { Alert, Checkbox, Typography } from '@mui/material';
import CustomButton from '../common/CustomButton';
import { useDispatch } from 'react-redux';
import { useSendEmailMutation } from '@/features/usersApiSlice';
import { setCredentials } from '@/features/authSlice';
import axios from 'axios';

const EmailSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
});

const EmailForm = () => {
  const dispatch = useDispatch();
  const [sendEmail] = useSendEmailMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<any>();

  const submitCredentials = async (credentials: any) => {
    try {
      setIsLoading(true);
      // await sendEmail(credentials).unwrap();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        credentials,
      );
      router.push('/forgetpassword/verify');
      if (typeof window !== 'undefined') {
        localStorage.setItem('userEmail', `${credentials.email}`);
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMsg('Email does not exist!');
      console.log(error);
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
              textAlign: 'center',
              color: 'primary.main',
              marginBottom: '2rem',
              textTransform: 'capitalize',
            }}
          >
            Reset Password
          </Typography>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(values) => submitCredentials(values)}
            validationSchema={EmailSchema}
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
                      <Label text="Enter your email" />
                    </div>
                    <FormInput
                      ariaLabel="Email"
                      name="email"
                      type="text"
                      placeholder="example@email.com"
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
                  Reset
                </CustomButton>
              </Form>
            )}
          </Formik>
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

export default EmailForm;
