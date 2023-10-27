import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

type Photo = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  timestamp: string;
};

interface PhotoCarouselProps {
  photos: Photo[];
  selectedPhotos: string[];
  onSelectPhoto: (id: string) => void;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  photos,
  selectedPhotos,
  onSelectPhoto,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleChangeStep = (step: number) => {
    setActiveStep(step);
  };

  {console.log(typeof )}

  return (
    <div>
      <SwipeableViews index={activeStep} onChangeIndex={handleChangeStep}>
        {photos &&
          photos.map((photo, index) => (
            <Box key={photo.id} onClick={() => onSelectPhoto(photo.id)}>
              <Card>
                <CardMedia
                  component="img"
                  alt={photo.caption || `Instagram photo`}
                  height="250"
                  image={photo.media_url}
                  title={photo.caption || `Instagram photo`}
                  style={{
                    opacity: selectedPhotos.includes(photo.id) ? 0.5 : 1, // Special effect: semi-transparent when selected
                    border: selectedPhotos.includes(photo.id)
                      ? '3px solid blue'
                      : 'none', // Special effect: blue border when selected
                  }}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {photo.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
      </SwipeableViews>
    </div>
  );
};

export default PhotoCarousel;
