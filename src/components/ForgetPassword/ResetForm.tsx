/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '@/components/common/Label';
import FormInput from '@/components/common/FormInput';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Alert, Typography, Box, Button } from '@mui/material';
import CustomButton from '../common/CustomButton';
import { useResetPasswordMutation } from '@/features/usersApiSlice';
import { setCredentials } from '@/features/authSlice';
import Link from 'next/link';
import axios from 'axios';

const OtpSchema = Yup.object().shape({
  newPassword: Yup.string().required('Token is required'),
  confirmPassword: Yup.string().required('Confirm Password is required'),
});

const ResetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>();
  const [successMsg, setSuccessMsg] = useState<any>();
  const [userEmail] = useState<any>(
    typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '',
  );

  const submitCredentials = async (credentials: any) => {
    try {
      setIsLoading(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          newPassword: credentials.newPassword,
          confirmPassword: credentials.confirmPassword,
          email: userEmail,
        },
      );
      router.push('/login');
      setSuccessMsg('Password created succefully');
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
              textAlign: 'center',
            }}
          >
            Reset Password
          </Typography>
          {/* <Typography
            sx={{
              fontSize: `1rem`,
              color: `primary.main`,
              marginBottom: `1rem`,
            }}
          >
            A one time OTP is send to <strong>{userEmail}</strong>
          </Typography> */}
          <Formik
            initialValues={{
              newPassword: '',
              confirmPassword: '',
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
                {successMsg && (
                  <Alert sx={{ mb: 2 }} severity="success">
                    {successMsg}
                  </Alert>
                )}

                <InputControl>
                  <div>
                    <Label text="Password" />
                  </div>
                  <PasswordControl>
                    <FormInput
                      ariaLabel="Password"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                    />
                    <div
                      className="password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </PasswordControl>
                </InputControl>
                <InputControl>
                  <div>
                    <Label text="Confirm Password" />
                  </div>
                  <PasswordControl>
                    <FormInput
                      ariaLabel="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                    />
                    <div
                      className="password"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </PasswordControl>
                </InputControl>
                <CustomButton
                  bgPrimary
                  lgWidth="100%"
                  mdWidth="100%"
                  loading={isLoading}
                  type="submit"
                >
                  Create Password
                </CustomButton>
              </Form>
            )}
          </Formik>
          <Box sx={{ mt: 4 }}>
            <Link href="/forgetpassword/verify">
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

const PasswordControl = styled('div')(({ theme }: any) => ({
  position: 'relative',
  '.password': {
    position: 'absolute',
    top: '1.2rem',
    right: '1rem',
    fontSize: '1.3rem',
    color: theme.palette.grey[500],
  },
  '@media (max-width: 1020px)': {
    '.password': {
      position: 'absolute',
      top: '1.3rem',
      right: '1rem',
      fontSize: '1rem',
    },
  },
}));

const InputControl = styled('div')({
  marginBottom: '0.8rem',
});

export default ResetForm;
