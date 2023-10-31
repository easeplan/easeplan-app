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
import { useState } from 'react';
import useFetch from '@/hooks/useFetch';
import PreviousJobs from './PreviousJobs';

interface PropsTypes {
  token: string;
}

const AddPreviousSection = ({ token }: PropsTypes) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { stepSix } = useSelector((state: RootState) => state.onboarding);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const { queryData } = useFetch(`/profiles/${userInfo}`, token);

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
              <Button variant="contained" disabled>
                
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
  
};

export default AddPreviousSection;
