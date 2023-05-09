import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, MenuItem, Typography } from '@mui/material';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import { useAuthUser } from '@/context/contextStore';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import CustomButton from '../common/CustomButton';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Input from '../common/Input';
import AvatarImg from '@/public/avatar.png';
import logoImg from '@/public/logo.png';
import IllusImg from '@/public/onboarding-image/Feeling proud-bro.svg';
import data from '@/lib/states.json';
import SelectState from '../common/SelectState';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

// Form Input Schema
const ProfileSchema = Yup.object().shape({
  state: Yup.string().required(`State is required`),
  firstname: Yup.string().required(`First Name is required`),
  lastname: Yup.string().required(`Last Name is required`),
  city: Yup.string().required(`City is required`),
  picture: Yup.string().required(`Profile Photo is required`),
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
}

const ProfileSettings = ({ token }: PropsTypes) => {
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setIntro, step1, setStep1, setStep2 } = useAuthUser();
  const [selectedState, setSelectedState] = useState<any>();

  const handleNextSlide = () => {
    setStep1(false);
    setIntro(true);
  };

  const handleFormSubmit = async (credentials: FormTypes) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append(`picture`, credentials.picture);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/stage_1`,
        {
          state: credentials.state,
          firstname: credentials.firstname,
          lastname: credentials.lastname,
          city: credentials.city,
          picture: credentials.picture,
        },
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.status === `success`) {
        setStep1(false);
        setStep2(true);
        setIsLoading(false);
        if (typeof window !== `undefined`) {
          localStorage.setItem(
            `userName`,
            credentials?.firstname ? credentials?.firstname : ``,
          );
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {step1 && (
        <Box sx={{ display: `flex`, height: `100vh` }}>
          <Box
            sx={{
              p: `2rem`,
              backgroundColor: `primary.main`,
              width: `45%`,
              height: `100vh`,
              display: {
                xs: `none`,
                sm: `none`,
                md: `none`,
                lg: `flex`,
                xl: `flex`,
              },
            }}
          >
            <Box
              sx={{
                width: `100%`,
              }}
            >
              <Box
                component={motion.div}
                {...headTextAnimation}
                sx={{
                  position: `relative`,
                }}
              >
                <Image src={logoImg} alt="logoImage" height={30} width={150} />
              </Box>
              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `400px`,
                  mt: `8rem`,
                }}
              >
                <Image src={IllusImg} alt="logoImage" fill />
              </Box>
            </Box>
          </Box>
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
                <Box
                  color="primary.main"
                  sx={{ fontSize: `1.5rem`, fontWeight: `bold` }}
                >
                  <HiArrowUturnLeft onClick={handleNextSlide} />
                </Box>
                <Box>
                  <Typography color="primary.main" fontWeight={600}>
                    Step 1 of 3
                  </Typography>
                </Box>
              </Box>
              <Typography
                component={motion.h5}
                {...headTextAnimation}
                mt={1}
                color="primary.main"
                py={1}
                pl={2}
                sx={{
                  backgroundColor: `#fff`,
                  fontSize: {
                    xs: `0.8rem`,
                    sm: `0.8rem`,
                    md: `1rem`,
                    lg: `1rem`,
                    xl: `1rem`,
                  },
                  borderRadius: `10px`,
                  // boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                }}
              >
                Let&apos;s get you started in 3 quick and easy steps
              </Typography>
              <Typography
                component={motion.h5}
                {...headTextAnimation}
                mt={2}
                fontWeight={800}
                color="primary.main"
                sx={{
                  fontSize: {
                    xs: `1.3rem`,
                    sm: `1.3rem`,
                    md: `1.8rem`,
                    lg: `2rem`,
                    xl: `2rem`,
                  },
                }}
              >
                Create Your Vendor Profile
              </Typography>

              {/* Form */}
              <Box mt={1} mb={10}>
                <Formik
                  initialValues={{
                    state: ``,
                    firstname: ``,
                    lastname: ``,
                    city: ``,
                    picture: ``,
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
                      <Box mb={3}>
                        <Box
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `space-between`,
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
                                style={{ borderRadius: `50%` }}
                              />
                            </div>
                          ) : (
                            <Box>
                              <Image
                                src={previewImg}
                                alt="profileImg"
                                height={50}
                                width={50}
                                style={{ borderRadius: `50%` }}
                              />
                            </Box>
                          )}
                        </Box>
                        <small>{`{ jpg, png, jpeg }`}</small>
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

const AddButton = styled(`label`)(({ theme }) => ({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  padding: `0.8rem 2rem`,
  cursor: `pointer`,
  fontSize: `14px`,
  textAlign: `center`,
  verticalAlign: `middle`,
  color: `#333`,
  border: `solid 1px #ccc`,
  width: `50%`,
  borderRadius: `10px`,

  '.icon': {
    fontSize: `1rem`,
    marginRight: `1rem`,
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
