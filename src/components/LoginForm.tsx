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

const LoginSchema = Yup.object().shape({
  email: Yup.string().required(`Email is required`),
  password: Yup.string().required(`Password is required`),
});

const LoginForm = ({ modal }: any) => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<any>();
  const [previewModal, setPreviewModal] = useState<boolean>();
  const [userName] = useState<any>(
    typeof window !== `undefined` ? localStorage.getItem(`userName`) : ``,
  );
  const lastVisitedURL = useLastVisitedURL();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitCredentials = async (credentials: any) => {
    try {
      setIsLoading(true);
      const data = await login(credentials).unwrap();
      const id = data?.user?._id;
      dispatch(setCredentials(id));

      // Redirect to the last visited URL or a default route
      if (lastVisitedURL) {
        router.push(lastVisitedURL);
      } else {
        dispatch(setCloseModal(false));
        router.push(`/user/findvendors`); // Redirect to the home page if no lastVisitedURL is available
      }
      if (typeof window !== `undefined`) {
        localStorage.setItem(`userEmail`, `${credentials.email}`);
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMsg(error.data?.error);
    }
  };

  // GOOGLE Auth Login
  const responseGoogle = async (response: any) => {
    try {
      if (response.access_token) {
        const result = await fetch(`/api/google-auth`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`,
          },
          body: JSON.stringify({ token: response.access_token }),
        });

        const data = await result.json();
        dispatch(setCredentials(data?.user?._id));
        if (data.success === true) {
          router.push(`/user/findvendors`);
          dispatch(isLogin(false));
          dispatch(setCloseModal(false));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
  });

  return (
    <>
      <FormWrapper>
        <Box
          sx={{
            width: {
              xs: `80%`,
              sm: `90%`,
              md: `50%`,
              lg: `45%`,
              xl: `45%`,
              paddingBottom: `1rem`,
            },
          }}
        >
          {userName ? (
            <Typography
              sx={{
                fontWeight: `700`,
                fontSize: {
                  xs: `1rem`,
                  sm: `1rem`,
                  md: `1.5rem`,
                  lg: `1.5rem`,
                },
                color: `primary.main`,
                marginBottom: `2rem`,
                textTransform: `capitalize`,
              }}
            >
              Welcome back, {userName}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontWeight: `700`,
                fontSize: {
                  xs: `1.2rem`,
                  sm: `1.2rem`,
                  md: `1.5rem`,
                  lg: `1.5rem`,
                },
                color: `primary.main`,
                marginBottom: `2rem`,
                textTransform: `capitalize`,
                textAlign: `center`,
              }}
            >
              Login To {modal ? `Continue` : `Easeplan`}
            </Typography>
          )}
          <Box sx={{ display: `flex`, flexDirection: `column` }}>
            <GoogleButton
              onClick={handleGoogleLogin}
              text="Log in with Google"
            />
            <Box
              sx={{
                textAlign: `center`,
                mt: 1,
                mb: 1,
                fontWeight: `bold`,
                fontSize: `0.8rem`,
                color: `primary.main`,
              }}
            >
              OR
            </Box>
          </Box>
          <Formik
            initialValues={{
              email: ``,
              password: ``,
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
                      type={showPassword ? `text` : `password`}
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
                  Not a member yet?{` `}
                  {modal ? (
                    <Button
                      sx={{ fontWeight: `bold` }}
                      onClick={() => dispatch(isLogin(false))}
                    >
                      Sign up
                    </Button>
                  ) : (
                    <Link href="/signup" className="link">
                      Sign up
                    </Link>
                  )}
                </Footer>
              </Form>
            )}
          </Formik>
        </Box>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled(`div`)({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  width: `100%`,
  height: `100%`,
  background: `rgba(183, 233, 246, 0.25)`,
  backdropFilter: `blur(13px)`,
  paddingTop: `4rem`,

  form: {
    width: `100%`,
  },
});

const FormBody = styled(`div`)({
  width: `40%`,

  '@media (max-width: 1020px)': {
    width: `80%`,
    padding: `2rem 0`,
  },
});

const PasswordControl = styled(`div`)(({ theme }: any) => ({
  position: `relative`,
  '.password': {
    position: `absolute`,
    top: `1.2rem`,
    right: `1rem`,
    fontSize: `1.3rem`,
    color: theme.palette.grey[500],
  },
  '@media (max-width: 1020px)': {
    '.password': {
      position: `absolute`,
      top: `1.1rem`,
      right: `1rem`,
    },
  },
}));

const InputControl = styled(`div`)({
  marginBottom: `0.8rem`,
});

const RememberDiv = styled(`div`)(({ theme }: any) => ({
  display: `flex`,
  alignItems: `center`,
  marginTop: `1rem`,
  justifyContent: `space-between`,
  fontSize: `0.9rem`,

  '.forgotPassword': {
    color: theme.palette.primary.main,
    fontWeight: `500`,
  },
}));

const Footer = styled(`p`)(({ theme }: any) => ({
  borderTop: `solid 1px #ccc`,
  marginTop: `0.8rem`,
  paddingTop: `0.8rem`,
  textAlign: `center`,
  letterSpacing: `0.5px`,
  fontSize: `1rem`,
  color: theme.palette.primary.main,

  '.link': {
    color: theme.palette.primary.main,
    fontWeight: `700`,
  },
}));

export default LoginForm;
