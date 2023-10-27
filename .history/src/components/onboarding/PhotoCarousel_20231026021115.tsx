import { useState } from 'react';
import { Button } from '@mui/material';

const InstagramOnboarding: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Fetching Instagram photos after obtaining token and user ID. This is just a representation.
  const loadPhotos = async () => {
    const data = await fetchInstagramPhotos('YOUR_ACCESS_TOKEN', 'USER_ID');
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
    console.log('Selected Photos:', selectedPhotos);
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
