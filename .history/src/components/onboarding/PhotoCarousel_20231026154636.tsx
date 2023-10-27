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
  queryData: any;
  photos: Photo[];
  selectedPhotos: string[];
  setSelectedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
};


const InstagramOnboarding: React.FC<InstagramOnboardingProps> = (
    { 
        queryData, photos, selectedPhotos, setSelectedPhotos 
    }
}) => {
  return (
    <div>
      <PhotoCarousel
        photos={photos}
        selectedPhotos={selectedPhotos}
        onSelectPhoto={handlePhotoSelect}
      />
    </div>
  );
};

export default InstagramOnboarding;
