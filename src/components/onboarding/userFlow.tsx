/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  MenuItem,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Select,
} from '@mui/material';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import CustomButton from '../common/CustomButton';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Input from '../common/Input';
import AvatarImg from '@/public/avatar.png';
import logoImg from '@/public/logo.png';
import IllusImg from '@/public/onboarding-image/Feeling proud-bro.svg';
import { useRouter } from 'next/router';
import SelectState from '../common/SelectState';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import data from '@/lib/states.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIntro,
  setUserIntro,
  setIntroTwo,
} from '@/features/onboardingSlice';
import { RootState } from '@/store/store';

// Form Input Schema
const ProfileSchema = Yup.object().shape({
  state: Yup.string().required('State is required'),
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  city: Yup.string().required('City is required'),
  picture: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'The file should be less than 5mb', (value: any) => {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      if (value && value.size < maxFileSize) {
        return value && value.size < maxFileSize;
      }
      return false;
    })
    .test('type', 'We only support jpeg', function (value: any) {
      return (
        (value && value[0] && value[0].type === 'image/jpeg') ||
        'image/png' ||
        'image/jpg'
      );
    }),
  gender: Yup.string().required('Gender is required'),
});

interface PropsTypes {
  token: string;
}

interface FormTypes {
  state?: string;
  firstname?: string | undefined;
  lastname?: string;
  city?: string;
  picture?: any;
  gender?: string;
}

const UserFlow = ({ token }: PropsTypes) => {
  const router = useRouter();
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<any>();
  const dispatch = useDispatch();
  const { userIntro } = useSelector((state: RootState) => state.onboarding);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleNextSlide = () => {
    dispatch(setUserIntro(false));
    dispatch(setIntro(true));
  };

  const handleFormSubmit = async (credentials: FormTypes) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('picture', credentials.picture);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding`,
        {
          state: credentials.state,
          firstName: credentials.firstname,
          lastName: credentials.lastname,
          city: credentials.city,
          picture: credentials.picture,
          gender: credentials?.gender,
          role: userInfo,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.status === 'success') {
        if (userInfo === 'user') {
          dispatch(setUserIntro(false));
          router.push('/account');
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'userName',
            credentials?.firstname ? credentials?.firstname : '',
          );
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {userIntro && (
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Box
            sx={{
              p: '2rem',
              backgroundColor: 'primary.main',
              width: '45%',
              height: '100vh',
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                lg: 'flex',
                xl: 'flex',
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
              }}
            >
              <Box
                component={motion.div}
                {...headTextAnimation}
                sx={{
                  position: 'relative',
                }}
              >
                <Image src={logoImg} alt="logoImage" height={30} width={150} />
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  mt: '8rem',
                }}
              >
                <Image src={IllusImg} alt="logoImage" fill />
              </Box>
            </Box>
          </Box>
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
                  xs: '90%',
                  sm: '80%',
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
                <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  <HiArrowUturnLeft onClick={handleNextSlide} />
                </Box>
              </Box>
              <Typography
                component={motion.h5}
                {...headTextAnimation}
                mt={4}
                fontWeight={800}
                variant="h5"
                color="primary.main"
              >
                Create Your Profile
              </Typography>

              {/* Form */}
              <Box mt={2} mb={10}>
                <Formik
                  initialValues={{
                    state: '',
                    firstname: '',
                    lastname: '',
                    city: '',
                    picture: '',
                    gender: '',
                  }}
                  onSubmit={(values) => handleFormSubmit(values)}
                  validationSchema={ProfileSchema}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <Box>
                        <FormInput
                          ariaLabel="FirstName"
                          name="firstname"
                          type="text"
                          placeholder="First Name"
                        />
                      </Box>
                      <Box>
                        <FormInput
                          ariaLabel="Last Name"
                          name="lastname"
                          type="text"
                          placeholder="Last Name"
                        />
                      </Box>
                      <Box>
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
                        <SelectState
                          selectPlaceholder="Select Your State"
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
                        {/* <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Age
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(e: { target: { value: string } }) => {
                              const selectedState = data?.states.find(
                                (state) => state.name === e.target.value,
                              );
                              setSelectedState(selectedState);
                              setFieldValue(`state`, e.target.value);
                              setFieldValue(`city`, ``);
                            }}
                          >
                            {data?.states?.map((state: any) => {
                              return (
                                <MenuItem key={state?.name} value={state.name}>
                                  {state?.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl> */}
                      </Box>
                      {selectedState?.cities && (
                        <Box>
                          <FormInput
                            isSelect
                            selectPlaceholder="Select  Your City"
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
                      )}
                      <Box mb={3}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <AddButton htmlFor="picture">
                            <ImageOutlinedIcon className="icon" /> ADD PHOTO
                            <Input
                              type="file"
                              setPreviewImg={setPreviewImg}
                              setFileName={setFileName}
                              name="picture"
                              accept="image/*"
                            />
                          </AddButton>
                          {previewImg === null ? (
                            <div>
                              <Image
                                src={AvatarImg}
                                alt="profileImg"
                                height={50}
                                width={50}
                                style={{ borderRadius: '50%' }}
                              />
                            </div>
                          ) : (
                            <Box>
                              <Image
                                src={previewImg}
                                alt="profileImg"
                                height={50}
                                width={50}
                                style={{ borderRadius: '50%' }}
                              />
                            </Box>
                          )}
                        </Box>
                        <small>
                          {
                            '{ jpg, png, jpeg } | The file should be less than 1mb'
                          }
                        </small>
                      </Box>
                      <Box mt={5}>
                        <CustomButton
                          type="submit"
                          lgWidth="100%"
                          bgPrimary
                          loading={isLoading}
                          // loadingText="Submiting..."
                        >
                          Next
                        </CustomButton>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const AddButton = styled('label')(({}) => ({
  padding: '0.8rem 2rem',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'center',
  verticalAlign: 'middle',
  color: '#333',
  border: 'solid 1px #ccc',
  width: '50%',
  borderRadius: '10px',

  '.icon': {
    fontSize: '1rem',
    marginRight: '1rem',
  },

  'input[type="file"]': {
    display: 'none',
  },

  '@media (max-width: 900px)': {
    padding: '0.5rem 1rem',
    width: '60%',
  },
}));

export default UserFlow;
