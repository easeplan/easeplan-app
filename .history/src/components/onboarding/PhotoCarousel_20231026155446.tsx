import { useState } from 'react';
import { Button } from '@mui/material';
import PhotoCarousel from './DisplayPhoto';

type Photo = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  timestamp: string;
};

type InstagramOnboardingProps = {
  queryData: any; // Ideally, replace `any` with a more specific type if possible.
};

async function fetchInstagramPhotos(access_token: string, user_id: string) {
  const response = await fetch(
    `https://graph.instagram.com/${user_id}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp&access_token=${access_token}`,
  );
  const data = await response.json();
  return data.data;
}
const InstagramOnboarding: React.FC<InstagramOnboardingProps> = ({
  queryData,
}) => {
//   const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Fetching Instagram photos after obtaining token and user ID. This is just a representation.
  const loadPhotos = async () => {
    const data = await fetchInstagramPhotos(
      `IGQWRNbVZAhVEZAMOGdMNkhLWFdtTzdTQWIzT3RvTmQ3NU80bl9JSU8zQVVaeDRWNkVFamdBSWpzdmJjNVdlOUs5UjVLaVljdWxreGl5aFYxQ01kc1ZAFMzRvYzBGV1Y5cEtaSllFUURFdk40ZAndFQU5reFBjbnVhSm13YUhZAMC1zbkgydwZDZD`,
      `23964241119890640`,
    );
    //setPhotos(data);
  };
  loadPhotos();
  const handlePhotoSelect = (id: string) => {
    if (selectedPhotos.includes(id)) {
      setSelectedPhotos((prev) => prev.filter((photoId) => photoId !== id));
    } else {
      setSelectedPhotos((prev) => [...prev, id]);
    }
  };

  const saveSelectedPhotos = () => {
    // Here you would send the selected photos to your server or handle as required
    console.log(`Selected Photos:`, selectedPhotos);
  };
  const photos = []
  return (
    <div>
      <PhotoCarousel
        photos={photos}
        selectedPhotos={selectedPhotos}
        onSelectPhoto={handlePhotoSelect}
      />
      {photos.length > 0 && (
        <Button
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
            mt: `1rem`,
          }}
          variant="outlined"
          color="primary"
          onClick={saveSelectedPhotos}
        >
          Save Selected Photos
        </Button>
      )}
    </div>
  );
};

export default InstagramOnboarding;
