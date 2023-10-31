import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, MobileStepper } from '@mui/material';
import { styled } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';

const CustomCard = styled(Card)(({ theme }) => ({
  width: '300px',
  textAlign: 'center',
  marginTop: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const ImagePlaceholder = styled('div')({
  width: '200px',
  height: '200px',
  border: '2px dashed black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px auto',
});

const SkipButton = styled(Button)({
  position: 'absolute',
  top: '10px',
  right: '10px',
});

const CarouselComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 6; // Six components/pages in total

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div style={{ position: 'relative' }}>
      <SkipButton variant="text">Skip</SkipButton>

      <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        {Array.from({ length: maxSteps }).map((_, index) => (
          <CustomCard key={index}>
            <CardContent>
              <ImagePlaceholder>Image goes here</ImagePlaceholder>
              <Typography variant="h6" gutterBottom>
                Transfer Seamlessly To Any Country
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Complete your profile information to be able to withdraw your earnings.
              </Typography>
            </CardContent>
          </CustomCard>
        ))}
      </SwipeableViews>

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
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

export default CarouselComponent;
