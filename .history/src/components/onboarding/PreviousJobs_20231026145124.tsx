import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import AddPreviousEventModal from './AddPreviousEventModal';
import { setIntroThree, setIntroFour } from '@/features/onboardingSlice';
import { useDispatch } from 'react-redux';
import InstagramOnboarding from './PhotoCarousel';

// const PreviousJobs = ({ queryData, token }: any) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [connectInstagram, setConnectInstagram] = useState(true);
//   const dispatch = useDispatch();

//   const handleNextSlide = () => {
//     dispatch(setIntroThree(false));
//     dispatch(setIntroFour(true));
//   };
//   return (
//     <>
//       <AddPreviousEventModal
//         token={token}
//         isOpen={isOpen}
//         isClose={() => setIsOpen(false)}
//       />
//       <Box mt={5} mb={10}>
//         <Box
//           sx={{
//             display: `flex`,
//             // alignItems: `center`,
//             justifyContent: `space-between`,
//           }}
//         >
//           <div>
//             <Typography
//               fontWeight={800}
//               sx={{
//                 fontSize: {
//                   xs: `1.2rem`,
//                   sm: `1.2rem`,
//                   md: `1.5rem`,
//                   lg: `1.5rem`,
//                 },
//               }}
//               color="primary.main"
//             >
//               Add Previous Jobs
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: {
//                   xs: `1rem`,
//                   sm: `1rem`,
//                   md: `1rem`,
//                   lg: `1rem`,
//                 },
//               }}
//               color="primary.main"
//             >
//               Post at least 3 photos
//             </Typography>
//           </div>
//           <div>
//             {!connectInstagram &&
//               (queryData?.provider?.providerProfile?.samples?.length >= 3 ? (
//                 <Button variant="contained" onClick={handleNextSlide}>
//                   Proceed
//                 </Button>
//               ) : (
//                 <Button variant="contained" disabled>
//                   Proceed
//                 </Button>
//               ))}
//           </div>
//         </Box>
//         <Box
//           sx={{
//             display: `grid`,
//             gridTemplateColumns: {
//               xs: `1fr`,
//               sm: `1fr`,
//               md: `1fr 1fr 1fr`,
//               lg: `1fr 1fr 1fr`,
//             },
//             gridTemplateAreas: `item2 item1`,
//             alignItem: `center`,
//             gap: `1rem`,
//             mt: `1rem`,
//           }}
//         >
//           <Box
//             sx={{
//               borderRadius: `1px`,
//               height: `${
//                 !queryData?.provider?.providerProfile?.samples?.length
//                   ? `250px`
//                   : `100%`
//               }`,
//               width: `100%`,
//               background: `#ccc`,
//               display: `flex`,
//               alignItems: `center`,
//               justifyContent: `center`,
//               mb: `1.5rem`,
//             }}
//           >
//             <Button variant="outlined" onClick={() => setIsOpen(true)}>
//               Add Photo
//             </Button>
//           </Box>
//           {queryData?.provider?.providerProfile?.samples?.map((data: any) => (
//             <Box
//               key={data?._id}
//               sx={{
//                 borderRadius: `1px`,
//                 height: `100%`,
//                 position: `relative`,
//               }}
//             >
//               <Box
//                 sx={{
//                   width: `100%`,
//                   height: {
//                     xs: `300px`,
//                     sm: `300px`,
//                     md: `300px`,
//                     lg: `300px`,
//                     xl: `300px`,
//                   },
//                   borderRadius: `10px`,
//                   position: `relative`,
//                   '.item2': {
//                     gridArea: `item2`,
//                   },
//                 }}
//               >
//                 <Image
//                   src={data?.sampleImage && data?.sampleImage}
//                   alt="eventname"
//                   fill
//                   quality={100}
//                   priority={true}
//                   style={{
//                     objectFit: `cover`,
//                   }}
//                 />
//               </Box>
//             </Box>
//           ))}
//         </Box>
//         <Box>
//           <Typography
//             sx={{
//               fontSize: {
//                 xs: `1rem`,
//                 sm: `1rem`,
//                 md: `1rem`,
//                 lg: `1rem`,
//               },
//             }}
//             color="primary.main"
//           >
//             or connect and display photos from your Intagram
//           </Typography>
//           {!connectInstagram &&
//           <Box sx={{ mt: `1rem` }}>
//             <Button
//               variant="contained"
//               onClick={() =>
//                 (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/instagram?user=ert`)
//               }
//               sx={{
//                 display: `flex`,
//                 alignItems: `center`,
//                 justifyContent: `center`,
//                 width: {
//                   xs: `100%`,
//                   sm: `100%`,
//                   md: `200px`,
//                   lg: `250px`,
//                   xl: `250px`,
//                 },
//                 backgroundImage: `linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)`, // Instagram gradient colors
//                 color: `white`, // set text color to white for better contrast
//               }}
//             >
//               Connect Instagram
//             </Button>
//           </Box>
// }
//           <InstagramOnboarding queryData={queryData} />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default PreviousJobs;

const PreviousJobs = ({ queryData, token }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasConnectedInstagram = Boolean(true);
  const photoCount = queryData?.provider?.providerProfile?.samples?.length || 0;

  const dispatch = useDispatch();

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
            {(hasConnectedInstagram || photoCount >= 3) && (
              <Button variant="contained" onClick={handleNextSlide}>
                Proceed
              </Button>
            )}
          </div>
        </Box>

        {/* Only show Add Photo if the user hasn't connected to Instagram */}
        {!hasConnectedInstagram && (
          <Box
            sx={{
              display: `grid`,
              gridTemplateColumns: {
                xs: `1fr`,
                sm: `1fr`,
                md: `1fr 1fr 1fr`,
                lg: `1fr 1fr 1fr`,
              },
              gap: `1rem`,
              mt: `1rem`,
            }}
          >
            <Box
              sx={{
                borderRadius: `1px`,
                height: `${!photoCount ? `250px` : `100%`}`,
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
          </Box>
        )}

        {photoCount > 0 &&
          queryData.provider.providerProfile.samples.map((data: any) => (
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
            or connect and display photos from your Instagram
          </Typography>

          {/* Only show the Connect Instagram button if not connected */}
          {!hasConnectedInstagram && (
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
          )}

          {hasConnectedInstagram && (
            <InstagramOnboarding queryData={queryData} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default PreviousJobs;