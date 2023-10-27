import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import AddPreviousEventModal from './AddPreviousEventModal';
import { setIntroThree, setIntroFour } from '@/features/onboardingSlice';
import { useDispatch } from 'react-redux';
import InstagramOnboarding from './PhotoCarousel';

const PreviousJobs = ({ queryData, token }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectInstagram, setConnectInstagram] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const refreshToken = async () => {
  //     console.log('started')
  //     // Fetch a new token and update the state.
  //     // You might want to add error handling here too.
  //     fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/v2/auth/instagram/refresh?userId${queryData?.provider?._id}&oldToken=IGQWRPa29mc3JtOFBLbVBIbWNXUzE4SEV2SGo1a1hsNDhvZAC1qWmkwRk5wbzJYVDgzSm4zbzI0ZAnl4VHlEWWE3RkQyVlZAIUTA3T2ZANa2V1RnoxQU14U3FzbXp6MVdaRWFQXzdyVEJ3eVd6NGl2QUwtSXZACVHhuR1o5OHpEb0UtT0RldwZDZD`,
  //     );
  //   };
  //   refreshToken()
  //   // Refresh the token every 50 minutes.
  //   const interval = setInterval(refreshToken, 2 * 60 * 1000);

  //   // Run once immediately at the start (optional).
  //   refreshToken();

  //   return () => clearInterval(interval); // Cleanup on component unmount.
  // },[]);

  const handleNextSlide = () => {
    dispatch(setIntroThree(false));
    dispatch(setIntroFour(true));
  };
  return (
    <>
      <AddPreviousEventModal
        token={token}
        isOpen={isOpen}
        isClose={() => setIsOpen(false)}
      />
      <Box mt={5} mb={10}>
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
              Add Previous Jobs
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
            {!connectInstagram &&(
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
              mb: `1.5rem`,
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
        <Box>
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
            or connect and display photos from your Intagram
          </Typography>
          <Box sx={{ mt: `1rem` }}>
            <Button
              variant="contained"
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/instagram?user=ert`)
              }
              sx={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                width: {
                  xs: `100%`,
                  sm: `100%`,
                  md: `200px`,
                  lg: `250px`,
                  xl: `250px`,
                },
                backgroundImage: `linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)`, // Instagram gradient colors
                color: `white`, // set text color to white for better contrast
              }}
            >
              Connect Instagram
            </Button>
          </Box>
          <InstagramOnboarding queryData={queryData} />
        </Box>
      </Box>
    </>
  );
};

export default PreviousJobs;
