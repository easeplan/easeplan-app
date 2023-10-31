import React, { useState } from 'react';
import { Card, CardMedia, Box, IconButton } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/system';

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
  const theme = useTheme();

  const handleChangeStep = (step: number) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, photos.length - 1),
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
    <div style={{ position: `relative` }}>
      <SwipeableViews index={activeStep} onChangeIndex={handleChangeStep}>
        {photos &&
          photos.map((photo, index) => (
            <Box key={photo.id} onClick={() => onSelectPhoto(photo.id)}>
              <Card>
                <CardMedia
                  component="img"
                  alt={photo.caption || `Instagram photo`}
                  height="300"
                  image={photo.media_url}
                  title={photo.caption || `Instagram photo`}
                  style={{
                    opacity: selectedPhotos.includes(photo.id) ? 0.5 : 1,
                    border: selectedPhotos.includes(photo.id)
                      ? `3px solid blue`
                      : `none`,
                  }}
                />
              </Card>
            </Box>
          ))}
      </SwipeableViews>
      {/* Only show arrows on large screens */}
      {theme.breakpoints.up(`sm`) && (
        <>
          <IconButton
            style={{
              background: `#0F3443`,
              color: `white`,
              position: `absolute`,
              top: `50%`,
              left: 0,
              transform: `translateY(-50%)`,
              zIndex: 2,
            }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            style={{
              background: `#0F3443`,
              color: `white`,
              position: `absolute`,
              top: `50%`,
              right: 0,
              transform: `translateY(-50%)`,
              zIndex: 2,
            }}
            onClick={handleNext}
            disabled={activeStep === photos?.length - 1}
          >
            <ArrowForwardIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default PhotoCarousel;
