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
  setIntroFour,
  setIntroFive
} from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import TextArea from '../common/TextArea';
import MultiSelectServices from './MultiSelectServices';
import MultipleSelectState from './MultipleSelectState';
import MultipleSelectCity from './MultipleSelectCity';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import useFetch from '@/hooks/useFetch';

// Form Input Schema
const ProfileSchema = Yup.object().shape({
  image: Yup.mixed()
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
  // operationStates: Yup.string().required(`Operations states is required`),
  // operationCities: Yup.string().required(`Operations Cities is required`),
  description: Yup.string().required(`Company description is required`),
  name: Yup.string().required(`Company name is required`),
  // services: Yup.array()
  // .of(Yup.string())
  // .min(1, 'At least one service must be selected.')
  // .required('Service is required'),
  minimum: Yup.string().required(`Minimum price is required`),
  maximum: Yup.string().required(`Maximum price is required`),
});

interface PropsTypes {
  token: string;
}

interface FormTypes {
  operationStates?: string;
  firstName?: string | undefined;
  lastName?: string;
  cities?: string;
  picture?: any;
  coverImage?: any;
  gender?: string;
  description?: string;
  name?: string;
  services?: string;
}

const BusinessSettings = ({ token }: PropsTypes) => {
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [coverPreviewImg, setCoverPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [coverImgName, setCoverImgName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [opsSelectedState, setSelectedOpsState] = useState<any>();
  const [selectedState, setSelectedState] = useState<any>();
  const [selectedCities, setSelectedCities] = useState<any>();
  const [servicesType, setServicesType] = useState<any>();
  const dispatch = useDispatch();
  const { stepFour, stepThree } = useSelector(
    (state: RootState) => state.onboarding,
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleNextSlide = () => {
    dispatch(setIntroOne(false));
    dispatch(setIntro(true));
  };

  const services = [
    `DJ`,
    `Catering`,
    `Photographer`,
    `MC`,
    `Make-up Artist`,
    `Venue manager`,
    `Event decorator`,
    `Transportation coordinator`,
    `Security personnel`,
    `Videographer`,
    `Print vendor`,
    `Ushering`,
    `Entertainer`,
  ];

  const { queryData } = useFetch(`/profiles/${userInfo}`, token);

  const allCities = data.states.reduce((cities, state) => {
    cities.push(...state.cities);
    return cities;
  }, [] as string[]) as string[];

  const handleFormSubmit = async (credentials: any) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append(`picture`, credentials.picture);
      formData.append(`image`, credentials.image);
      const resData = {
        image: credentials.image,
        company: {
          name: credentials.name,
          services: credentials.services,
          operationCities: credentials.operationCities,
          operationStates: credentials.operationStates,
          description: credentials.description,
        },
        budget: {
          minimum: credentials.minimum,
          maximum: credentials.maximum,
        },
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
        console.log(data)
        // dispatch(setIntroOne(false));
        // dispatch(setIntroThree(true));
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
      {stepFour && (
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
                  >
                    <HiArrowUturnLeft onClick={handleNextSlide} />
                  </Box>
                  <Box>
                    <Typography color="primary.main" fontWeight={800}>
                      Step 4 of 5
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
                  {`Let's Get To Know Your Business`}
                </Typography>
                <Formik
                  initialValues={{
                    operationStates: ``,
                    name: ``,
                    minimum: ``,
                    maximum: ``,
                    operationCities: ``,
                    image: ``,
                    services: ``,
                    description: ``,
                  }}
                  onSubmit={(values) => handleFormSubmit(values)}
                  validationSchema={ProfileSchema}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      {/* Business Cover later */}
                      <Box mb={3}>
                        <Box
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `center`,
                            position: `relative`,
                          }}
                        >
                          {coverPreviewImg === null ? (
                            <Box
                              sx={{
                                width: `100%`,
                                height: `100px`,
                                border: `solid 1px #ccc`,
                                borderRadius: `10px`,
                                backgroundColor: `primary.main`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                textAlign: `center`,
                              }}
                            >
                              <AddCoverButton htmlFor="image">
                                <Box
                                  sx={{
                                    width: `3rem`,
                                    height: `3rem`,
                                    borderRadius: `50%`,
                                    backgroundColor: `#fff`,
                                    display: `flex`,
                                    alignItems: `center`,
                                    justifyContent: `center`,
                                    boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                                  }}
                                >
                                  <CameraAltIcon
                                    sx={{
                                      fontSize: `2rem`,
                                      color: `primary.main`,
                                    }}
                                  />
                                </Box>
                                <Input
                                  type="file"
                                  setPreviewImg={setCoverPreviewImg}
                                  setFileName={setCoverImgName}
                                  name="image"
                                  accept="image/*"
                                />
                              </AddCoverButton>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                width: `100%`,
                                height: `100px`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                position: `relative`,
                              }}
                            >
                              <Image
                                src={coverPreviewImg}
                                alt="profileImg"
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{
                                  height: `100%`,
                                  borderRadius: `10px`,
                                  objectFit: `cover`,
                                }}
                              />
                              <Box sx={{ zIndex: 9 }}>
                                <AddCoverButton htmlFor="image">
                                  <Box
                                    sx={{
                                      borderRadius: `30px`,
                                      backgroundColor: `#fff`,
                                      display: `flex`,
                                      alignItems: `center`,
                                      padding: `10px`,
                                      justifyContent: `center`,
                                      boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                                    }}
                                  >
                                    <CameraAltIcon
                                      sx={{
                                        fontSize: `2rem`,
                                        color: `primary.main`,
                                      }}
                                    />
                                  </Box>
                                  <Input
                                    type="file"
                                    setPreviewImg={setCoverPreviewImg}
                                    setFileName={setCoverImgName}
                                    name="image"
                                    accept="image/*"
                                  />
                                </AddCoverButton>
                              </Box>
                            </Box>
                          )}
                        </Box>
                        <small>{`{ jpg, png, jpeg } | The file should be less than 1mb`}</small>
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
                            ariaLabel="companyName"
                            name="name"
                            type="text"
                            placeholder="Company Name"
                          />
                        </Box>
                        <Box>
                          <MultiSelectServices
                            setServices={setServicesType}
                            name="services"
                            label="Select Services You Offer"
                            services={services}
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
                          <MultipleSelectState
                            name="operationStates"
                            setServices={setSelectedOpsState}
                            states={data?.states}
                          />
                        </Box>
                        <Box>
                          <MultipleSelectCity
                            name="operationCities"
                            setServices={setSelectedCities}
                            cities={allCities}
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
                          <FormInput
                            ariaLabel="Minimum Charge"
                            name="minimum"
                            type="text"
                            placeholder="Enter Your Starting Price"
                          />
                        </Box>
                        <Box>
                          <FormInput
                            ariaLabel="Maximum Charge"
                            name="maximum"
                            type="text"
                            placeholder="Enter Your Maximum Price"
                          />
                        </Box>
                      </Box>

                      <Box>
                        <TextArea
                          name="description"
                          rows={4}
                          placeholder="Enter Company description"
                        />
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

export default BusinessSettings;
