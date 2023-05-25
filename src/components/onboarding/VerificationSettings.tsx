/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import CustomButton from '../common/CustomButton';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Input from '../common/Input';
import MenuItem from '@mui/material/MenuItem';
import logoImg from '@/public/logo.png';
import IllusImg from '@/public/onboarding-image/Beach wedding-bro.svg';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIntroOne,
  setIntroTwo,
  setIntroThree,
} from '@/features/onboardingSlice';
import { RootState } from '@/store/store';

// Form Input Schema
const ProfileSchema = Yup.object().shape({
  officeAddress: Yup.string().required(`Office Address is required`),
  phoneNumber: Yup.string().required(`Phone Number is required`),
  idType: Yup.string().required(`ID Type is required`),
  idDocument: Yup.mixed()
    .required(`Document is required`)
    .test(`fileSize`, `It hould be less than 5mb`, (value: any) => {
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
});

interface PropsTypes {
  token: string;
}

interface FormTypes {
  officeAddress?: string;
  phoneNumber?: string;
  idType?: string;
  idDocument?: any;
}

const VerificationSettings = ({ token }: PropsTypes) => {
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const dispatch = useDispatch();
  const { stepTwo } = useSelector((state: RootState) => state.onboarding);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleNextSlide = () => {
    dispatch(setIntroOne(true));
    dispatch(setIntroTwo(false));
  };

  const handleFormSubmit = async (credentials: FormTypes) => {
    try {
      const formData = new FormData();
      formData.append(`picture`, credentials.idDocument);
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/verify`,
        {
          business: {
            officeAddress: credentials?.officeAddress,
          },
          phoneNumber: credentials?.phoneNumber,
          identityVerify: {
            idType: credentials?.idType,
          },
          idDocument: credentials?.idDocument,
          role: userInfo?.role,
        },
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        dispatch(setIntroOne(false));
        dispatch(setIntroTwo(false));
        dispatch(setIntroThree(true));
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {stepTwo && (
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
                    Step 2 of 3
                  </Typography>
                </Box>
              </Box>
              <Typography
                component={motion.h5}
                {...headTextAnimation}
                mt={1}
                color="primary.main"
                py={1}
                px={2}
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
                Great work! You&apos;re almost there. Just one more step to set
                up your profile
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
                Verify ID
              </Typography>

              {/* Form */}
              <Box mt={2} mb={5}>
                <Formik
                  initialValues={{
                    // businessName: ``,
                    officeAddress: ``,
                    phoneNumber: ``,
                    idType: ``,
                    idDocument: ``,
                  }}
                  onSubmit={(values) => handleFormSubmit(values)}
                  validationSchema={ProfileSchema}
                >
                  {() => (
                    <Form>
                      <Box>
                        <FormInput
                          ariaLabel="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          placeholder="Phone Number"
                        />
                      </Box>
                      <Box>
                        <FormInput
                          ariaLabel="officeAddress"
                          name="officeAddress"
                          type="text"
                          placeholder="Office Address"
                        />
                      </Box>
                      <Box>
                        <FormInput
                          isSelect
                          ariaLabel="idType"
                          selectPlaceholder="Select passport"
                          name="idType"
                        >
                          <MenuItem value="International Passport">
                            International Passport
                          </MenuItem>
                          <MenuItem value="NIN">NIN</MenuItem>
                          <MenuItem value="Drivers License">
                            Drivers License
                          </MenuItem>
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
                          <AddButton htmlFor="idDocument">
                            <ImageOutlinedIcon className="fileIcon" /> Upload
                            passport
                            <Input
                              type="file"
                              setPreviewImg={setPreviewImg}
                              setFileName={setFileName}
                              name="idDocument"
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
                                width={80}
                                style={{ borderRadius: `10px` }}
                              />
                            </Box>
                          )}
                        </Box>
                        <small>{`{ jpg, png, jpeg } | The file should be less than 1mb`}</small>
                      </Box>
                      <Box mt={10}>
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
    </>
  );
};

const AddButton = styled(`label`)(({ theme }) => ({
  padding: `0.8rem 2rem`,
  cursor: `pointer`,
  fontSize: `14px`,
  textAlign: `center`,
  verticalAlign: `middle`,
  color: `#333`,
  border: `solid 1px #ccc`,
  width: `40%`,
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
    width: `65%`,
  },
}));

export default VerificationSettings;
