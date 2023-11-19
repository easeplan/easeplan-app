/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import FormInput from './common/FormInput';
import axios from 'axios';
import CustomButton from './common/CustomButton';
import { Grid, Box, Typography } from '@mui/material';
import { useAuthUser } from '@/context/contextStore';
import ErrorModal from './common/ErrorModal';
import SuccessModal from './common/SuccessModal';
import Link from 'next/link';

const ProfileSchema = Yup.object().shape({
  maximum: Yup.string().required('Maximum amount is required'),
  minimum: Yup.string().required('Minimum amount is required'),
});

const VendorPricingForm = ({ token }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<any>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<any>();
  const [isError, setIsError] = useState<false>(false);
  const [isErrorMessage, setIsErrorMessage] = useState<any>();
  const { queryData } = useAuthUser();

  const submitCredentials = async (credentials: any) => {
    try {
      const budgetStructure = {
        budget: {
          maximum: credentials.maximum,
          minimum: credentials.minimum,
        },
      };
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/providers/verification/add-budget`,
        budgetStructure,
        {
          headers: {
            'Content-Type': 'application/json',
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
        title="Successful"
        message="Awesome your pricing has been set!"
      >
        <Link href="/account/gig/event">
          <CustomButton
            mt={2}
            bgPrimary
            smWidth="auto"
            size="small"
            type="submit"
          >
            Next
          </CustomButton>
        </Link>
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
      <h4 className="title">Packages</h4>
      <Formik
        initialValues={{
          minimum: queryData?.budget?.minimum ? queryData?.budget?.minimum : '',
          maximum: queryData?.budget?.maximum ? queryData?.budget?.maximum : '',
        }}
        onSubmit={(values) => submitCredentials(values)}
        validationSchema={ProfileSchema}
      >
        {() => (
          <Form>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 5 }}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <Description>
                      <p>
                        You can upload upto 3 images of your previous events
                        this should help convince your customers faster.
                      </p>
                    </Description>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <InputController>
                      <Box sx={{ mb: 2, pt: 2 }}>
                        <Typography sx={{ fontSize: '1rem' }}>
                          Maximum amount
                        </Typography>
                        <FormInput
                          ariaLabel="maximum"
                          name="maximum"
                          type="text"
                          sx={{ padding: '0.7rem' }}
                          placeholder="100,000"
                        />
                      </Box>
                      <Box sx={{ mb: 2, pt: 2 }}>
                        <Typography sx={{ fontSize: '1rem' }}>
                          Minimum amount
                        </Typography>
                        <FormInput
                          ariaLabel="minimum"
                          name="minimum"
                          type="text"
                          sx={{ padding: '0.7rem' }}
                          placeholder="100,000"
                        />
                      </Box>
                    </InputController>
                  </Box>
                </Grid>
              </Grid>
              <Box textAlign="right">
                <CustomButton
                  bgPrimary
                  lgWidth="20%"
                  loading={isLoading}
                  loadingText="Saving..."
                  type="submit"
                >
                  {isSuccess ? 'SAVED ✔' : 'SAVE'}
                </CustomButton>
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

export default VendorPricingForm;
