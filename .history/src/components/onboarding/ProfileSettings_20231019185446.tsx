/* eslint-disable @typescript-eslint/no-use-before-define */
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
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
import { Formik, Form } from 'formik';
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
  const { stepOne } = useSelector((state: RootState) => state.onboarding);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
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
      {stepOne && (
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
                    Step 1 of 3
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
                  What`s your service charge?
                </Typography>
                <Box sx={{ borderTop: `solid 1px #ccc` }}>
                  <Formik
                    initialValues={{
                      minimum: queryData?.budget?.minimum
                        ? queryData?.budget?.minimum
                        : ``,
                      maximum: queryData?.budget?.maximum
                        ? queryData?.budget?.maximum
                        : ``,
                    }}
                    validationSchema={VendorSchema}
                    onSubmit={(values) => handleVendorPricing(values)}
                  >
                    {() => (
                      <Form>
                        <Box sx={{ flexGrow: 1, width: `100%` }}>
                          <Box>
                            <Description>
                              <Typography
                                variant="h6"
                                color="primary.main"
                                mb={2}
                              >
                                Enter the Maximum and Minimum amount of your
                                service charge
                              </Typography>
                            </Description>
                          </Box>
                          <Box>
                            <InputController>
                              <Box sx={{ pt: 2 }}>
                                <Label text="Maximum Amount" />
                                <FormInput
                                  ariaLabel="maximum"
                                  name="maximum"
                                  type="number"
                                  placeholder="Minimum amount"
                                />
                              </Box>
                              <Box sx={{ mb: 2 }}>
                                <Label text="Minimum Amount" />
                                <FormInput
                                  ariaLabel="minimum"
                                  name="minimum"
                                  type="number"
                                  placeholder="Minimum amount"
                                />
                              </Box>
                            </InputController>
                          </Box>
                          <Box
                            mt={4}
                            sx={{
                              display: `flex`,
                              alignItems: `center`,
                              justifyContent: `space-between`,
                            }}
                          >
                            <CustomButton
                              bgPrimary
                              smWidth="50%"
                              mdWidth="40%"
                              lgWidth="40%"
                              type="submit"
                              className="changeBtn"
                            >
                              {isLoading ? (
                                <FontAwesomeIcon icon={faCircleNotch} spin />
                              ) : (
                                `Proceed`
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
