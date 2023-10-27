/* eslint-disable @typescript-eslint/no-use-before-define */
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import { headContainerAnimation } from '@/lib/motion';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setIntroTwo, setIntroThree } from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import AddPreviousEventModal from './AddPreviousEventModal';
import { useState } from 'react';
import useFetch from '@/hooks/useFetch';
import PreviousJobs from './PreviousJobs';
import AddPricingModal from './AddPricingModal';
import { Formik, Form, Field } from 'formik';
import FormInput from '../common/FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../common/CustomButton';
import Label from '../common/Label';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';

interface PropsTypes {
  token: string;
}

const NumberSchema = Yup.object().shape({
  destination: Yup.string().required(`Phone number is required`),
});

const CodeSchema = Yup.object().shape({
  code: Yup.string().required(`OTP code is required`),
});

const AddPricingSection = ({ token }: PropsTypes) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { stepTwo, stepOne } = useSelector(
    (state: RootState) => state.onboarding,
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(true);

  const { queryData } = useFetch(`/profiles/${userInfo}`, token);
  const queryClient = useQueryClient();

  const { mutate: updateNumber, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.post(`/onboarding/company/send_otp`, credentials, {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: ({data}:any) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`OTP send to your phone`);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  // const { mutate: updateOTP } = useMutation({
  //   mutationFn: (credentials: any) =>
  //     customFetch.post(`/onboarding/company/verify_otp`, credentials, {
  //       headers: {
  //         'Content-Type': `application/json`,
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
  //     toast.success(`Phone Number verified successfully`);
  //   },
  //   onError: (error: any) => {
  //     toast.error(error.response.data.message);
  //   },
  // });

  const handleVerifyNumber = async (credentials: any) => {
    console.log(credentials);
    const data = {
      destination: credentials.destination,
    };
    console.log(data)
    updateNumber(data);
  };

  // const handleVerifyOTP = async (credentials: any) => {
  //   console.log(credentials);
  //   const data = {
  //     code: credentials.code,
  //     reference_id: credentials.reference_id,
  //   };
  //   updateOTP(data);
  // };
  const handleNextSlide = () => {
    dispatch(setIntroTwo(false));
    dispatch(setIntroThree(true));
  };

  return (
    <>
      {stepTwo && (
        <Box sx={{ display: `flex`, height: `100vh` }}>
          <Box
            sx={{ width: `100%`, backgroundColor: `secondary.light` }}
            px={3}
            py={3}
            component={motion.section}
            {...headContainerAnimation}
          >
            <Box
              sx={{
                width: {
                  xs: `90%`,
                  sm: `80%`,
                  md: `60%`,
                  lg: `50%`,
                  xl: `50%`,
                },
                margin: `0 auto`,
              }}
            >
              <Box
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                }}
              >
                <Box sx={{ fontSize: `1.5rem`, fontWeight: `bold` }}>
                  <HiArrowUturnLeft onClick={handleNextSlide} />
                </Box>
                <Box>
                  <Typography fontWeight={800} color="primary.main">
                    Step 2 of 5
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
                >
                  {`Let's Verify Your Phone Number?`}
                </Typography>

                <Box sx={{ borderTop: `solid 1px #ccc` }}>
                  <Formik
                    initialValues={{
                      destination: ``,
                      verificationToken: ``,
                    }}
                    validationSchema={
                      showPhoneNumber ? NumberSchema : CodeSchema
                    }
                    onSubmit={(values) => {
                      alert(values);
                      //   showPhoneNumber
                      //     ? handleVerifyNumber(values): handleVerifyOTP(values) ;
                    }}
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        <Description>
                          <Typography variant="h6" color="primary.main" mb={2}>
                            Verify your phone number?
                          </Typography>
                        </Description>
                        <Box sx={{ flexGrow: 1, width: `100%` }}>
                          {showPhoneNumber && (
                            <Box>
                              <Label text="Enter Phone Number" />
                              <FormInput
                                ariaLabel="destination"
                                name="destination"
                                type="text"
                                placeholder="Enter Phone Number"
                              />
                            </Box>
                          )}

                          {values.verificationToken && ( // Show this block only if the verificationToken has a value
                            <>
                              <Box>
                                <InputController>
                                  <Label text="Enter Code" />
                                  <FormInput
                                    ariaLabel="code"
                                    name="code"
                                    type="number"
                                    placeholder="Enter Code"
                                  />
                                </InputController>
                              </Box>
                              {console.log(showPhoneNumber)}
                              {!showPhoneNumber && (
                                <Typography variant="body2">
                                  <Button
                                    color="primary"
                                    onClick={() => {
                                      setShowPhoneNumber(true);
                                      setFieldValue(`verificationToken`, ``);
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
                              display: `flex`,
                              alignItems: `center`,
                              justifyContent: `space-between`,
                            }}
                          >
                            {!values.verificationToken && (
                              <CustomButton
                                bgPrimary
                                smWidth="50%"
                                mdWidth="40%"
                                lgWidth="40%"
                                type="submit"
                                className="changeBtn"
                                onClick={() => {
                                  if (values.destination) {
                                    setFieldValue(
                                      `verificationToken`,
                                      `visible`,
                                    );
                                    handleVerifyNumber(values);
                                    setShowPhoneNumber(false);
                                  }
                                }}
                              >
                                Verify
                              </CustomButton>
                            )}
                            {values.verificationToken && (
                              <CustomButton
                                bgPrimary
                                smWidth="50%"
                                mdWidth="40%"
                                lgWidth="40%"
                                type="submit"
                                className="changeBtn"
                                disabled={!values.verificationToken} // Disabled until the verificationToken has a value
                              >
                                {isLoading ? (
                                  <FontAwesomeIcon icon={faCircleNotch} spin />
                                ) : (
                                  `Next`
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

const Description = styled(`div`)({
  paddingTop: `1rem`,

  '.subTitle': {
    marginBottom: `1rem`,
  },

  '@media (max-width: 900px)': {
    marginTop: `0rem`,
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
