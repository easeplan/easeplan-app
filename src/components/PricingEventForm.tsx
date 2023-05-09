/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import FormInput from './common/FormInput';
import Divider from './common/Divider';
import axios from 'axios';
import CustomButton from './common/CustomButton';
import { Grid, Box, Typography, Checkbox } from '@mui/material';
import { useAuthUser } from '@/context/contextStore';
import ErrorModal from './common/ErrorModal';
import SuccessModal from './common/SuccessModal';
import Link from 'next/link';

const ProfileSchema = Yup.object().shape({
  basicDJ: Yup.string(),
  basicCaterer: Yup.string(),
  basicSecurity: Yup.string(),
  basicCost: Yup.string(),
  basicGuest: Yup.string(),
  standardDJ: Yup.string(),
  standardCaterer: Yup.string(),
  standardSecurity: Yup.string(),
  standardCost: Yup.string(),
  standardGuest: Yup.string(),
});

const PricingEventForm = ({ token }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isErrorMessage, setIsErrorMessage] = useState<any>();
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const { queryData, setQueryData } = useAuthUser();

  const submitCredentials = async (credentials: any) => {
    try {
      const newData = {
        basic: [
          {
            serviceName: `DJ`,
            amount: credentials.basicCost,
          },
          {
            serviceName: `Caterer`,
            amount: credentials.basicCaterer,
          },
          {
            serviceName: `Security`,
            amount: credentials.basicSecurity,
          },
          {
            serviceName: `Cost`,
            amount: credentials.basicCost,
          },
          {
            serviceName: `Guest`,
            amount: credentials.basicGuest,
          },
        ],
        premium: [
          {
            serviceName: `DJ`,
            amount: credentials.premiumCost,
          },
          {
            serviceName: `Caterer`,
            amount: credentials.premiumCaterer,
          },
          {
            serviceName: `Security`,
            amount: credentials.premiumSecurity,
          },
          {
            serviceName: `Cost`,
            amount: credentials.premiumCost,
          },
          {
            serviceName: `Guest`,
            amount: credentials.premiumGuest,
          },
        ],
        standard: [
          {
            serviceName: `DJ`,
            amount: credentials.standardCost,
          },
          {
            serviceName: `Caterer`,
            amount: credentials.standardCaterer,
          },
          {
            serviceName: `Security`,
            amount: credentials.standardSecurity,
          },
          {
            serviceName: `Cost`,
            amount: credentials.standardCost,
          },
          {
            serviceName: `Guest`,
            amount: credentials.standardGuest,
          },
        ],
      };
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/providers/verification/package`,
        newData,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
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
        {queryData?.details?.role === `user` ? (
          <Link href="/dashboard">
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
        ) : (
          <Link href="/dashboard/gig/event">
            <CustomButton
              mt={2}
              bgPrimary
              smWidth="auto"
              size="small"
              type="submit"
            >
              Proceed to Create your Gig
            </CustomButton>
          </Link>
        )}
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
          basicDJ: ``,
          basicCaterer: ``,
          basicSecurity: ``,
          basicCost: ``,
          basicGuest: ``,
          standardDJ: ``,
          standardCaterer: ``,
          standardSecurity: ``,
          standardCost: ``,
          standardGuest: ``,
          premiumDJ: ``,
          premiumCaterer: ``,
          premiumSecurity: ``,
          premiumCost: ``,
          premiumGuest: ``,
        }}
        onSubmit={(values) => submitCredentials(values)}
        validationSchema={ProfileSchema}
      >
        {() => (
          <Form>
            <Box sx={{ flexGrow: 1, width: `100%` }}>
              <Description>
                <p>
                  You can upload upto 3 images of your previous events this
                  should help convince your customers faster.
                </p>
              </Description>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 5 }}
              >
                <Grid item xs={12} sm={4} md={4}>
                  <Box sx={{ my: 5, border: `solid 1px #ccc` }}>
                    <InputController>
                      <Box sx={{ mb: 2, pt: 2, px: 2 }}>
                        <Typography fontWeight="bold">Basic</Typography>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `1rem` }}>
                          DJ&apos;s
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="BasicDJ"
                            name="basicDJ"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `1rem` }}>
                          Caterer
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="basicCaterer"
                            name="basicCaterer"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `1rem` }}>
                          Security
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="basicSecurity"
                            name="basicSecurity"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `1rem` }}>
                          Your Cost
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="basicCost"
                            name="basicCost"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `0.9rem` }}>
                          Number of Guest
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="basicGuest"
                            name="basicGuest"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="500"
                          />
                        </Box>
                      </Box>
                      {/* <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: `0.9rem`, fontWeight: `bold` }}
                        >
                          Total
                        </Typography>
                        <Box
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <Typography
                            py={2}
                            sx={{ fontSize: `1rem`, textAlign: `left` }}
                          >
                            NGN 200,000
                          </Typography>
                        </Box>
                      </Box> */}
                    </InputController>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <Box sx={{ my: 5, border: `solid 1px #ccc` }}>
                    <InputController>
                      <Box sx={{ mb: 2, pt: 2, px: 2 }}>
                        <Typography fontWeight="bold">Standard</Typography>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `0.9rem` }}>
                          DJ&apos;s
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="standardDJ"
                            name="standardDJ"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `0.9rem` }}>
                          Caterer
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="standardCaterer"
                            name="standardCaterer"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `0.9rem` }}>
                          Security
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="standardSecurity"
                            name="standardSecurity"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `0.9rem` }}>
                          Your Cost
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="standardCost"
                            name="standardCost"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `0.9rem` }}>
                          Number of Guest
                        </Typography>
                        <Box
                          sx={{
                            width: `60%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="standardGuest"
                            name="standardGuest"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="500"
                          />
                        </Box>
                      </Box>
                      {/* <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: `1rem`, fontWeight: `bold` }}
                        >
                          Total
                        </Typography>
                        <Box
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <Typography
                            py={2}
                            sx={{ fontSize: `1rem`, textAlign: `left` }}
                          >
                            NGN 200,000
                          </Typography>
                        </Box>
                      </Box> */}
                    </InputController>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Box sx={{ my: 5, border: `solid 1px #ccc` }}>
                    <InputController>
                      <Box sx={{ mb: 2, pt: 2, px: 2 }}>
                        <Typography fontWeight="bold">Premium</Typography>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `1rem` }}>
                          DJ&apos;s
                        </Typography>
                        <Box
                          sx={{
                            width: `50%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="premiumDJ"
                            name="premiumDJ"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `1rem` }}>
                          Caterer
                        </Typography>
                        <Box
                          sx={{
                            width: `50%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="premiumCaterer"
                            name="premiumCaterer"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        className="packages"
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `1rem` }}>
                          Security
                        </Typography>
                        <Box
                          sx={{
                            width: `50%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="premiumSecurity"
                            name="premiumSecurity"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `1rem` }}>
                          Your Cost
                        </Typography>
                        <Box
                          sx={{
                            width: `50%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="premiumCost"
                            name="premiumCost"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="100,000"
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography sx={{ fontSize: `0.9rem` }}>
                          Number of Guest
                        </Typography>
                        <Box
                          sx={{
                            width: `50%`,
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <FormInput
                            ariaLabel="premiumGuest"
                            name="premiumGuest"
                            type="text"
                            sx={{ padding: `0.7rem` }}
                            placeholder="500"
                          />
                        </Box>
                      </Box>
                      {/* <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          padding: `0 0.8rem`,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: `1rem`, fontWeight: `bold` }}
                        >
                          Total
                        </Typography>
                        <Box
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                          }}
                        >
                          <Typography
                            py={2}
                            sx={{ fontSize: `1rem`, textAlign: `left` }}
                          >
                            NGN 200,000
                          </Typography>
                        </Box>
                      </Box> */}
                    </InputController>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box mt={3} textAlign="right">
              {/* <Link href="/dashboard/profile">
                <CustomButton
                  style={{
                    background: `#fff`,
                    border: `solid 1px ${theme.palette.primary.main}`,
                    borderRadius: `0`,
                    marginRight: `2rem`,
                    height: `2.8rem`,
                  }}
                  lgWidth="20%"
                  bgPrimary
                >
                  Back
                </CustomButton>
              </Link> */}
              <CustomButton
                bgPrimary
                lgWidth="20%"
                loading={isLoading}
                loadingText="Saving..."
                type="submit"
              >
                {isSuccess ? `SAVED ✔` : `SAVE`}
              </CustomButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Section>
  );
};

const Section = styled(`div`)(({ theme }) => ({
  marginTop: `4rem`,
  color: theme.palette.primary.main,

  '.title': {
    marginTop: `0.6rem`,
    borderBottom: `solid 0.5px #ccc`,
    paddingBottom: `0.5rem`,
    marginBottom: `0.5rem`,
  },

  '@media (max-width: 900px)': {
    marginTop: `2rem`,
  },
}));

const Flex = styled(`div`)({
  display: `flex`,
  flexDirection: `row`,
  gap: `6rem`,
  marginBottom: `2rem`,

  '@media (max-width: 900px)': {
    flexDirection: `column`,
    gap: `2rem`,
  },
});

const Description = styled(`div`)({
  marginTop: `2rem`,
  width: `70%`,

  '.subTitle': {
    marginBottom: `1rem`,
  },

  '@media (max-width: 900px)': {
    marginTop: `1rem`,
    width: `100%`,
  },
});

const InputController = styled(`div`)(({ theme }) => ({
  width: `100%`,

  '.changeBtn': {
    padding: `1rem`,
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: `none`,
    outline: `none`,
    cursor: `pointer`,
  },

  '.flex': {
    display: `grid`,
    alignItems: `center`,
    gridTemplateColumns: `1fr 1fr`,
    gap: `2rem`,
    marginBottom: `2rem`,

    '.previewAvatar': {
      width: `80px`,
      height: `80px`,
      borderRadius: `50%`,
      background: theme.palette.primary.main,
    },
    '.uploadBtn': {
      padding: `1rem 2rem`,
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      border: `none`,
      outline: `none`,
      cursor: `pointer`,
      marginTop: `0.5rem`,
      whiteSpace: `noWrap`,
    },

    '@media (max-width: 900px)': {
      flexDirection: `column`,
      gridTemplateColumns: `1fr`,
      gap: `0rem`,
      marginBottom: `1rem`,

      '.previewAvatar': {
        width: `80px`,
        height: `80px`,
        marginTop: `1rem`,
      },

      '.uploadBtn': {
        padding: `0.8rem 2rem`,
        fontSize: `0.8rem`,
      },
    },
  },

  '@media (max-width: 900px)': {
    marginTop: `1rem`,
    '.changeBtn': {
      padding: `0.7rem 1.5rem`,
      border: `none`,
    },
  },
}));

const PasswordControl = styled(`div`)(({ theme }) => ({
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

const FormFooter = styled(`div`)(({ theme }) => ({
  display: `flex`,
  alignContent: `center`,
  justifyContent: `right`,
  gap: `6rem`,
  marginBottom: `2rem`,

  '.flex': {
    display: `grid`,
    alignItems: `center`,
    gridTemplateColumns: `1fr 1fr`,
    gap: `2rem`,
    marginTop: `1rem`,
    width: `35%`,
  },

  '@media (max-width: 900px)': {
    flexDirection: `column`,
    '.flex': {
      width: `100%`,
    },
  },
}));

export default PricingEventForm;
