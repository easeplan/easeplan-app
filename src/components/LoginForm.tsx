/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormError from '@/components/common/FormError';
import Label from '@/components/common/Label';
import FormInput from '@/components/common/FormInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Checkbox, Typography } from '@mui/material';
import CustomButton from './common/CustomButton';
import SelectAccountType from './SelectAccountType';
// import { useDispatch } from 'react-redux';
// import { setToken } from '@/features/cookie/cookieSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required(`Email is required`),
  password: Yup.string().required(`Password is required`),
});

const LoginForm = () => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [loginSuccess, setLoginSuccess] = useState<any>();
  const [loginError, setLoginError] = useState<any>();
  const [previewModal, setPreviewModal] = useState<boolean>();
  const [userName] = useState<any>(
    typeof window !== `undefined` ? localStorage.getItem(`userName`) : ``,
  );

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitCredentials = async (credentials: any) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_API}/api/auth`,
        credentials,
      );
      setLoginSuccess(`Successful Login`);
      setLoginError(``);
      // saving the user role to localStorage
      if (typeof window !== `undefined`) {
        localStorage.setItem(`userRole`, `${data.data.role}`);
      }
      if (data?.data?.hasVisited) {
        if (data?.data?.onboardStage < 3) {
          router.push(`/onboarding`);
        } else {
          router.push(`/account`);
        }
      } else {
        if (typeof window !== `undefined`) {
          localStorage.setItem(`userEmail`, `${credentials.email}`);
        }
        setTimeout(() => {
          setPreviewModal(true);
        }, 2000);
      }
    } catch (error: any) {
      setIsLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  return (
    <>
      {previewModal ? (
        <SelectAccountType />
      ) : (
        <FormWrapper>
          <FormBody>
            {userName ? (
              <Typography
                sx={{
                  fontWeight: `700`,
                  fontSize: `1.5rem`,
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
                  fontSize: `1.5rem`,
                  color: `primary.main`,
                  marginBottom: `2rem`,
                  textTransform: `capitalize`,
                }}
              >
                Login To Easeplan
              </Typography>
            )}
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
                  {/* {loginSuccess && <FormSuccess text={loginSuccess} />} */}
                  {loginError && <FormError text={loginError} />}
                  <InputControl>
                    <div>
                      <div>
                        <Label text="Email address" />
                      </div>
                      <FormInput
                        ariaLabel="Email"
                        name="email"
                        type="text"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <Label text="Password" />
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
                  <RememberDiv>
                    <CheckLabel>
                      <Checkbox
                        sx={{
                          color: `grey`,
                          '&.Mui-checked': {
                            color: `primary`,
                          },
                        }}
                      />
                      <span> Remember Me</span>
                    </CheckLabel>
                    <Link href="/" className="forgotPassword">
                      Forgot Password?
                    </Link>
                  </RememberDiv>
                  <Footer>
                    Not a member yet?{` `}
                    <Link href="/signup" className="link">
                      Sign up
                    </Link>
                  </Footer>
                </Form>
              )}
            </Formik>
          </FormBody>
        </FormWrapper>
      )}
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
  width: `50%`,

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
      top: `1.3rem`,
      right: `1rem`,
      fontSize: `1rem`,
    },
  },
}));

const InputControl = styled(`div`)({
  borderBottom: `solid 1px #ccc`,
  marginBottom: `0.8rem`,
});

const RememberDiv = styled(`div`)(({ theme }: any) => ({
  display: `flex`,
  alignItems: `center`,
  marginTop: `1rem`,
  justifyContent: `space-between`,
  fontSize: `0.9rem`,
  color: theme.palette.primary.main,

  '.forgotPassword': {
    color: theme.palette.primary.main,
  },
}));

const CheckLabel = styled(`div`)({
  display: `flex`,
  alignItems: `center`,
});

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
