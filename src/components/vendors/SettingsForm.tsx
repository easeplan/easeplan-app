import React, { useEffect } from 'react';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import Label from '../common/Label';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import customFetch from '@/utils/customFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import CustomButton from '../common/CustomButton';
import AvatarImg from '@/public/avatar.png';
import Input from '../common/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Divider from '../common/Divider';
import SelectState from '../common/SelectState';
import data from '@/lib/states.json';
import { uploadFileToS3 } from '@/utils/uploadFile';
import axios from 'axios';
import { useRouter } from 'next/router';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '@/styles/theme';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  picture: Yup.mixed()
    .required('Image is required')
    .test('type', 'We only support jpeg', function (value: any) {
      return (
        (value && value[0] && value[0].type === 'image/jpeg') ||
        'image/png' ||
        'image/jpg'
      );
    }),
  password: Yup.string(),
  confirmPassword: Yup.string(),
  gender: Yup.string().required('Gender is required'),
});

const OTPSchema = Yup.object().shape({
  otp: Yup.number().required('OTP required'),
});
interface Props {
  token: string;
  queryData: any;
  fromProfile?: boolean;
  handleClose?: any;
  setModal?: any;
}

const SettingsForm = ({
  token,
  queryData,
  fromProfile = false,
  handleClose,
  setModal,
}: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfrimPassword] = useState(false);
  const [selectedState, setSelectedState] = useState<any>();
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [fileName, setFileName] = useState<any>(null);
  const [previewImg, setPreviewImg] = useState<any>(
    queryData?.provider?.profile?.picture
      ? queryData?.provider?.profile?.picture
      : null,
  );
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const router = useRouter();

  const [hasPhoneNumber, setHasPhoneNumber] = useState(false);
  const queryClient = useQueryClient();
  const [resendCountDown, setResendCountDown] = useState<any>();
  const [countDown, setCountDown] = useState<any>();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);
  const [isTokenSent, setIsTokenSent] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [userCredentials, setCredentials] = useState<object>({});

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.post(
        'onboarding/company/phone_verify_request',
        { phone_number: credentials.phoneNumber },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('OTP sent to your number!');
      setHasPhoneNumber(true);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  const submitCredentials = async (credentials: any) => {
    const { Location } = await uploadFileToS3('images', credentials.picture);
    setPhoneNumber(credentials.phoneNumber);
    const resData = {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      picture: Location,
      state: credentials.state,
      city: credentials.city,
      gender: credentials.gender,
      phoneNumber: credentials.phoneNumber,
      confirmPassword: '',
    };
    setCredentials(resData);
    updateProfile(resData);
  };

  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  const sendRequest = async (
    url: string,
    data: any,
    token: string,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' = 'post',
  ) => {
    return apiClient[method](url, data, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  };

  const verifyNumber = async (credentials: any) => {
    try {
      setIsLoadingOTP(true);

      const otpVerificationResult = await sendRequest(
        '/onboarding/company/verify_otp',
        credentials,
        token,
      );
      if (otpVerificationResult.data.status !== 'success') {
        toast.error('OTP verification failed.');
        return;
      }

      const userUpdateResult = await sendRequest(
        '/users/update',
        userCredentials,
        token,
        'put',
      );
      if (userUpdateResult.data.status !== 'success') {
        toast.error(
          fromProfile
            ? 'Failed to send offer!'
            : 'Failed to update user records.',
        );
        return;
      }

      if (fromProfile) {
        const offer = JSON.parse(localStorage.getItem('offer') || '{}');
        const offerCreationResult = await sendRequest(
          '/profiles/create-offer',
          offer,
          token,
        );

        if (offerCreationResult.data.status === 'success') {
          toast.success('Offer sent to vendor');
          router.push(`/user/events/${offerCreationResult.data.data._id}`);
          handleClose(false);
        } else {
          toast.error('Failed to create an offer.');
        }
      } else {
        toast.success('Profile Updated!');
        setHasPhoneNumber(false);
      }
    } catch (error: any) {
      setIsLoadingOTP(false);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    let count = 60;
    const interval = setInterval(function () {
      const minutes = Math.floor(count / 60);
      const seconds = count % 60;
      const timer = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      count--;
      setResendCountDown(timer);
      setCountDown(seconds);
      if (count === 0) {
        clearInterval(interval);
        setIsTokenSent(true);
      }
    }, 1000);
  }, [isResend]);

  const resendHandler = async () => {
    try {
      setIsResendLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/company/phone_verify_request`,
        { phone_number: phoneNumber },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data.status === 'success') {
        setIsResendLoading(false);
        toast.success('An OTP has been sent to verify your number');
      }
      setIsTokenSent(true);
    } catch (error: any) {
      setIsResendLoading(false);
      const { data } = error.response;
    }
  };

  return (
    <Box
      sx={{
        borderRadius: fromProfile ? '0' : '10px',
        boxShadow: fromProfile
          ? 'none'
          : '0px 1.82797px 12.0699px rgba(0, 0, 0, 0.2)',
        my: 4,
        p: fromProfile ? '0' : 4,
      }}
    >
      {!hasPhoneNumber ? (
        <Formik
          initialValues={{
            firstName: queryData?.provider?.profile?.firstName
              ? queryData?.provider?.profile?.firstName
              : '',
            lastName: queryData?.provider?.profile?.lastName
              ? queryData?.provider?.profile?.lastName
              : '',
            picture: queryData?.provider?.profile?.picture
              ? queryData?.provider?.profile?.picture
              : '',
            gender: queryData?.provider?.gender
              ? queryData?.provider?.gender
              : '',
            city: queryData?.provider?.city ? queryData?.provider?.city : '',
            state: queryData?.provider?.state ? queryData?.provider?.state : '',
            phoneNumber: queryData?.provider?.phoneNumber
              ? queryData?.provider?.phoneNumber
              : '',
            confirmPassword: '',
          }}
          onSubmit={(values) => submitCredentials(values)}
          validationSchema={fromProfile && ProfileSchema}
        >
          {({ setFieldValue }) => (
            <Form>
              <Box>
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    {previewImg === null ? (
                      <div>
                        <Image
                          src={AvatarImg}
                          alt="profileImg"
                          height={100}
                          width={100}
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
                    ) : (
                      <Box>
                        <Image
                          src={previewImg}
                          alt="profileImg"
                          height={60}
                          width={60}
                          style={{ borderRadius: '50%' }}
                        />
                      </Box>
                    )}
                  </div>
                  <div>
                    <AddButton htmlFor="picture">
                      {queryData?.provider?.profile?.picture
                        ? 'Change Photo'
                        : 'Add Photo'}
                      <Input
                        type="file"
                        setPreviewImg={setPreviewImg}
                        setFileName={setFileName}
                        name="picture"
                      />
                    </AddButton>
                  </div>
                </Box>
                <InputController>
                  <div className="flex">
                    <div>
                      <div>
                        <Label text="First Name" />
                      </div>
                      <FormInput
                        ariaLabel="FirstName"
                        name="firstName"
                        type="text"
                        placeholder="e.g John"
                      />
                    </div>
                    <div>
                      <div>
                        <Label text="Last Name" />
                      </div>
                      <FormInput
                        ariaLabel="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="e.g mark"
                      />
                    </div>
                  </div>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr',
                        md: '1fr 1fr',
                        lg: '1fr 1fr',
                        xl: '1fr 1fr',
                      },
                      gap: '1rem',
                      mb: 2,
                    }}
                  >
                    <Box>
                      <div>
                        <Label text="Select Gender" />
                      </div>
                      <FormInput
                        isSelect
                        selectPlaceholder="Gender"
                        name="gender"
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="Prefer not say">
                          Prefer not say
                        </MenuItem>
                      </FormInput>
                    </Box>
                    <Box>
                      <div>
                        <Label text="Select State" />
                      </div>
                      <SelectState
                        selectPlaceholder="Select State"
                        name="state"
                        onChange={(e: { target: { value: string } }) => {
                          const selectedState = data?.states.find(
                            (state) => state.name === e.target.value,
                          );
                          setSelectedState(selectedState);
                          setFieldValue('state', e.target.value);
                          setFieldValue('city', '');
                        }}
                      >
                        {data?.states?.map((state: any) => {
                          return (
                            <MenuItem key={state?.name} value={state.name}>
                              {state?.name}
                            </MenuItem>
                          );
                        })}
                      </SelectState>
                    </Box>
                    <Box>
                      <div>
                        <Label text="Select City" />
                      </div>
                      <FormInput
                        isSelect
                        selectPlaceholder="Select City"
                        name="city"
                      >
                        {selectedState?.cities?.map((city: any) => {
                          return (
                            <MenuItem key={city} value={city}>
                              {city}
                            </MenuItem>
                          );
                        })}
                      </FormInput>
                    </Box>
                    <Box>
                      <div>
                        <Label text="Phone number" />
                      </div>
                      <FormInput
                        ariaLabel="phoneNumber"
                        name="phoneNumber"
                        type="number"
                        placeholder="Phone number"
                      />
                    </Box>
                  </Box>

                  {!fromProfile && (
                    <div style={{ marginBottom: '10px' }}>
                      {changePassword ? (
                        <>
                          <div>
                            <div>
                              <Label text="Password" />
                            </div>
                            <PasswordControl>
                              <FormInput
                                ariaLabel="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                              />
                              <div
                                className="password"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </div>
                            </PasswordControl>
                          </div>
                          <div>
                            <div>
                              <Label text="Confirm Password" />
                            </div>
                            <PasswordControl>
                              <FormInput
                                ariaLabel="confirm password"
                                name="confirmpassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                              />
                              <div
                                className="password"
                                onClick={() =>
                                  setShowConfrimPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <FaEyeSlash />
                                ) : (
                                  <FaEye />
                                )}
                              </div>
                            </PasswordControl>
                          </div>
                        </>
                      ) : null}
                      <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize', mt: 4 }}
                        onClick={() => setChangePassword(!changePassword)}
                      >
                        {changePassword ? 'Hide Password' : 'Change Password'}
                      </Button>
                    </div>
                  )}
                </InputController>
              </Box>

              {!fromProfile && <Divider />}
              <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
                <CustomButton
                  bgPrimary
                  lgWidth="40%"
                  smWidth="40%"
                  mdWidth="40%"
                  loading={isLoading}
                  loadingText="Saving..."
                  type="submit"
                >
                  {!fromProfile ? 'SAVE' : 'CONTINUE'}
                </CustomButton>
              </Box>
            </Form>
          )}
        </Formik>
      ) : (
        <Box
          sx={{
            p: 4,
            borderRadius: fromProfile ? '0' : '10px',
            boxShadow: fromProfile
              ? 'none'
              : '0px 1.82797px 12.0699px rgba(0, 0, 0, 0.2)',
            my: 4,
            width: '100%',
          }}
        >
          <Formik
            initialValues={{
              otp: '',
            }}
            onSubmit={(values) => verifyNumber(values)}
            validationSchema={OTPSchema}
          >
            {({ setFieldValue }) => (
              <Form>
                <Box sx={{ width: '100%' }}>
                  <div>
                    <div>
                      <Label text="Enter OTP" />
                    </div>
                    <FormInput
                      ariaLabel="Enter OTP"
                      name="otp"
                      type="number"
                      placeholder=""
                    />
                  </div>
                  {hasPhoneNumber && (
                    <Typography my={1} color="primary.main" align="center">
                      {resendCountDown}
                    </Typography>
                  )}

                  <Box display="flex" justifyContent="space-between">
                    {hasPhoneNumber && isTokenSent && (
                      <button
                        onClick={resendHandler}
                        className="resendBtn"
                        type="button"
                        style={{
                          fontWeight: '800',
                          border: 'none',
                          background: 'none',
                          outline: 'none',
                          marginBottom: '1rem',
                          cursor: 'pointer',
                          color: theme.palette.secondary.main,
                          fontSize: '13px',
                        }}
                      >
                        {isResendLoading ? (
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faCircleNotch} spin />
                            <span style={{ marginLeft: '0.5rem' }}>
                              RESENDING...
                            </span>
                          </span>
                        ) : (
                          <>RESEND CODE</>
                        )}
                      </button>
                    )}
                    {hasPhoneNumber && isTokenSent && (
                      <button
                        type="button"
                        style={{
                          fontSize: '13px',
                          fontWeight: '800',
                          border: 'none',
                          background: 'none',
                          outline: 'none',
                          marginBottom: '1rem',
                          cursor: 'pointer',
                          color: theme.palette.secondary.main,
                        }}
                        onClick={() => setHasPhoneNumber(false)}
                        className="resendBtn"
                      >
                        CHANGE NUMBER
                      </button>
                    )}
                  </Box>
                  <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
                    <CustomButton
                      bgPrimary
                      lgWidth="20%"
                      smWidth="45%"
                      mdWidth="20%"
                      loading={isLoadingOTP}
                      loadingText=""
                      type="submit"
                    >
                      Verify
                    </CustomButton>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </Box>
  );
};

const AddButton = styled('label')(({ theme }) => ({
  display: 'inline-block',
  padding: '0.5rem 2rem',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'center',
  verticalAlign: 'middle',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  border: `solid 1px ${theme.palette.primary.main}`,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },

  'input[type="file"]': {
    display: 'none',
  },

  '@media (max-width: 900px)': {},
}));

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

  '.img-flex': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '2rem',

    '.previewAvatar': {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: theme.palette.primary.main,
    },
  },

  '.flex': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '2rem',

    '@media (max-width: 900px)': {
      flexDirection: 'column',
      gridTemplateColumns: '1fr',
      gap: '0rem',
      marginBottom: '1rem',

      '.previewAvatar': {
        width: '70px',
        height: '70px',
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

export default SettingsForm;
