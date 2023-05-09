/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormSuccess from '@/components/common/FormSuccess';
import FormError from '@/components/common/FormError';
import Label from '@/components/common/Label';
import FormInput from '@/components/common/FormInput';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import axios from 'axios';
import EventImg from '@/public/waitlist.gif';
import Confetti from 'react-confetti';
import CustomButton from './common/CustomButton';

const waitlistSchema = Yup.object().shape({
  email: Yup.string().required(`Email is required`),
  name: Yup.string().required(`FullName is required`),
});

const style = {
  position: `absolute` as const,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: `50%`,
  borderRadius: `1rem`,
  padding: `2rem`,
  background: `#fff`,
  boxShadow: 24,

  '@media (max-width: 1020px)': {
    width: `90%`,
    padding: `2rem`,
  },
};

interface IModal {
  isOpen: boolean;
  isClose: any;
}

export default function WaitList({ isOpen, isClose }: IModal) {
  const [waitlistSuccess, setWaitlistSuccess] = useState<any>();
  const [loginError, setLoginError] = useState<any>();
  const [loginLoading, setLoginLoading] = useState<any>(false);

  const submitCredentials = async (credentials: any) => {
    try {
      setLoginLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/waitlists`,
        credentials,
      );
      setWaitlistSuccess(data.data.waitlist);
      setLoginError(``);
    } catch (error: any) {
      setLoginLoading(false);
      setLoginError(`Email Already Exist`);
      setWaitlistSuccess(null);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <Box sx={style}>
        {waitlistSuccess && <Confetti width={800} height={600} />}
        <ModalBody>
          <CloseIcon className="closeIcon" onClick={() => isClose(false)} />
          <Title>
            {waitlistSuccess
              ? `Congratulation ${waitlistSuccess?.name} 🥰`
              : ` Be the first know when the app is available`}
          </Title>
          <div className="gridContainer">
            {waitlistSuccess ? (
              <div className="container">
                <div>
                  <p>
                    We&apos;re excited to have you on board and can&apos;t wait
                    to show you what we&apos;ve been working on.
                  </p>
                  <h4 style={{ marginTop: `1rem` }}>
                    Your position on the waitlist is
                  </h4>
                  <h1 className="waitlistPosition">
                    {waitlistSuccess?.position}
                  </h1>
                </div>
              </div>
            ) : (
              <FormWrapper>
                <Formik
                  initialValues={{
                    name: ``,
                    email: ``,
                  }}
                  onSubmit={(values) => submitCredentials(values)}
                  validationSchema={waitlistSchema}
                >
                  {() => (
                    <Form>
                      {waitlistSuccess && (
                        <FormSuccess text={waitlistSuccess} />
                      )}
                      {loginError && <FormError text={loginError} />}
                      <InputControl>
                        <div>
                          <div>
                            <Label text="Full Name" />
                          </div>
                          <FormInput
                            ariaLabel="FirstName"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </InputControl>
                      <InputControl>
                        <div>
                          <div>
                            <Label text="Email address" />
                          </div>
                          <FormInput
                            ariaLabel="Email"
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                          />
                        </div>
                      </InputControl>
                      <CustomButton
                        bgPrimary
                        lgWidth="100%"
                        type="submit"
                        loading={loginLoading}
                        loadingText="JOINING..."
                      >
                        JOIN WAITLIST
                      </CustomButton>
                    </Form>
                  )}
                </Formik>
              </FormWrapper>
            )}
            <ImageWrapper>
              <Image
                src={EventImg}
                alt="waitlistImg"
                width={200}
                height={200}
              />
            </ImageWrapper>
          </div>
        </ModalBody>
      </Box>
    </Modal>
  );
}

const ModalBody = styled(`div`)(({ theme }) => ({
  position: `relative`,
  padding: `2rem`,

  '@media (max-width: 900px)': {
    padding: `1rem 0 0 0`,
  },
  '.gridContainer': {
    color: theme.palette.primary.main,
    display: `grid`,
    gridTemplateColumns: `repeat(2, 1fr)`,
    paddingTop: `3rem`,

    '@media (max-width: 900px)': {
      gridTemplateColumns: `repeat(1, 1fr)`,
      paddingTop: `3rem`,
    },

    '.container': {
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      textAlign: `center`,
      '.waitlistPosition': {
        fontWeight: `700`,
        fontSize: `4rem`,
        color: theme.palette.primary.main,
      },
    },
  },

  '.closeIcon': {
    position: `absolute`,
    color: theme.palette.grey[700],
    top: `-1rem`,
    right: `-1rem`,
    cursor: `pointer`,
  },
}));

const InputControl = styled(`div`)({
  marginBottom: `1rem`,
});

const FormWrapper = styled(`div`)({});

const ImageWrapper = styled(`div`)({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,

  '@media (max-width: 900px)': {
    paddingTop: `2rem`,

    img: {
      width: `40%`,
      height: `100px`,
    },
  },
});

const Title = styled(`h1`)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: `700`,

  '@media (max-width: 900px)': {
    fontSize: `1.5rem`,
  },
}));
