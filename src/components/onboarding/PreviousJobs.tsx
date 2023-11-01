import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import AddPreviousEventModal from './AddPreviousEventModal';
import { setIntroFive, setIntroSix } from '@/features/onboardingSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const PreviousJobs = ({ queryData, token }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

<<<<<<< HEAD
  const handleNextSlide = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        { onboradStage: 6 },
      );

      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        dispatch(setIntroFive(true));
        dispatch(setIntroSix(false));
=======
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const handlePhotoSelect = (id: string) => {
    console.log(selectedPhotos);
    if (selectedPhotos.includes(id)) {
      setSelectedPhotos((prev) => prev.filter((photoId) => photoId !== id));
    } else {
      setSelectedPhotos((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    async function fetchInstagramPhotos() {
      const response = await fetch(`http://localhost:3000/api/getigmedia`);
      const data = await response.json();
      setPhotos(data.data);
    }
    fetchInstagramPhotos();
  }, []);

  const handleNextSlide = () => {
    dispatch(setIntroThree(false));
    dispatch(setIntroFour(true));
  };

  const saveSelectedPhotos = async () => {
    // Iterate through selectedPhotos and send each photo data to the server
    for (const photoId of selectedPhotos) {
      // Find the full details of the photo from the photos array
      const photoDetails = photos.find((photo) => photo.id === photoId);
      if (!photoDetails) {
        console.error(`Photo with id ${photoId} not found in photos array`);
        continue;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profiles/${queryData?.provider._id}/add-sampleIG`,
        {
          method: `PUT`,
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sampleImage: photoDetails.media_url,
            //title: photoDetails.caption,  // commented out since it seems you don't want to use title anymore
            description: photoDetails.caption,
          }),
        },
      );

      if (!response.ok) {
        toast.error(`Image upload for ` + photoDetails.id + ` failed`);
>>>>>>> a3174f9 (fixed some type errors)
      } else {
        console.error(`Request was not successful:`, response);
      }
    } catch (error) {
      // Handle the error (you can dispatch another action here if needed)
      console.error(`Error during the request:`, error);
    }
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
          {console.log(queryData)}
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
