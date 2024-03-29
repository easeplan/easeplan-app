import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Box, MenuItem, Typography } from '@mui/material';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import CustomButton from '../common/CustomButton';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Input from '../common/Input';
import AvatarImg from '@/public/avatar.png';
import data from '@/lib/states.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserIntro,
  setIntro,
  setIntroOne,
  setIntroThree,
} from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import TextArea from '../common/TextArea';
import MultiSelectServices from './MultiSelectServices';
import MultipleSelectState from './MultipleSelectState';
import MultipleSelectCity from './MultipleSelectCity';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import useFetch from '@/hooks/useFetch';
import SelectState from '../common/SelectState';

// Form Input Schema
const FormSchema = Yup.object().shape({
  state: Yup.string().required(`State is required`),
  firstname: Yup.string().required(`First Name is required`),
  lastname: Yup.string().required(`Last Name is required`),
  city: Yup.string().required(`City is required`),
  picture: Yup.mixed()
    .required(`Image is required`)
    .test(`fileSize`, `The file should be less than 5mb`, (value: any) => {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      if (value && value.size < maxFileSize) {
        return value && value.size < maxFileSize;
      }
      return false;
    })
    .test(`type`, `We only support jpeg`, function (value: any) {
      return (
        (value && value[0] && value[0].type === `image/jpeg`) ||
        `image/png` ||
        `image/jpg`
      );
    }),
  gender: Yup.string().required(`Gender is required`),
});

interface PropsTypes {
  token: string;
}

