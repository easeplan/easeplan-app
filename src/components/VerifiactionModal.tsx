import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import FormSuccess from '@/components/common/FormSuccess';
import FormError from '@/components/common/FormError';
import { Typography } from '@mui/material';
import CustomButton from './common/CustomButton';
import FormInput from '@/components/common/FormInput';
import Image from 'next/image';
import EmailImg from '@/public/email.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const OtpSchema = Yup.object().shape({
  token: Yup.string()
    .required(`OTP is required`)
    .min(4, `OTP must be at least 4 characters long`),
});

interface verificationTypes {
  setVerificationModal: any;
  setOtpSuccessful: any;
}

const VerifiactionModal = ({
  setVerificationModal,
  setOtpSuccessful,
}: verificationTypes) => {
  const [loginSuccess, setLoginSuccess] = useState<any>();
  const [loginError, setLoginError] = useState<any>();
  const [userEmail, setUserEmail] = useState<string | null>();
  const [resendCountDown, setResendCountDown] = useState<any>();
  const [countDown, setCountDown] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setUserEmail(localStorage.getItem(`userEmail`));
    }

    let count = 60;
    const interval = setInterval(function () {
      const minutes = Math.floor(count / 60);
      const seconds = count % 60;
      const timer = minutes + `:` + (seconds < 10 ? `0` : ``) + seconds;
      count--;
      setResendCountDown(timer);
      setCountDown(seconds);
      if (count === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }, [isResend]);

  const submitOtp = async (otp: any) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
        otp,
      );
      setLoginSuccess(data.message);
      setLoginError(``);
      setTimeout(() => {
        setVerificationModal(false);
        setOtpSuccessful(true);
      }, 2000);
    } catch (error: any) {
      setIsLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  const resendHandler = async () => {
    try {
      setIsResendLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-new-email`,
        { email: userEmail },
      );
      setIsResend(true);
    } catch (error: any) {
      setIsResendLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
    }
  };

  return (
    <VerificationModal>
      <div className="otpContainer">
        <div className="box">
          <Image src={EmailImg} alt="EmailImage" fill />
        </div>
        <h2>OTP Verification</h2>
        <p>
          Please enter the 5 digit code sent to
          <b> {userEmail}</b>
        </p>
        <div className="otpForm">
          <Formik
            initialValues={{
              token: ``,
            }}
            onSubmit={(values) => submitOtp(values)}
            validationSchema={OtpSchema}
          >
            {() => (
              <Form>
                {loginSuccess && <FormSuccess text={loginSuccess} />}
                {loginError && <FormError text={loginError} />}
                <FormInput
                  ariaLabel="Otp"
                  name="token"
                  type="text"
                  placeholder="Enter OTP"
                  max={4}
                  min={4}
                />
                {countDown === 1 ? null : (
                  <Typography my={1} color="primary.main">
                    {resendCountDown}
                  </Typography>
                )}

                <CustomButton
                  bgPrimary
                  lgWidth="100%"
                  mdWidth="100%"
                  loading={isLoading}
                  loadingText="VERIFING..."
                  type="submit"
                  mb={4}
                >
                  Verify
                </CustomButton>
              </Form>
            )}
          </Formik>

          {countDown === 1 ? (
            <button onClick={resendHandler} className="resendBtn">
              {isResendLoading ? (
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                  <span style={{ marginLeft: `0.5rem` }}>RESENDING....</span>
                </span>
              ) : (
                <>RESEND CODE</>
              )}
            </button>
          ) : (
            <button
              onClick={() => setVerificationModal(false)}
              className="resendBtn"
            >
              CHANGE EMAIL
            </button>
          )}
        </div>
      </div>
    </VerificationModal>
  );
};

const VerificationModal = styled(`div`)(({ theme }) => ({
  background: `rgba(183, 233, 246, 0.107)`,
  height: `100vh`,
  width: `100%`,
  textAlign: `center`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  color: theme.palette.primary.main,
  paddingTop: `4rem`,

  '.otpContainer': {
    width: `50%`,

    '@media (max-width: 1020px)': {
      width: `80%`,
      padding: `2rem 0`,
    },
  },

  '.resendBtn': {
    fontWeight: `800`,
    border: `none`,
    background: `none`,
    outline: `none`,
    marginBottom: `1rem`,
    cursor: `pointer`,
    color: theme.palette.secondary.main,

    '@media (max-width: 1020px)': {
      width: `80%`,
    },
  },

  '.otpForm': {
    marginTop: `1rem`,
  },

  '.box': {
    width: `40%`,
    height: `120px`,
    margin: `2rem auto`,
    position: `relative`,
  },

  '@media (max-width: 900px)': {
    '.box': {
      width: `40%`,
      height: `100px`,
      margin: `2rem auto`,
      position: `relative`,
    },
  },
}));

export default VerifiactionModal;
