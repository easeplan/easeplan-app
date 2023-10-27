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
      `IGQWRPa29mc3JtOFBLbVBIbWNXUzE4SEV2SGo1a1hsNDhvZAC1qWmkwRk5wbzJYVDgzSm4zbzI0ZAnl4VHlEWWE3RkQyVlZAIUTA3T2ZANa2V1RnoxQU14U3FzbXp6MVdaRWFQXzdyVEJ3eVd6NGl2QUwtSXZACVHhuR1o5OHpEb0UtT0RldwZDZD`,
      `23964241119890640`,
    );
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
