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
  setIntroFour,
  setIntroOne,
  setIntroThree,
} from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import useFetch from '@/hooks/useFetch';
import SelectState from '../common/SelectState';
import { toast } from 'react-toastify';
import { uploadFileToS3 } from '@/utils/uploadFile';

const currentDate = new Date();
const eighteenYearsAgo = new Date(
  currentDate.getFullYear() - 18,
  currentDate.getMonth(),
  currentDate.getDate(),
);

interface PropsTypes {
  token: string;
}
const ProfileSettings = ({ token }: PropsTypes) => {
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<any>();
  const dispatch = useDispatch();
  const { stepThree } = useSelector((state: RootState) => state.onboarding);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { queryData } = useFetch(`/profiles/${userInfo}`, token);

  const handleFormSubmit = async (credentials: any) => {
    try {
      setIsLoading(true);
      let pictureUrl;
      // Check if the picture is a file object or URL
      if (
        typeof credentials.picture === `object` &&
        credentials.picture instanceof File
      ) {
        const uploadedPicture = await uploadFileToS3(
          `pictures`,
          credentials.picture,
        );
        pictureUrl = uploadedPicture.Location; // Assuming uploadFileToS3 returns the S3 URL in the Location field
      } else {
        pictureUrl = queryData?.provider.profile?.picture; // Use the existing URL
      }
      const resData = {
        firstName: credentials.firstName.trim(),
        lastName: credentials.lastName.trim(),
        picture: pictureUrl,
        gender: credentials.gender,
        state: credentials.state,
        city: credentials.city,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/personal`,
        resData,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        dispatch(setIntroThree(false));
        dispatch(setIntroFour(true));
        toast.success(`Details uploaded successfully`);
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

  // Form Input Schema
  const ProfileSchema = Yup.object().shape({
    state: Yup.string().required(`State is required`),
    firstName: Yup.string().required(`First Name is required`),
    lastName: Yup.string().required(`Last Name is required`),
    city: Yup.string().required(`City is required`),
    gender: Yup.string().required(`Gender is required`),
    dob: Yup.date()
      .max(eighteenYearsAgo, `You must be at least 18 years old.`)
      .required(`Date of birth is required`),
  });

  return (
    <Box>
      {stepThree && (
        <Box sx={{ display: `flex`, height: `100%` }}>
          <Box
            sx={{
              width: `100%`,
              height: `100vh`,
              backgroundColor: `secondary.light`,
            }}
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
                  ></Box>
                  <Box>
                    <Typography color="primary.main" fontWeight={800}>
                      Step 3 of 6
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
                    fontSize: [
                      `1.4rem`,
                      `1.5rem`,
                      `1.5rem`,
                      `1.5rem`,
                      `1.5rem`,
                    ],
                    mb: 4,
                  }}
                >
                  {`Let's Get To Know You`}
                </Typography>
                <Formik
                  initialValues={{
                    firstName: queryData?.provider.profile?.firstName
                      ? queryData?.provider.profile?.firstName
                      : ``,
                    lastName: queryData?.provider.profile?.lastName
                      ? queryData?.provider.profile?.lastName
                      : ``,
                    picture: queryData?.provider.profile?.picture
                      ? queryData?.provider.profile?.picture
                      : ``,
                    state: ``,
                    city: ``,
                    gender: ``,
                    dob: ``,
                  }}
                  onSubmit={(values) => {
                    handleFormSubmit(values);
                  }}
                  validationSchema={ProfileSchema}
                >
                  {({ setFieldValue, values }) => (
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
                                  src={values.picture}
                                  alt="profileImg"
                                  height={80}
                                  width={80}
                                  style={{ borderRadius: `50%` }}
                                />
                              </Box>
                            )}
                          </Box>
                          <small
                            style={{ fontSize: `13px` }}
                          >{`upload a profile picture`}</small>
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
                            ariaLabel="First Name"
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
                            md: `1fr 1fr`,
                            lg: `1fr 1fr`,
                            xl: `1fr 1fr`,
                          },
                          gap: `1rem`,
                          mb: 2,
                        }}
                      >
                        <Box>
                          <CustomFormInput
                            ariaLabel="Date Of Birth"
                            name="dob"
                            type="date"
                            placeholder="Date of Birth"
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
                          </FormInput>
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

interface CustomFormInputProps {
  ariaLabel: string;
  name: string;
  placeholder: string;
  type?: string; // Optional prop for input type
}

const CustomFormInput: React.FC<CustomFormInputProps> = ({
  ariaLabel,
  name,
  placeholder,
  type = `text`,
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div onFocus={() => setInputType(`date`)}>
      <FormInput
        aria-label={ariaLabel}
        name={name}
        type={inputType}
        placeholder={placeholder}
      />
    </div>
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
