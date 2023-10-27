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
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Fetching Instagram photos after obtaining token and user ID. This is just a representation.
  const loadPhotos = async () => {
    const data = await fetchInstagramPhotos(
      `${queryData.provider.igAccessToken}`,
      `23964241119890640`,
    );
    IGQWRPZA1dBV095bTQ1R2dNZAmtRSUsxalhkREpKQ1U4em4taEVDSXBuN19GT09HM3ZAsTDJHaFF4enJoWjQxSG4tQ0lQeDJ3SHN0NzdDODMtTnduNUxmbjlHS09LU3dSZAUtoV0xvdnA3Y2V0RjBvbXZAHS2F5OW9OZAXdnbVZAJYXJCUklzOHMZD
    setPhotos(data);
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

  return (
    <div>
        
      <PhotoCarousel
        photos={photos}
        selectedPhotos={selectedPhotos}
        onSelectPhoto={handlePhotoSelect}
      />
      <Button variant="contained" color="primary" onClick={saveSelectedPhotos}>
        Save Selected Photos
      </Button>
    </div>
  );
};

export default InstagramOnboarding;