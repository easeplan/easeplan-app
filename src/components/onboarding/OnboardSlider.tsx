import React from 'react';
import { Box } from '@mui/material';
import OnboardStickers from './OnboardStickers';

const OnboardSlider = () => {
  return (
    <div>
      <Box
        className="onboardingCoverImg"
        sx={{
          position: 'relative',
          width: '300px',
          height: '300px',
          margin: '6rem auto 3rem auto',
          borderRadius: '50%',
        }}
      >
        <OnboardStickers bgColor="secondary.light" text="Find Event Planners" />
        <OnboardStickers
          bgColor="secondary.light"
          down="0"
          right="-2rem"
          text="Get connected to event owners"
        />
        <OnboardStickers
          bgColor="secondary.main"
          top="8rem"
          right="-2rem"
          text="Secure Payment"
        />
      </Box>
    </div>
  );
};

export default OnboardSlider;
