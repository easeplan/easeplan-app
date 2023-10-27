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


const InstagramOnboarding: React.FC<InstagramOnboardingProps> = ({
  queryData,
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
