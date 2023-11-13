import React from 'react';
import { Box, Button, MenuItem } from '@mui/material';
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

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.put('users/update', credentials, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('An OTP has been sent to verify your number');
      setHasPhoneNumber(true);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  const submitCredentials = async (credentials: any) => {
    const { Location } = await uploadFileToS3('images', credentials.picture);
    const formData = new FormData();
    formData.append('picture', credentials.picture);
    const resData = {
      firstName: queryData?.provider?.profile?.firstName
        ? queryData?.provider?.profile?.firstName
        : credentials.firstName,
      lastName: queryData?.provider?.profile?.lastName
        ? queryData?.provider?.profile?.lastName
        : credentials.lastName,
      picture: queryData?.provider?.profile?.picture
        ? queryData?.provider?.profile?.picture
        : Location,
      state: queryData?.provider?.providerProfile?.state
        ? queryData?.provider?.providerProfile?.state
        : credentials.state,
      city: queryData?.provider?.providerProfile?.city
        ? queryData?.provider?.providerProfile?.city
        : credentials.city,
      gender: credentials.gender,
      phoneNumber: credentials.phoneNumber,
      password: '',
      confirmPassword: '',
    };

    updateProfile(resData);
  };

  const verifyNumber = async (credentials: any) => {
    try {
      // Verify OTP with the server
      setIsLoadingOTP(true);
      const { data: otpVerificationResult } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/company/verify_otp`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (otpVerificationResult.status === 'success') {
        // Retrieve the 'offer' object from local storage
        const offerJson = localStorage.getItem('offer');

        // Parse the JSON string to get the 'offer' object
        const offer = JSON.parse(offerJson as unknown as string);

        // Send the 'offer' object to the server to create an offer
        const { data: offerCreationResult } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/profiles/create-offer`,
          offer,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (offerCreationResult.status === 'success') {
          toast.success('Offer sent to vendor');
          router.push(`/user/events/${offerCreationResult?.data?._id}`);
          handleClose(false);
        } else {
          // Handle an unsuccessful offer creation here
          toast.error('Failed to create an offer.');
        }
      } else {
        // Handle an unsuccessful OTP verification here
        toast.error('OTP verification failed.');
      }
    } catch (error: any) {
      setIsLoadingOTP(false);
      toast.error(error.response.data.message);
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
            gender: '',
            city: queryData?.provider?.providerProfile?.city
              ? queryData?.provider?.providerProfile?.city
              : '',
            state: queryData?.provider?.providerProfile?.state
              ? queryData?.provider?.providerProfile?.state
              : '',
            phoneNumber: queryData?.provider?.providerProfile?.phoneNumber
              ? queryData?.provider?.providerProfile?.phoneNumber
              : '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values) => submitCredentials(values)}
          validationSchema={ProfileSchema}
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
                        type="text"
                        placeholder="Phone number"
                      />
                    </Box>
                  </Box>

                  {!fromProfile && (
                    <div>
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
                  lgWidth="20%"
                  smWidth="45%"
                  mdWidth="20%"
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
