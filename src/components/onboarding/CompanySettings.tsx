/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import { useAuthUser } from '@/context/contextStore';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import CustomButton from '../common/CustomButton';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Input from '../common/Input';
import IllusImg from '@/public/onboarding-image/illus-1.svg';
import MenuItem from '@mui/material/MenuItem';
import TextArea from '../common/TextArea';
import logoImg from '@/public/logo.png';
import { useRouter } from 'next/router';
import services from '@/lib/services.json';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

// Form Input Schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required(`Business name is required`),
  serviceType: Yup.string().required(`Service type is required`),
  image: Yup.string().required(`Business Banner is required`),
});

interface PropsTypes {
  token: string;
}

interface FormTypes {
  companyName?: string;
  serviceType?: string;
  image?: any;
}

const CompanySettings = ({ token }: PropsTypes) => {
  const router = useRouter();
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const { setStep3, step3, setStep2 } = useAuthUser();

  const handleNextSlide = () => {
    setStep2(true);
    setStep3(false);
  };

  const handleFormSubmit = async (credentials: FormTypes) => {
    try {
      const formData = new FormData();
      formData.append(`image`, credentials.image);
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/stage_3`,
        credentials,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        router.push(`/account`);
        // setStep3(false);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  return (
    <>
      {step3 && (
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
                <Box sx={{ fontSize: `1.5rem`, fontWeight: `bold` }}>
                  <HiArrowUturnLeft onClick={handleNextSlide} />
                </Box>
                <Box>
                  <Typography fontWeight={600} color="primary.main">
                    Step 3 of 3
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
                Congratulations! Your vendor profile is almost ready.
              </Typography>
              <Typography
                component={motion.h5}
                {...headTextAnimation}
                mt={4}
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
                Company Information
              </Typography>

              {/* Form */}
              <Box mt={2} mb={10}>
                <Formik
                  initialValues={{
                    name: ``,
                    serviceType: ``,
                    image: ``,
                  }}
                  onSubmit={(values) => handleFormSubmit(values)}
                  validationSchema={ProfileSchema}
                >
                  {() => (
                    <Form>
                      <Box>
                        <FormInput
                          ariaLabel="companyName"
                          name="name"
                          type="text"
                          placeholder="Company Name"
                        />
                      </Box>
                      <Box>
                        <FormInput
                          isSelect
                          selectPlaceholder="Select Services"
                          ariaLabel="serviceType"
                          name="serviceType"
                        >
                          {services?.services.map((service) => (
                            <MenuItem key={service} value={service}>
                              {service}
                            </MenuItem>
                          ))}
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
                          <AddButton htmlFor="image">
                            <ImageOutlinedIcon className="fileIcon" /> Upload
                            Banner
                            <Input
                              type="file"
                              setPreviewImg={setPreviewImg}
                              setFileName={setFileName}
                              name="image"
                              accept="image/*"
                            />
                          </AddButton>
                          {previewImg === null ? (
                            <Box
                              sx={{
                                width: `50px`,
                                height: `50px`,
                                border: `solid 1px #ccc`,
                                borderRadius: `50%`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                              }}
                            >
                              <ImageOutlinedIcon />
                            </Box>
                          ) : (
                            <Box>
                              <Image
                                src={previewImg}
                                alt="profileImg"
                                height={50}
                                width={100}
                                style={{ borderRadius: `10px` }}
                              />
                            </Box>
                          )}
                        </Box>
                        <small>{`{ jpg, png, jpeg }`}</small>
                      </Box>
                      <Box>
                        <TextArea
                          name="description"
                          rows={4}
                          placeholder="Enter Company description"
                        />
                      </Box>
                      <Box mt={4}>
                        <CustomButton
                          type="submit"
                          lgWidth="100%"
                          bgPrimary
                          loading={isLoading}
                          // loadingText="Submiting..."
                        >
                          Proceed to dashboard
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
    </>
  );
};

const AddButton = styled(`label`)(({}) => ({
  display: `flex`,
  alignItems: `center`,
  padding: `0.8rem 2rem`,
  cursor: `pointer`,
  fontSize: `14px`,
  textAlign: `center`,
  verticalAlign: `middle`,
  color: `#333`,
  border: `solid 1px #ccc`,
  width: `50%`,
  whiteSpace: `nowrap`,
  borderRadius: `10px`,

  '.fileIcon': {
    fontSize: `1rem`,
    marginRight: `1rem`,
  },

  'input[type="file"]': {
    display: `none`,
  },

  '@media (max-width: 900px)': {
    padding: `0.6rem 1rem`,
    width: `60%`,
  },
}));

export default CompanySettings;
