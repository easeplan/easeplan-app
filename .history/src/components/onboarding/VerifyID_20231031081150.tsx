/* eslint-disable @typescript-eslint/no-use-before-define */
import { motion } from 'framer-motion';
import { Box, Button, Typography } from '@mui/material';
import { headContainerAnimation } from '@/lib/motion';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIntroThree,
  setIntroOne,
  setIntroTwo,
} from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import AddPreviousEventModal from './AddPreviousEventModal';
import useFetch from '@/hooks/useFetch';
import PreviousJobs from './PreviousJobs';
import React, { useState } from 'react';
import Dojah from 'react-dojah';
import { RootState } from '@/store/store';



interface PropsTypes {
  token: string;
}

const VerifyID = ({ token }: PropsTypes) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { stepSix } = useSelector((state: RootState) => state.onboarding);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const { queryData } = useFetch(`/profiles/${userInfo}`, token);

//   const { userInfo } = useSelector((state: RootState) => state.auth);

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
      setIsVerified(true);
    } else if (type === `error`) {
    } else if (type === `close`) {
    } else if (type === `begin`) {
    } else if (type === `loading`) {
    }
  };


  return (
    <>
      {stepSix && (
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box
            sx={{
              width: '100%',
              backgroundColor: 'secondary.light',
              height: '50vh',
            }}
            px={3}
            py={3}
            component={motion.section}
            {...headContainerAnimation}
          >
            <Box>
                  <Typography fontWeight={800} color="primary.main">
                    Step 6 of 6
                  </Typography>
                </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                flexDirection: 'column',
                width: {
                  xs: `90%`,
                  sm: `80%`,
                  md: `60%`,
                  lg: `50%`,
                  xl: `50%`,
                },
                height: '100%',
                margin: '0 auto',
              }}
            >
              <Box
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                  marginBottom: '1rem', // adds a small space between the text and button
                }}
              >
        
              </Box>
              <Dojah
        response={response}
        appID={process.env.NEXT_PUBLIC_VERIFICATION_APPID}
        publicKey={process.env.NEXT_PUBLIC_VERIFICATION_PUBLICKEY}
        config={config}
        metadata={metadata}
        type={type}
      />
              <Button variant="contained">
                Verify ID
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
  
};

export default VerifyID;


// const VerifiactionFlow = ({ setIsVerified }: any) => {
//   const { userInfo } = useSelector((state: RootState) => state.auth);

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
//     <Box sx={{ width: `40%`, margin: `0 auto` }}>
//       <Dojah
//         response={response}
//         appID={process.env.NEXT_PUBLIC_VERIFICATION_APPID}
//         publicKey={process.env.NEXT_PUBLIC_VERIFICATION_PUBLICKEY}
//         config={config}
//         metadata={metadata}
//         type={type}
//       />
//     </Box>
//   );
// };

// export default VerifiactionFlow;

