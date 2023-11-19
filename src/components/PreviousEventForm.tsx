/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormSuccess from './common/FormSuccess';
import FormError from './common/FormError';
import { useRouter } from 'next/router';
import FormInput from './common/FormInput';
import Label from './common/Label';
import Divider from './common/Divider';
import DragAndDropInput from './common/DragAndDropInput';
import axios from 'axios';
import { useAuthUser } from '@/context/contextStore';
import CustomButton from './common/CustomButton';
import theme from '@/styles/theme';
import { Grid, Box, Container } from '@mui/material';
import ErrorModal from './common/ErrorModal';
import SuccessModal from './common/SuccessModal';
import Link from 'next/link';

const ProfileSchema = Yup.object().shape({
  image: Yup.string().required('Image is missing'),
  title: Yup.string().required('title is missing'),
  subTitle: Yup.string().required('subTitle is missing'),
});

interface EventProps {
  token: string;
}

const PreviousEventForm = ({ token }: EventProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isErrorMessage, setIsErrorMessage] = useState<any>();
  const { queryData } = useAuthUser();

  const submitCredentials = async (credentials: any) => {
    try {
      const formData = new FormData();
      formData.append('image', credentials.image);
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/providers/samples`,
        {
          image: credentials.image,
          title: credentials.title,
          subTitle: credentials.subTitle,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data.status === 'success') {
        setIsLoading(false);
        setIsSuccess(true);
      }
      setIsSuccessMessage(data.message);
    } catch (error: any) {
      setIsLoading(false);
      setIsErrorMessage(error.message);
      setIsSuccess(false);
    }
  };

  return (
    <Section>
      <SuccessModal
        isOpen={isSuccess}
        isClose={() => setIsSuccess(false)}
        title="Sent Successfully"
        // message="Check back later your Information's are under review"
      >
        <Link href="/account/gig/preview">
          <CustomButton mt={2} bgPrimary smWidth="auto" size="small">
            Preview your gig
          </CustomButton>
        </Link>
        <Box mt={2}></Box>
        <Link href="/account">Go to dashboard</Link>
      </SuccessModal>
      <ErrorModal
        isOpen={isError}
        isClose={() => setIsError(false)}
        // title="Ooops!"
        message={isErrorMessage}
      >
        <CustomButton
          bgPrimary
          smWidth="auto"
          size="small"
          type="submit"
          onClick={() => setIsError(false)}
        >
          Try Again
        </CustomButton>
      </ErrorModal>
      <h4 className="title">Upload Images</h4>
      <Formik
        initialValues={{
          image: '',
          title: '',
          subTitle: '',
        }}
        onSubmit={(values) => submitCredentials(values)}
        validationSchema={ProfileSchema}
      >
        {() => (
          <Form>
            {isSuccess && <FormSuccess text={isSuccessMessage} />}
            {isError && <FormError text={isErrorMessage} />}
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <Description>
                <p>
                  You can upload upto 3 images of your previous events this
                  should help convince your customers faster.
                </p>
              </Description>
              <Box
                sx={{
                  margin: '0 auto',
                  width: {
                    xs: '80%',
                    sm: '80%',
                    md: '60%',
                    lg: '50%',
                    xl: '50%',
                  },
                }}
              >
                <InputController>
                  <Box>
                    <div>
                      <Label text="Upload cover image" />
                    </div>
                    <DragAndDropInput type="file" name="image" />
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <div>
                      <Label text="Title" />
                    </div>
                    <FormInput
                      ariaLabel="title"
                      name="title"
                      type="text"
                      placeholder="e.g Golden Event"
                    />
                  </Box>
                  <Box>
                    <div>
                      <Label text="Sub Title" />
                    </div>
                    <FormInput
                      ariaLabel="subTitle"
                      name="subTitle"
                      type="text"
                      placeholder="Sub Title"
                    />
                  </Box>
                </InputController>
                <Box mt={3} textAlign="right">
                  {/* <Box mb={2}>
                    <CustomButton
                      style={{
                        background: `#fff`,
                        border: `solid 1px ${theme.palette.primary.main}`,
                        borderRadius: `0`,
                        marginRight: `2rem`,
                        height: `2.8rem`,
                        marginBottom: {
                          xs: `1rem`,
                          sm: `1rem`,
                        },
                      }}
                      lgWidth="30%"
                      bgPrimary
                    >
                      Back
                    </CustomButton>
                  </Box> */}
                  <CustomButton
                    bgPrimary
                    loading={isLoading}
                    loadingText="Submitting..."
                    type="submit"
                  >
                    {isSuccess ? 'Submitted ✔' : 'Submit'}
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Section>
  );
};

const Section = styled('div')(({ theme }) => ({
  marginTop: '4rem',
  color: theme.palette.primary.main,

  '.title': {
    marginTop: '0.6rem',
    borderBottom: 'solid 0.5px #ccc',
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem',
  },

  '@media (max-width: 900px)': {
    marginTop: '2rem',
  },
}));

const Flex = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '6rem',
  marginBottom: '2rem',

  '@media (max-width: 900px)': {
    flexDirection: 'column',
    gap: '2rem',
  },
});

const Description = styled('div')({
  marginTop: '2rem',
  width: '70%',

  '.subTitle': {
    marginBottom: '1rem',
  },

  '@media (max-width: 900px)': {
    marginTop: '1rem',
    width: '100%',
  },
});

const InputController = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: '2rem',

  '.changeBtn': {
    padding: '1rem',
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },

  '.flex': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem',

    '.previewAvatar': {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: theme.palette.primary.main,
    },
    '.uploadBtn': {
      padding: '1rem 2rem',
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      marginTop: '0.5rem',
      whiteSpace: 'noWrap',
    },

    '@media (max-width: 900px)': {
      flexDirection: 'column',
      gridTemplateColumns: '1fr',
      gap: '0rem',
      marginBottom: '1rem',

      '.previewAvatar': {
        width: '80px',
        height: '80px',
        marginTop: '1rem',
      },

      '.uploadBtn': {
        padding: '0.8rem 2rem',
        fontSize: '0.8rem',
      },
    },
  },

  '@media (max-width: 900px)': {
    marginTop: '1rem',
    '.changeBtn': {
      padding: '0.7rem 1.5rem',
      border: 'none',
    },
  },
}));

const PasswordControl = styled('div')(({ theme }) => ({
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

const FormFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'right',
  gap: '6rem',
  marginBottom: '2rem',

  '.flex': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginTop: '1rem',
    width: '35%',
  },

  '@media (max-width: 900px)': {
    flexDirection: 'column',
    '.flex': {
      width: '100%',
    },
  },
}));

export default PreviousEventForm;
