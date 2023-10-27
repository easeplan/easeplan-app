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
  const { stepOne } = useSelector((state: RootState) => state.onboarding);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const { queryData } = useFetch(`/profiles/${userInfo}`, token);

  const handleNextSlide = () => {
    dispatch(setIntroOne(true));
    dispatch(setIntroThree(false));
  };

  return (
    <>
      {stepOne && (
        <Box sx={{ display: `flex`, height: `100%` }}>
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
                  <Typography fontWeight={800} color="primary.main">
                    Step 2 of 3
                  </Typography>
                </Box>
              </Box>
              {/* Add Prevoius Jobs Modal */}
              <AddPreviousEventModal
                token={token}
                isOpen={isOpen}
                isClose={() => setIsOpen(false)}
              />
              <Box sx={{ mt: 8 }}>
                <PreviousJobs queryData={queryData} token={token} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddPreviousSection;