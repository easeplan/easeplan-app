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
import { Alert } from '@mui/material';
import FormError from '../common/FormError';
import { useSignupMutation } from '@/features/usersApiSlice';

const strengthLables = [`weak`, `medium`, `strong`];

const SignupForm = () => {
  const [signup] = useSignupMutation();

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
    } else {
      try {
        setIsLoading(true);
        await signup(credentials).unwrap();
        // Saving user email, to send along with the verification token
        if (typeof window !== `undefined`) {
          localStorage.setItem(`userEmail`, `${email}`);
        }
        setTimeout(() => {
          setVerificationModal(true);
          setIsLoading(false);
        }, 2000);
      } catch (error: any) {
        setIsLoading(false);
        setErrorMsg(error.data?.error);
      }
    }
  };

  return (
    <>
      {otpSuccessful ? (
        <SelectAccountType />
      ) : (
        <>
          {verificationModal ? (
            <VerifiactionModal
              setVerificationModal={setVerificationModal}
              setOtpSuccessful={setOtpSuccessful}
            />
          ) : (
            <FormWrapper>
              <FormBody>
                <Title>Sign up to Easeplan</Title>
                <form onSubmit={submitCredentials}>
                  {errorMsg && (
                    <Alert sx={{ mb: 2 }} severity="error">
                      {errorMsg}
                    </Alert>
                  )}
                  <InputControl>
                    <div>
                      <div>
                        <Label text="Email address" />
                      </div>
                      <InputField
                        onChange={handleEmailChange}
                        name="email"
                        value={email}
                        placeholder="Example@gmail.com"
                        type="email"
                      />
                    </div>
                    {emailErr && <FormError text={emailErr}></FormError>}
                  </InputControl>
                  <InputControl>
                    <div>
                      <Label text="Password" />
                    </div>
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
                  <CustomButton
                    bgPrimary
                    lgWidth="100%"
                    mdWidth="100%"
                    loading={isLoading}
                    loadingText="SIGNING UP..."
                    type="submit"
                    mt={6}
                  >
                    SIGN UP
                  </CustomButton>
                  <RememberDiv>
                    <Link href="/" className="forgotPassword">
                      Forgot Password?
                    </Link>
                  </RememberDiv>
                  <Footer>
                    Already a member?{` `}
                    <Link href="/login" className="link">
                      Login
                    </Link>
                  </Footer>
                </form>
              </FormBody>
            </FormWrapper>
          )}
        </>
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
  background: `rgba(183, 233, 246, 0.107)`,
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
  marginBottom: `1rem`,
});

const RememberDiv = styled(`div`)(({ theme }: any) => ({
  display: `flex`,
  alignItems: `end`,
  marginTop: `1rem`,
  justifyContent: `end`,
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
