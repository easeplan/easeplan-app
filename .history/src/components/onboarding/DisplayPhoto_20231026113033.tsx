import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Checkbox,
  Typography,
  MobileStepper,
  Button,
} from '@mui/material';
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

  const maxSteps = photos && photos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeStep = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div>
      <SwipeableViews index={activeStep} onChangeIndex={handleChangeStep}>

        {photos && photos.map((photo, index) => (
          <div key={photo.id}>
            {Math.abs(activeStep - index) <= 2 ? ( // This reduces rendering photos that are far away from current index
              <Card>
                <CardMedia
                  component="img"
                  alt={photo.caption || `Instagram photo`}
                  height="250"
                  image={photo.media_url}
                  title={photo.caption || `Instagram photo`}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {photo.caption}
                  </Typography>
                  <Checkbox
                    checked={selectedPhotos.includes(photo.id)}
                    onChange={() => onSelectPhoto(photo.id)}
                    inputProps={{ 'aria-label': `select photo` }}
                  />
                </CardContent>
              </Card>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
    </div>
  );
};

export default PhotoCarousel;
