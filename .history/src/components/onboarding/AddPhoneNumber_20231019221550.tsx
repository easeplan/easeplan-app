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
} from '@mui/material';
import * as Yup from 'yup';
import { headContainerAnimation } from '@/lib/motion';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setIntroTwo, setIntroOne } from '@/features/onboardingSlice';
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

const VendorSchema = Yup.object().shape({
  maximum: Yup.string().required(`Maximum amount is required`),
  minimum: Yup.string().required(`Minimum amount is required`),
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

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.put(`/profiles/${userInfo}`, credentials, {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Service Price Updated`);
      router.push(`/account/profile`);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleVendorPricing = async (credentials: any) => {
    const data = {
      budget: {
        maximum: credentials.maximum,
        minimum: credentials.minimum,
      },
    };
    updateProfile(data);
  };

  const handleNextSlide = () => {
    dispatch(setIntroOne(false));
    dispatch(setIntroTwo(true));
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
                    Step 1 of 5
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
                  Let's Verify Your Phone Number?
                </Typography>

                <Box sx={{ borderTop: `solid 1px #ccc` }}>
                  <Formik
                    initialValues={{
                      phoneNumber: '',
                      verificationToken: '',
                    }}
                    validationSchema={VendorSchema}
                    onSubmit={(values) => {
                      // Handle the form submission here
                    }}
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        <Box sx={{ flexGrow: 1, width: `100%` }}>
                          showPhoneNumber ? (
                          <Box>
                            <Description>
                              <Typography
                                variant="h6"
                                color="primary.main"
                                mb={2}
                              >
                                Enter phone Number
                              </Typography>
                            </Description>
                          </Box>
                          <Box>
                            <InputController>
                              <Label text="Enter Phone Number" />
                              <FormInput
                                ariaLabel="phoneNumber"
                                name="phoneNumber"
                                type="number"
                                placeholder="Enter Phone Number"
                              />
                            </InputController>
                          </Box>

                          {values.verificationToken && ( // Show this block only if the verificationToken has a value
                            <Box>
                              <InputController>
                                <Label text="Enter Code" />
                                <FormInput
                                  ariaLabel="verificationToken"
                                  name="verificationToken"
                                  type="number"
                                  placeholder="Enter Code"
                                />
                              </InputController>
                            </Box>
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
                                type="button"
                                className="changeBtn"
                                onClick={() => {
                                  setFieldValue('verificationToken', 'visible');
                                  setShowPhoneNumber(false);
                              }}
                              >
                                Verify
                              </CustomButton>
                            )}
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
