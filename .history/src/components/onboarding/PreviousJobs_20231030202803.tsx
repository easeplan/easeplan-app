import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import AddPreviousEventModal from './AddPreviousEventModal';
import { setIntroThree, setIntroFour } from '@/features/onboardingSlice';
import { useDispatch } from 'react-redux';
import InstagramOnboarding from './PhotoCarousel';
import { toast } from 'react-toastify';

type Photo = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  timestamp: string;
};

const PreviousJobs = ({ queryData, token }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const photoCount = queryData?.provider?.providerProfile?.samples?.length || 0;

  const dispatch = useDispatch();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const handlePhotoSelect = (id: string) => {
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
      } else {
        toast.success(`Job Photo ${photoDetails.id} added successfully`);
        handleNextSlide();
      }
    }

    // If you want to handle the next slide once after all photos are uploaded
    // handleNextSlide();
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
            {!photos || photos?.length === 0 ? (
              <Button
                variant="contained"
                disabled={photoCount < 3}
                onClick={handleNextSlide}
              >
                Proceed
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={selectedPhotos.length < 3}
                onClick={saveSelectedPhotos}
              >
                Proceed
              </Button>
            )}
          </div>
        </Box>
        {!photos ||
          (photos?.length === 0 && (
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
                  height: `${!photoCount ? `60%` : `100%`}`,
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
          ))}

        {photoCount < 0 &&
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
          {!photos || photos?.length == 0 && (
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
          )}

          {/* Only show the Connect Instagram button if not connected */}
          {photos?.length == 0 && (
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

          {photos?.length != 0 && (
            <Box sx={{ mt: `3rem` }}>
              <InstagramOnboarding
                queryData={queryData}
                photos={photos}
                selectedPhotos={selectedPhotos}
                onSelectPhoto={handlePhotoSelect}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PreviousJobs;
