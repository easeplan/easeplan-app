import { useState } from 'react';
import { Button } from '@mui/material';

type Photo = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  timestamp: string;
};

async function fetchInstagramPhotos(access_token: string, user_id: string) {
  const response = await fetch(
    `https://graph.instagram.com/${user_id}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp&access_token=${access_token}`,
  );
  const data = await response.json();
  return data.data;
}
const InstagramOnboarding: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Fetching Instagram photos after obtaining token and user ID. This is just a representation.
  const loadPhotos = async () => {
    const data = await fetchInstagramPhotos(`YOUR_ACCESS_TOKEN`, `USER_ID`);
    setPhotos(data);
  };

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