const ProfileSettings = ({ token }: PropsTypes) => {
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<any>();
  const dispatch = useDispatch();
  const { stepOne, userIntro } = useSelector(
    (state: RootState) => state.onboarding,
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleNextSlide = () => {
    dispatch(setIntroOne(false));
    dispatch(setIntro(true));
  };

  const { queryData } = useFetch(`/profiles/${userInfo}`, token);

  const handleFormSubmit = async (credentials: any) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append(`picture`, credentials.picture);
      formData.append(`image`, credentials.image);
      const resData = {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        picture: credentials.picture,
        gender: credentials.gender,
        state: credentials.state,
        city: credentials.city,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding`,
        resData,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        dispatch(setIntroOne(false));
        dispatch(setIntroThree(true));
        setIsLoading(false);
        if (typeof window !== `undefined`) {
          localStorage.setItem(
            `userName`,
            credentials?.firstName ? credentials?.firstName : ``,
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
        <Box sx={{ display: `flex`, height: `100%` }}>
          <Box
            sx={{ width: `100%`, backgroundColor: `secondary.light` }}
            px={3}
            pt={6}
            component={motion.section}
            {...headContainerAnimation}
          >
            <Box
              sx={{
                width: {
                  xs: `95%`,
                  sm: `95%`,
                  md: `80%`,
                  lg: `80%`,
                  xl: `80%`,
                },
                margin: `0 auto`,
              }}
            >
              {/* Form */}
              <Box
                mb={10}
                mt={5}
                sx={{
                  backgroundColor: `#fff`,
                  px: {
                    xs: 2,
                    sm: 2,
                    md: 6,
                    lg: 8,
                    xl: 8,
                  },
                  py: 4,
                  borderRadius: `6px`,
                  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                }}
              >
                <Box
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    mb: `1rem`,
                  }}
                >
                  <Box
                    color="primary.main"
                    sx={{ fontSize: `1.5rem`, fontWeight: `bold` }}
                  >
                    <HiArrowUturnLeft onClick={handleNextSlide} />
                  </Box>
                  <Box>
                    <Typography color="primary.main" fontWeight={800}>
                      Step 1 of 4
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  component={motion.h5}
                  {...headTextAnimation}
                  fontWeight={800}
                  color="primary.main"
                  textAlign="center"
                  sx={{
                    fontSize: {
                      xs: `1.2rem`,
                      sm: `1.2rem`,
                      md: `1.5rem`,
                      lg: `1.5rem`,
                      xl: `1.5rem`,
                    },
                    mb: 4,
                  }}
                >
                  Personal Profile
                </Typography>
                <Formik
                  initialValues={{
                    firstName: queryData?.profile?.firstName
                      ? queryData?.profile?.firstName
                      : ``,
                    lastName: queryData?.profile?.lastName
                      ? queryData?.profile?.lastName
                      : ``,
                    picture: queryData?.profile?.picture
                      ? queryData?.profile?.picture
                      : ``,
                    state: ``,
                    city: ``,
                    gender: ``,
                  }}
                  onSubmit={(values) => handleFormSubmit(values)}
                  //   validationSchema={FormSchema}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Box
                        sx={{
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `center`,
                          mb: 4,
                        }}
                      >
                        {/* Profile Image Input */}
                        <Box>
                          <Box
                            sx={{
                              display: `flex`,
                              alignItems: `center`,
                              justifyContent: `center`,
                              position: `relative`,
                            }}
                          >
                            <AddButton htmlFor="picture">
                              <CameraAltIcon
                                className="icon"
                                sx={{
                                  color: `primary.main`,
                                  backgroundColor: `secondary.main`,
                                  p: `0.2rem`,
                                  borderRaduis: `10px`,
                                }}
                              />
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
                                  height={80}
                                  width={80}
                                  style={{ borderRadius: `50%` }}
                                />
                              </div>
                            ) : (
                              <Box>
                                <Image
                                  src={previewImg}
                                  alt="profileImg"
                                  height={80}
                                  width={80}
                                  style={{ borderRadius: `50%` }}
                                />
                              </Box>
                            )}
                          </Box>
                          <small>{`{ jpg, png, jpeg } | max 1mb`}</small>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: `grid`,
                          gridTemplateColumns: {
                            xs: `1fr`,
                            sm: `1fr`,
                            md: `1fr 1fr`,
                            lg: `1fr 1fr`,
                            xl: `1fr 1fr`,
                          },
                          gap: `1rem`,
                          mb: 2,
                        }}
                      >
                        <Box>
                          <FormInput
                            ariaLabel="FirstName"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                        </Box>
                        <Box>
                          <FormInput
                            ariaLabel="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: `grid`,
                          gridTemplateColumns: {
                            xs: `1fr`,
                            sm: `1fr`,
                            md: `1fr 1fr 1fr`,
                            lg: `1fr 1fr 1fr`,
                            xl: `1fr 1fr 1fr`,
                          },
                          gap: `1rem`,
                          mb: 2,
                        }}
                      >
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
                            selectPlaceholder="Select State"
                            name="state"
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
                          </SelectState>
                        </Box>
                        <Box>
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
                      </Box>

                      <Box mt={5} textAlign="center">
                        <CustomButton
                          type="submit"
                          lgWidth="50%"
                          height="3rem"
                          bgPrimary
                          loading={isLoading}
                          loadingText="Submiting..."
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

const AddButton = styled(`label`)(({}) => ({
  cursor: `pointer`,
  fontSize: `14px`,
  textAlign: `center`,
  verticalAlign: `middle`,
  color: `#333`,
  width: `50%`,
  borderRadius: `10px`,
  position: `absolute`,
  bottom: `0`,
  right: `0`,

  '.icon': {
    fontSize: `2rem`,
    marginRight: `1rem`,
    borderRadius: `8px`,
  },

  'input[type="file"]': {
    display: `none`,
  },

  '@media (max-width: 900px)': {
    padding: `0.5rem 1rem`,
    width: `60%`,
  },
}));

const AddCoverButton = styled(`label`)(({}) => ({
  cursor: `pointer`,
  fontSize: `14px`,
  textAlign: `center`,
  verticalAlign: `middle`,
  color: `#333`,
  borderRadius: `50%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,

  '.fileIcon': {
    fontSize: `2rem`,
    marginRight: `1rem`,
    color: `primary.main`,
  },

  'input[type="file"]': {
    display: `none`,
  },

  '@media (max-width: 900px)': {
    padding: `0.5rem 1rem`,
    width: `60%`,
  },
}));

export default ProfileSettings;
