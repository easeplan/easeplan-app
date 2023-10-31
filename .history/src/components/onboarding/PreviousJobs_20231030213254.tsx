import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import AddPreviousEventModal from './AddPreviousEventModal';
import { setIntroThree, setIntroFour } from '@/features/onboardingSlice';
import { useDispatch } from 'react-redux';

const PreviousJobs = ({ queryData, token }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleNextSlide = () => {
    dispatch(setIntroFive(true));
    dispatch(setIntroSix(false));
  };

  return (
    <>
      <AddPreviousEventModal
        token={token}
        isOpen={isOpen}
        isClose={() => setIsOpen(false)}
      />
      <Box mt={5} mb={20}>
        <Box
          sx={{
            display: `flex`,
            // alignItems: `center`,
            justifyContent: `space-between`,
          }}
        >
          <div>
            <Typography
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: `1.2rem`,
                  sm: `1.2rem`,
                  md: `1.5rem`,
                  lg: `1.5rem`,
                },
              }}
              color="primary.main"
            >
              Previous Events
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: `1rem`,
                  sm: `1rem`,
                  md: `1rem`,
                  lg: `1rem`,
                },
              }}
              color="primary.main"
            >
              Post at least 3 photos
            </Typography>
          </div>
          <div>
            {queryData?.provider?.providerProfile?.samples?.length >= 3 ? (
              <Button variant="contained" onClick={handleNextSlide}>
                Procceed
              </Button>
            ) : (
              <Button variant="contained" disabled>
                Procceed
              </Button>
            )}
          </div>
        </Box>
        <Box
          sx={{
            display: `grid`,
            gridTemplateColumns: {
              xs: `1fr`,
              sm: `1fr`,
              md: `1fr 1fr 1fr`,
              lg: `1fr 1fr 1fr`,
            },
            gridTemplateAreas: `item2 item1`,
            alignItem: `center`,
            gap: `1rem`,
            mt: `1rem`,
          }}
        >
          <Box
            sx={{
              borderRadius: `1px`,
              height: `${
                !queryData?.provider?.providerProfile?.samples?.length
                  ? `250px`
                  : `100%`
              }`,
              width: `100%`,
              background: `#ccc`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
            }}
          >
            <Button variant="outlined" onClick={() => setIsOpen(true)}>
              Add Photo
            </Button>
          </Box>
          {queryData?.provider?.providerProfile?.samples?.map((data: any) => (
            <Box
              key={data?._id}
              sx={{
                borderRadius: `1px`,
                height: `100%`,
                position: `relative`,
              }}
            >
              <Box
                sx={{
                  width: `100%`,
                  height: {
                    xs: `300px`,
                    sm: `300px`,
                    md: `300px`,
                    lg: `300px`,
                    xl: `300px`,
                  },
                  borderRadius: `10px`,
                  position: `relative`,
                  '.item2': {
                    gridArea: `item2`,
                  },
                }}
              >
                <Image
                  src={data?.sampleImage && data?.sampleImage}
                  alt="eventname"
                  fill
                  quality={100}
                  priority={true}
                  style={{
                    objectFit: `cover`,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default PreviousJobs;
