/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import Label from '@/components/common/Label';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CustomButton from '../common/CustomButton';
import SelectAccountType from '../SelectAccountType';
import VerifiactionModal from '../VerifiactionModal';
import InputField from './InputField';
import { Alert, Box, Button, Typography } from '@mui/material';
import FormError from '../common/FormError';
import { useSignupMutation } from '@/features/usersApiSlice';
import TermsAndConditionModal from '../TermsAndConditionModal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setCredentials } from '@/features/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from '../GoogleButton';
import { isLogin, setCloseModal } from '@/features/onboardingSlice';
import posthog from 'posthog-js';

const strengthLables = [`weak`, `medium`, `strong`];

const SignupForm = ({ modal }: any) => {
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>();
  const [verificationModal, setVerificationModal] = useState<any>(false);
  const [otpSuccessful, setOtpSuccessful] = useState<any>(false);
  const [strength, setStrength] = useState(``);
  const [passErr, setPassErr] = useState<string>(``);
  const [emailErr, setEmailErr] = useState<string>(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedMsg, setIsCheckedMsg] = useState(``);
  const [termAndCondition, setTermsAndCondition] = useState<boolean>(false);

  const setReferedBy = () => {
    const referedBy = localStorage.getItem(`referedBy`);
    if (referedBy) {
      // If there`s a referral parameter, capture that event
      posthog.capture(`sign-up`, {
        distinct_id: posthog.get_distinct_id(),
        referedBy: referedBy,
      });
    }
  };

  const getPasswordStrength = (password: string) => {
    let strengthIndicators = -1,
      upper = false,
      lower = false,
      numbers = false;

    for (let index = 0; index < password.length; index++) {
      const char = password.charCodeAt(index);
      if (!upper && char >= 65 && char < 90) {
        upper = true;
        strengthIndicators++;
      }
      if (!numbers && char >= 48 && char < 57) {
        numbers = true;
        strengthIndicators++;
      }
      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndicators++;
      }
    }

    return setStrength(strengthLables[strengthIndicators]);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: { target: { value: string; name: string } }) => {
    setPassword(event?.target?.value);
    if (event?.target?.name) {
      getPasswordStrength(event?.target?.value);
    }
  };

  const handleEmailChange = (event: {
    target: { value: string; name: string };
  }) => {
    setEmail(event?.target?.value);
  };

  const submitCredentials = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const credentials = { email: email, password: password };
    if (!email) {
      setEmailErr(`email is required`);
    } else if (!password) {
      setPassErr(`password is required`);
    } else if (!isChecked) {
      setIsCheckedMsg(`Terms and Condition is required`);
    } else {
      setIsCheckedMsg(``);
      setPassErr(``);
      setEmailErr(``);
      try {
        setIsLoading(true);
        // const res = await signup(credentials).unwrap();
        const res = await axios.post(`/api/signup`, credentials);
        toast.success(res?.data?.message);
        localStorage.setItem(`authUser`, res?.data?.user?._id);
        // dispatch(setCredentials(res?.data?.user?._id));
        setReferedBy();
        // Saving user email, to send along with the verification token
        if (typeof window !== `undefined`) {
          localStorage.setItem(`userEmail`, `${email}`);
        }
        setVerificationModal(true);
      } catch (error: any) {
        toast.error(error.response?.data?.message);
        setIsLoading(false);
        setErrorMsg(error.data?.error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTermModal = () => {
    setTermsAndCondition(!termAndCondition);
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
        localStorage.setItem(`isProvider`, `${!!data.user?.providerProfile}`);
        dispatch(setCredentials(data?.user?._id));
        if (data.success === true) {
          dispatch(setCloseModal(false));
          router.push(`/user/findvendors`);
          setReferedBy();
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
      <TermsAndConditionModal
        isOpen={termAndCondition}
        isClose={() => setTermsAndCondition(false)}
      />
      <>
        {verificationModal ? (
          <VerifiactionModal
            setVerificationModal={setVerificationModal}
            setOtpSuccessful={setOtpSuccessful}
          />
        ) : (
          <FormWrapper>
            <Box
              sx={{
                width: {
                  xs: `80%`,
                  sm: `90%`,
                  md: `50%`,
                  lg: `45%`,
                  xl: `45%`,
                },
              }}
            >
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
                  textTransform: `inherit`,
                  textAlign: `center`,
                }}
              >
                Signup To {modal ? `contiune` : `Easeplan`}
              </Typography>
              <Box sx={{ display: `flex`, flexDirection: `column` }}>
                <GoogleButton
                  onClick={handleGoogleLogin}
                  text="Sign up with Google"
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
              <form onSubmit={submitCredentials}>
                {errorMsg && (
                  <Alert sx={{ mb: 2 }} severity="error">
                    {errorMsg}
                  </Alert>
                )}
                <InputControl>
                  <div>
                    <InputField
                      onChange={handleEmailChange}
                      name="email"
                      value={email}
                      placeholder="Email Address"
                      type="email"
                    />
                  </div>
                  {emailErr && <FormError text={emailErr}></FormError>}
                </InputControl>
                <InputControl>
                  <PasswordControl>
                    <InputField
                      name="password"
                      value={password}
                      strength={strength}
                      type={showPassword ? `text` : `password`}
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <div className="password" onClick={handleShowPassword}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </PasswordControl>
                  {passErr && <FormError text={passErr}></FormError>}
                </InputControl>
                <Box sx={{ mt: 4 }}>
                  <CustomButton
                    bgPrimary
                    lgWidth="100%"
                    mdWidth="100%"
                    loading={isLoading}
                    loadingText="SIGNING UP..."
                    type="submit"
                  >
                    SIGN UP
                  </CustomButton>
                </Box>
                <RememberDiv>
                  <Box>
                    <Box
                      sx={{
                        display: `flex`,
                        alignItems: `center`,
                        cursor: `pointer`,
                      }}
                    >
                      <Checkbox
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      <Typography
                        fontSize="0.8rem"
                        color="primary.main"
                        onClick={handleTermModal}
                      >
                        Privacy Policy & Terms and Condition
                      </Typography>
                    </Box>
                    {isCheckedMsg && (
                      <FormError text={isCheckedMsg}></FormError>
                    )}
                  </Box>
                </RememberDiv>
                <Footer>
                  Already a member?{` `}
                  {modal ? (
                    <Button
                      sx={{ fontWeight: `bold` }}
                      onClick={() => dispatch(isLogin(true))}
                    >
                      Login
                    </Button>
                  ) : (
                    <Link href="/login" className="link">
                      Login
                    </Link>
                  )}
                </Footer>
              </form>
            </Box>
          </FormWrapper>
        )}
      </>
    </>
  );
};

const FormWrapper = styled(`div`)({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  width: `100%`,
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
    color: theme.palette.grey[500],
  },
  '@media (max-width: 1020px)': {
    '.password': {
      position: `absolute`,
      top: `1.3rem`,
      right: `1rem`,
    },
  },
}));

const InputControl = styled(`div`)({
  marginBottom: `0.3rem`,
});

const RememberDiv = styled(`div`)(({ theme }: any) => ({
  display: `flex`,
  alignItems: `center`,
  marginTop: `1rem`,
  justifyContent: `space-between`,
  fontSize: `0.9rem`,
  fontWeight: `600`,

  '.forgotPassword': {
    color: theme.palette.primary.main,
  },
}));

const Title = styled(`h3`)(({ theme }: any) => ({
  fontWeight: `700`,
  fontSize: `1.5rem`,
  color: theme.palette.primary.main,
  marginBottom: `1.5rem`,
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

export default SignupForm;
