// /* eslint-disable @typescript-eslint/no-use-before-define */
// import { motion } from 'framer-motion';
// import { Box, Button, Typography } from '@mui/material';
// import { headContainerAnimation } from '@/lib/motion';
// import { HiArrowUturnLeft } from 'react-icons/hi2';
// import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setIntroThree,
//   setIntroOne,
//   setIntroTwo,
// } from '@/features/onboardingSlice';
// import { RootState } from '@/store/store';
// import AddPreviousEventModal from './AddPreviousEventModal';
// import useFetch from '@/hooks/useFetch';
// import PreviousJobs from './PreviousJobs';
// import React, { useState } from 'react';
// import Dojah from 'react-dojah';
// import { RootState } from '@/store/store';

// interface PropsTypes {
//   token: string;
// }

// const VerifyID = ({ token }: PropsTypes) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { stepSix } = useSelector((state: RootState) => state.onboarding);
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const [isOpen, setIsOpen] = useState(false);
//   const { queryData } = useFetch(`/profiles/${userInfo}`, token);
//   const [showDojah, setShowDojah] = useState(false);

// //   const { userInfo } = useSelector((state: RootState) => state.auth);

//   const type = `custom`;

//   const config = {
//     debug: true,
//     widget_id: `${process.env.NEXT_PUBLIC_VERIFICATION_WIDGETID}`,
//     webhook: true, //Before you set webhook to true, Ensure you are subscribed to the webhook here https://api-docs.dojah.io/docs/subscribe-to-services
//   };

//   /**
//    *  These are the metadata options
//    *  You can pass any values within the object
//    */
//   const metadata = {
//     user_id: userInfo,
//   };

//   /**
//    * @param {String} type
//    * This method receives the type
//    * The type can only be one of:
//    * loading, begin, success, error, close
//    * @param {String} data
//    * This is the data from doja
//    */
//   const response = (type: string, data: string) => {
//     if (type === `success`) {
//       setIsVerified(true);
//     } else if (type === `error`) {
//     } else if (type === `close`) {
//     } else if (type === `begin`) {
//     } else if (type === `loading`) {
//     }
//   };

//   return (
//     <>
//       {stepSix && (
//         <Box sx={{ display: 'flex', height: '100%' }}>
//                   {showDojah && (
//         <Dojah
//           response={response}
//           appID={process.env.NEXT_PUBLIC_VERIFICATION_APPID}
//           publicKey={process.env.NEXT_PUBLIC_VERIFICATION_PUBLICKEY}
//           config={config}
//           metadata={metadata}
//           type={type}
//         />
//       )}
//           <Box
//             sx={{
//               width: '100%',
//               backgroundColor: 'secondary.light',
//               height: '50vh',
//             }}
//             px={3}
//             py={3}
//             component={motion.section}
//             {...headContainerAnimation}
//           >
//             <Box>
//                   <Typography fontWeight={800} color="primary.main">
//                     Step 6 of 6
//                   </Typography>
//                 </Box>
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'column',
//                 width: {
//                   xs: `90%`,
//                   sm: `80%`,
//                   md: `60%`,
//                   lg: `50%`,
//                   xl: `50%`,
//                 },
//                 height: '100%',
//                 margin: '0 auto',
//               }}
//             >
//               <Box
//                 sx={{
//                   display: `flex`,
//                   alignItems: `center`,
//                   justifyContent: `space-between`,
//                   marginBottom: '1rem', // adds a small space between the text and button
//                 }}
//               >
//          <Button
//         variant="contained"
//         onClick={() => setShowDojah(true)}
//       ></Button>
//               </Box>

//             </Box>
//           </Box>
//         </Box>
//       )}
//     </>
//   );

// };

// export default VerifyID;

// // const VerifiactionFlow = ({ setIsVerified }: any) => {
// //   const { userInfo } = useSelector((state: RootState) => state.auth);

// //   const type = `custom`;

// //   const config = {
// //     debug: true,
// //     widget_id: `${process.env.NEXT_PUBLIC_VERIFICATION_WIDGETID}`,
// //     webhook: true, //Before you set webhook to true, Ensure you are subscribed to the webhook here https://api-docs.dojah.io/docs/subscribe-to-services
// //   };

// //   /**
// //    *  These are the metadata options
// //    *  You can pass any values within the object
// //    */
// //   const metadata = {
// //     user_id: userInfo,
// //   };

// //   /**
// //    * @param {String} type
// //    * This method receives the type
// //    * The type can only be one of:
// //    * loading, begin, success, error, close
// //    * @param {String} data
// //    * This is the data from doja
// //    */
// //   const response = (type: string, data: string) => {
// //     if (type === `success`) {
// //       setIsVerified(true);
// //     } else if (type === `error`) {
// //     } else if (type === `close`) {
// //     } else if (type === `begin`) {
// //     } else if (type === `loading`) {
// //     }
// //   };

// //   return (
// //     <Box sx={{ width: `40%`, margin: `0 auto` }}>
// //       <Dojah
// //         response={response}
// //         appID={process.env.NEXT_PUBLIC_VERIFICATION_APPID}
// //         publicKey={process.env.NEXT_PUBLIC_VERIFICATION_PUBLICKEY}
// //         config={config}
// //         metadata={metadata}
// //         type={type}
// //       />
// //     </Box>
// //   );
// // };

// // export default VerifiactionFlow;

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { stepThree, stepSix } = useSelector(
    (state: RootState) => state.onboarding,
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleFormSubmit = async (credentials: any) => {
    try {
      setIsLoading(true);
      const resData = {
        docType: credentials.documentType,
        docNo: credentials.docNo,
        otp: credentials.otp,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/company/verify_company`,
        resData,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
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

  const handleOTPVerify = async (credentials: any) => {
    try {
      setIsLoading(true);
      const resData = {
        code:, reference_id
        otp: credentials.otp,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onboarding/company/verify_company`,
        resData,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
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

  const [sentID, setSentID] = useState(false);
  // Form Input Schema
  const IDSchema = Yup.object().shape({
    documentType: Yup.string().required(`Document type is required`),
    docNo: Yup.string().required(`Document Id is required`),
  });

  const OTPSchema = Yup.object().shape({
    otp: Yup.string().required(`OTP is required`),
  });

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
                    console.log('sub');
                    handleFormSubmit(values);
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
                                <MenuItem value="nin">BVN</MenuItem>
                                <MenuItem value="bvn">NIN</MenuItem>
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
