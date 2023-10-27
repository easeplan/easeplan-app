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
import { useState } from 'react';
import useFetch from '@/hooks/useFetch';
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

const CompanySchema = Yup.object().shape({
  rc_number: Yup.string().required(`CAC number is required`),
  company_name: Yup.string().required(`Company name is required`),
  isRegistered: Yup.string().required(`This field is required`),
});

const VerifyRegistration = ({ token }: PropsTypes) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { stepOne, stepTwo } = useSelector(
    (state: RootState) => state.onboarding,
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData } = useFetch(`/profiles/${userInfo}`, token);
  const queryClient = useQueryClient();

  const { mutate: verifyCompany, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.post(`/onboarding/company/verify_company`, credentials, {
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

  const handleCompanyVerify = async (credentials: any) => {
    const data = {
      rc_number: credentials.rc_number,
      company_name: credentials.company_name,
    };
    verifyCompany(data);
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
                  Is your business registered?
                </Typography>

                <Box sx={{ borderTop: `solid 1px #ccc` }}>
                  <Formik
                    initialValues={{
                      isRegistered: ``, // Add this initial value
                      cac_number: ``,
                    }}
                    validationSchema={(values) => {
                      if (values.isRegistered === `yes`) {
                        return CompanySchema;
                      }
                      return {}; // or any default schema
                    }}
                    onSubmit={(values) => {
                      if (values.isRegistered === `yes`) {
                        handleCompanyVerify(values);
                      } else {
                        console.log(values);
                        handleNextSlide();
                      }
                    }}
                  >
                    {(
                      { values }, // Destructure `values` from Formik render props
                    ) => (
                      <Form>
                        <Box sx={{ flexGrow: 1, width: `100%` }}>
                          <Box>
                            <Description>
                              <Typography
                                variant="h6"
                                color="primary.main"
                                mb={2}
                              >
                                Is your business registered?
                              </Typography>
                            </Description>
                          </Box>
                          <Box>
                            <Field name="isRegistered">
                              {({ field }: any) => (
                                <Field name="isRegistered">
                                  {({ field, meta }: any) => (
                                    <FormControl component="fieldset">
                                      <RadioGroup {...field} row>
                                        <FormControlLabel
                                          value="yes"
                                          control={<Radio />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="no"
                                          control={<Radio />}
                                          label="No"
                                        />
                                      </RadioGroup>
                                      {meta.touched && meta.error && (
                                        <div style={{ color: `red` }}>
                                          {meta.error}
                                        </div>
                                      )}
                                    </FormControl>
                                  )}
                                </Field>
                              )}
                            </Field>
                          </Box>

                          {values.isRegistered === `yes` && (
                            // Show this block only if the value of isRegistered is "yes"
                            <Box>
                              <Description>
                                <Typography
                                  variant="h6"
                                  color="primary.main"
                                  mb={2}
                                >
                                  Enter your business registration number
                                </Typography>
                              </Description>
                              <InputController>
                                <Box sx={{ pt: 2 }}>
                                  <Label text="Company Registration Name" />
                                  <FormInput
                                    ariaLabel="company_name"
                                    name="company_name"
                                    type="text"
                                    placeholder="Company Registration Name"
                                  />
                                </Box>
                              </InputController>
                              <InputController>
                                <Box sx={{ pt: 2 }}>
                                  <Label text="CAC Registration Number" />
                                  <FormInput
                                    ariaLabel="rc_number"
                                    name="rc_number"
                                    type="number"
                                    placeholder="CAC Registration Number"
                                  />
                                </Box>
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

export default VerifyRegistration;

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
