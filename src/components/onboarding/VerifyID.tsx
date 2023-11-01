import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Box, MenuItem, Typography } from '@mui/material';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import CustomButton from '../common/CustomButton';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIntro,
  setIntroFour,
  setIntroOne,
  setIntroThree,
} from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import { toast } from 'react-toastify';
import Dojah from 'react-dojah';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { stepThree, stepSix } = useSelector(
    (state: RootState) => state.onboarding,
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [sentID, setSentID] = useState(false);
  const [reference_id, setReferenceId] = useState(``);
  const [showDojah, setShowDojah] = useState(false);

  const handleFormSubmit = async (credentials: any) => {
    try {
      setIsLoading(true);
      const resData = {
        docType: credentials.documentType,
        docNo: credentials.docNo,
        otp: credentials.otp,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/company/verify_document`,
        resData,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        setReferenceId(data.reference_id);
        setSentID(true);
        toast.success(`An OTP was sent to your phone number`);
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

  const handleOTPVerify = async (credentials: any) => {
    try {
      setIsLoading(true);
      const resData = {
        code: credentials.otp,
        reference_id: reference_id,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/company/verify_otp`,
        resData,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        toast.success(`OTP verified successfully`);
        setShowDojah(true);
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
  const IDSchema = Yup.object().shape({
    documentType: Yup.string().required(`Document type is required`),
    docNo: Yup.string().required(`Document Id is required`),
  });

  const OTPSchema = Yup.object().shape({
    otp: Yup.string().required(`OTP is required`),
  });

  const type = `custom`;

  const config = {
    debug: true,
    widget_id: `${process.env.NEXT_PUBLIC_VERIFICATION_WIDGETID}`,
    webhook: true, //Before you set webhook to true, Ensure you are subscribed to the webhook here https://api-docs.dojah.io/docs/subscribe-to-services
  };

  /**
   *  These are the metadata options
   *  You can pass any values within the object
   */
  const metadata = {
    user_id: userInfo,
  };
  /**
   * @param {String} type
   * This method receives the type
   * The type can only be one of:
   * loading, begin, success, error, close
   * @param {String} data
   * This is the data from doja
   */
  const response = (type: string, data: string) => {
    if (type === `success`) {
      router.push(`/account/profile`);
    } else if (type === `error`) {
    } else if (type === `close`) {
    } else if (type === `begin`) {
    } else if (type === `loading`) {
    }
  };

  return (
    <Box>
      {stepSix && (
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
            {showDojah && (
              <Dojah
                response={response}
                appID={process.env.NEXT_PUBLIC_VERIFICATION_APPID}
                publicKey={process.env.NEXT_PUBLIC_VERIFICATION_PUBLICKEY}
                config={config}
                metadata={metadata}
                type={type}
              />
            )}
            <Box
              sx={{
                width: {
                  xs: `95%`,
                  sm: `95%`,
                  md: `50%`,
                  lg: `50%`,
                  xl: `60%`,
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
                    {/* <HiArrowUturnLeft onClick={handleNextSlide} /> */}
                  </Box>
                  <Box>
                    <Typography color="primary.main" fontWeight={800}>
                      Step 6 of 6
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
                  {`Let's Verify Your Identity`}
                </Typography>
                <Formik
                  initialValues={{
                    otp: ``,
                    documentType: ``,
                    docNo: ``,
                  }}
                  onSubmit={(values) => {
                    {
                      sentID
                        ? handleOTPVerify(values)
                        : handleFormSubmit(values);
                    }
                  }}
                  validationSchema={sentID ? OTPSchema : IDSchema}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      {!sentID && (
                        <>
                          <Box
                            sx={{
                              mb: 2,
                            }}
                          >
                            <Box>
                              <FormInput
                                isSelect
                                selectPlaceholder="Select Document Type"
                                name="documentType"
                              >
                                <MenuItem value="bvn">BVN</MenuItem>
                                <MenuItem value="nin">NIN</MenuItem>
                              </FormInput>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              mb: 2,
                            }}
                          >
                            <Box>
                              <FormInput
                                ariaLabel="Document Number"
                                name="docNo"
                                type="number"
                                placeholder="Document Number"
                              />
                            </Box>
                          </Box>
                        </>
                      )}
                      <Box
                        sx={{
                          mb: 2,
                        }}
                      >
                        {sentID && (
                          <Box>
                            <FormInput
                              ariaLabel="Enter OTP"
                              name="otp"
                              type="number"
                              placeholder="Enter OTP"
                            />
                          </Box>
                        )}
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
                        <CustomButton
                          bgPrimary
                          smWidth="50%"
                          mdWidth="40%"
                          lgWidth="40%"
                          type="submit"
                          className="changeBtn"
                        >
                          {sentID ? `Next` : `Verify`}
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