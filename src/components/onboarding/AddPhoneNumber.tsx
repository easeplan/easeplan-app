/* eslint-disable @typescript-eslint/no-use-before-define */
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import * as Yup from 'yup';
import { headContainerAnimation } from '@/lib/motion';
import { useDispatch, useSelector } from 'react-redux';
import { setIntroTwo, setIntroThree } from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../common/FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../common/CustomButton';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/authContext';

interface PropsTypes {
  token: string;
}

const NumberSchema = Yup.object().shape({
  destination: Yup.string().required('Phone number is required'),
});

const CodeSchema = Yup.object().shape({
  code: Yup.string().required('OTP code is required'),
});

const AddPricingSection = ({ token }: PropsTypes) => {
  const dispatch = useDispatch();
  const { stepTwo } = useSelector((state: RootState) => state.onboarding);
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const [showPhoneNumber, setShowPhoneNumber] = useState(true);
  const [verificationToken, setVerificationToken] = useState('');

  const queryClient = useQueryClient();

  const { mutate: updateNumber, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.post(
        '/onboarding/company/phone_verify_request',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: ({ data }: any) => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('OTP send to your phone');
      setShowPhoneNumber(false);
      setVerificationToken('visible');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
      setVerificationToken('');
      setShowPhoneNumber(true);
    },
  });

  const { mutate: updateOTP } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.post('/onboarding/company/verify_otp', credentials, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('Phone Number verified successfully');
      handleNextSlide();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleVerifyNumber = async (credentials: any) => {
    const data = {
      phone_number: credentials.destination,
    };
    updateNumber(data);
  };

  const handleVerifyOTP = async (credentials: any) => {
    const data = {
      otp: credentials.code,
      type: 'phone_number',
      phone_number: credentials.destination,
    };
    updateOTP(data);
  };
  const handleNextSlide = () => {
    dispatch(setIntroTwo(false));
    dispatch(setIntroThree(true));
  };

  return (
    <>
      {stepTwo && (
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Box
            sx={{ width: '100%', backgroundColor: 'secondary.light' }}
            px={3}
            py={3}
            component={motion.section}
            {...headContainerAnimation}
          >
            <Box
              sx={{
                width: {
                  xs: '100%',
                  sm: '90%',
                  md: '60%',
                  lg: '50%',
                  xl: '50%',
                },
                margin: '0 auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* <Box sx={{ fontSize: `1.5rem`, fontWeight: `bold` }}>
                  <HiArrowUturnLeft onClick={handleNextSlide} />
                </Box> */}
                <Box>
                  <Typography fontWeight={800} color="primary.main">
                    Step 2 of 6
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 8,
                  py: {
                    xs: 3,
                    lg: 4,
                  },
                  px: {
                    xs: 3,
                    lg: 4,
                  },
                }}
              >
                <Typography
                  fontWeight={600}
                  variant="h4"
                  color="primary.main"
                  mb={2}
                  sx={{
                    fontSize: [
                      '1.4rem',
                      '1.5rem',
                      '1.5rem',
                      '1.5rem',
                      '1.5rem',
                    ], // This will set the sizes for xs, sm, md, lg, and xl respectively
                  }}
                >
                  {"Let's Verify Your Phone Number?"}
                </Typography>

                <Box sx={{ borderTop: 'solid 1px #ccc' }}>
                  <Formik
                    initialValues={{
                      destination: '',
                      verificationToken: '',
                    }}
                    validationSchema={
                      showPhoneNumber ? NumberSchema : CodeSchema
                    }
                    onSubmit={(values) => {
                      !showPhoneNumber && handleVerifyOTP(values);
                    }}
                  >
                    {({ values }) => (
                      <Form>
                        <Description>
                          {/* <Typography variant="h6" color="primary.main" mb={2}>
                            Verify your phone number?
                          </Typography> */}
                        </Description>
                        <Box sx={{ flexGrow: 1, width: '100%' }}>
                          {showPhoneNumber && (
                            <Box>
                              <FormInput
                                sx={{
                                  fontSize: [
                                    '1.0rem',
                                    '1.1rem',
                                    '1.2rem',
                                    '1rem',
                                    '1.1rem',
                                  ], // This will set the sizes for xs, sm, md, lg, and xl respectively
                                }}
                                ariaLabel="destination"
                                name="destination"
                                type="number"
                                placeholder="Enter Phone Number"
                              />
                            </Box>
                          )}

                          {verificationToken && ( // Show this block only if the verificationToken has a value
                            <>
                              <Box>
                                <InputController>
                                  <FormInput
                                    ariaLabel="code"
                                    name="code"
                                    type="number"
                                    placeholder="Enter Code"
                                    sx={{
                                      fontSize: [
                                        '1.0rem',
                                        '1.1rem',
                                        '1.2rem',
                                        '1rem',
                                        '1.1rem',
                                      ], // This will set the sizes for xs, sm, md, lg, and xl respectively
                                    }}
                                  />
                                </InputController>
                              </Box>

                              {!showPhoneNumber && (
                                <Typography variant="body2">
                                  <Button
                                    color="primary"
                                    onClick={() => {
                                      setShowPhoneNumber(true);
                                      setVerificationToken('');
                                    }}
                                  >
                                    Didn`t receive a code? Change number
                                  </Button>
                                </Typography>
                              )}
                            </>
                          )}

                          <Box
                            mt={4}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            {!verificationToken && (
                              <CustomButton
                                bgPrimary
                                smWidth="50%"
                                mdWidth="40%"
                                lgWidth="40%"
                                type="submit"
                                className="changeBtn"
                                loading={isLoading}
                                loadingText="Submiting..."
                                onClick={() => {
                                  if (values.destination) {
                                    handleVerifyNumber(values);
                                  }
                                }}
                              >
                                Verify
                              </CustomButton>
                            )}
                            {verificationToken && (
                              <CustomButton
                                bgPrimary
                                smWidth="50%"
                                mdWidth="40%"
                                lgWidth="40%"
                                type="submit"
                                className="changeBtn"
                                // onClick={() => {
                                //   handleVerifyOTP(values);
                                // }}
                                disabled={!verificationToken} // Disabled until the verificationToken has a value
                              >
                                {isLoading ? (
                                  <FontAwesomeIcon icon={faCircleNotch} spin />
                                ) : (
                                  'Next'
                                )}
                              </CustomButton>
                            )}
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddPricingSection;

const Description = styled('div')({
  paddingTop: '1rem',

  '.subTitle': {
    marginBottom: '1rem',
  },

  '@media (max-width: 900px)': {
    marginTop: '0rem',
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
