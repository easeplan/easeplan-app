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
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Alert, Box, Button, Typography } from '@mui/material';
import CustomButton from './common/CustomButton';
import SelectAccountType from './SelectAccountType';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/features/usersApiSlice';
import { setCredentials } from '@/features/authSlice';
import useLastVisitedURL from '@/hooks/useLastVisitedURL';
import GoogleButton from './GoogleButton';
import { useGoogleLogin } from '@react-oauth/google';
import { isLogin, setCloseModal } from '@/features/onboardingSlice';
import VerifiactionModal from './VerifiactionModal';
import { useAuth } from '@/hooks/authContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = ({ modal, fromLoginPage = false }: any) => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<any>();
  const [previewModal, setPreviewModal] = useState<boolean>();
  const [verificationModal, setVerificationModal] = useState<any>(false);
  const [otpSuccessful, setOtpSuccessful] = useState<any>(false);
  const { setUser } = useAuth();
  const { redirect_url } = router.query;

  const [userName] = useState<any>(
    typeof window !== 'undefined' ? localStorage.getItem('userName') : '',
  );
  const lastVisitedURL = useLastVisitedURL();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  interface Credentials {
    email: string;
    password: string;
  }
  const submitCredentials = async (credentials: Credentials) => {
    try {
      setIsLoading(true);
      const data = await login(credentials).unwrap();
      dispatch(setCloseModal(false));
      setUser(data.user);

      if (fromLoginPage) {
        if (redirect_url) {
          router.push(redirect_url as string);
        } else {
          router.push('/user/findvendors');
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.data?.message) {
        setErrorMsg(error.data.error);
        if (error.data.error === 'Verify your email to login') {
          setVerificationModal(true);
        }
      } else {
        setErrorMsg(error.data.error);
        if (error.data.error === 'Verify your email to login') {
          setVerificationModal(true);
        }
      }
    }
  };

  // GOOGLE Auth Login
  interface GoogleResponse {
    access_token: string;
  }

  const responseGoogle = async (response: GoogleResponse) => {
    try {
      setIsLoading(true);
      if (!response.access_token) {
        console.log('Access token not found in Google response');
        return;
      }

      const apiUrl = '/api/google-auth';
      const result = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.access_token }),
        credentials: 'include',
      });

      if (!result.ok) {
        // Handle HTTP error responses
        console.log('Error response from server:', result.status);
        return;
      }

      const data = await result.json();
      if (data.success) {
        setUser(data.user);
        // Uncomment if you need redirection
        if (fromLoginPage) {
          if (redirect_url) {
            router.push(redirect_url as string);
          } else {
            router.push('/user/findvendors');
          }
        }
        dispatch(isLogin(false));
        dispatch(setCloseModal(false));
      } else {
        // Handle unsuccessful data response
        console.log('Unsuccessful response data:', data);
      }
    } catch (error) {
      console.error('Error in responseGoogle:', error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
  });

  return (
    <>
      {verificationModal ? (
        <VerifiactionModal
          setVerificationModal={setVerificationModal}
          setOtpSuccessful={setOtpSuccessful}
          fromLoginPage={true}
        />
      ) : (
        <FormWrapper>
          <Box
            sx={{
              width: {
                xs: '80%',
                sm: '90%',
                md: '50%',
                lg: '45%',
                xl: '45%',
                paddingBottom: '1rem',
              },
            }}
          >
            {userName ? (
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: {
                    xs: '1rem',
                    sm: '1rem',
                    md: '1.5rem',
                    lg: '1.5rem',
                  },
                  color: 'primary.main',
                  marginBottom: '2rem',
                  textTransform: 'capitalize',
                }}
              >
                Welcome back, {userName}
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: {
                    xs: '1.2rem',
                    sm: '1.2rem',
                    md: '1.5rem',
                    lg: '1.5rem',
                  },
                  color: 'primary.main',
                  marginBottom: '2rem',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                }}
              >
                Login To {modal ? 'Continue' : 'Easeplan'}
              </Typography>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <GoogleButton
                onClick={handleGoogleLogin}
                text={isLoading ? 'Please wait ...' : 'Log in with Google'}
              />
              <Box
                sx={{
                  textAlign: 'center',
                  mt: 1,
                  mb: 1,
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  color: 'primary.main',
                }}
              >
                OR
              </Box>
            </Box>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(values) => submitCredentials(values)}
              validationSchema={LoginSchema}
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
                      <FormInput
                        ariaLabel="Email"
                        name="email"
                        type="text"
                        placeholder="example@email.com"
                      />
                    </div>
                    <PasswordControl>
                      <FormInput
                        ariaLabel="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                      />
                      <div className="password" onClick={handleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </PasswordControl>
                  </InputControl>
                  <Box sx={{ mt: 4 }}>
                    <CustomButton
                      bgPrimary
                      lgWidth="100%"
                      mdWidth="100%"
                      loading={isLoading}
                      loadingText="Logging In..."
                      type="submit"
                    >
                      LOGIN
                    </CustomButton>
                  </Box>
                  <RememberDiv>
                    <Link href="/forgetpassword" className="forgotPassword">
                      Forgot Password?
                    </Link>
                  </RememberDiv>
                  <Footer>
                    Not a member yet?{' '}
                    {modal ? (
                      <Button
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => dispatch(isLogin(false))}
                      >
                        Sign up
                      </Button>
                    ) : (
                      <Link
                        href={
                          redirect_url
                            ? `/signup?redirect_url=${redirect_url}`
                            : '/signup'
                        }
                        className="link"
                      >
                        Sign up
                      </Link>
                    )}
                  </Footer>
                </Form>
              )}
            </Formik>
          </Box>
        </FormWrapper>
      )}
    </>
  );
};

const FormWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  paddingTop: '4rem',

  form: {
    width: '100%',
  },
});

const FormBody = styled('div')({
  width: '40%',

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
      top: '1.1rem',
      right: '1rem',
    },
  },
}));

const InputControl = styled('div')({
  marginBottom: '0.8rem',
});

const RememberDiv = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
  justifyContent: 'space-between',
  fontSize: '0.9rem',

  '.forgotPassword': {
    color: theme.palette.primary.main,
    fontWeight: '500',
  },
}));

const Footer = styled('p')(({ theme }: any) => ({
  borderTop: 'solid 1px #ccc',
  marginTop: '0.8rem',
  paddingTop: '0.8rem',
  textAlign: 'center',
  letterSpacing: '0.5px',
  fontSize: '1rem',
  color: theme.palette.primary.main,

  '.link': {
    color: theme.palette.primary.main,
    fontWeight: '700',
  },
}));

export default LoginForm;
