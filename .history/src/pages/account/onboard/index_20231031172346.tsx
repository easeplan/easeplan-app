// import React, { useEffect } from 'react';
// import { Box } from '@mui/material';
// export { getServerSideProps } from '@/hooks/getServerSideProps';
// import ProfileSettings from '@/components/onboarding/ProfileSettings';
// import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
// import AddPreviousEventModal from '@/components/onboarding/AddPreviousEventModal';
// import AddPreviousSection from '@/components/onboarding/AddPreviousSection';
// import AddPricingSection from '@/components/onboarding/AddPricingSection';
// import AddPhoneNumber from '@/components/onboarding/AddPhoneNumber';
// import VerifyRegistration from '@/components/onboarding/VerifyRegistration';
// import BusinessSettings from '@/components/onboarding/AddBusinessSettings';
// import VerifyID from '@/components/onboarding/VerifyID';

// interface PropsTypes {
//   token: string;
// }

// const OnboardingPage = ({ token }: PropsTypes) => {
//   return (
//     <>
//       <Box>
//         <WelcomeScreen />
//         <VerifyRegistration token={token} />
//         <AddPhoneNumber token={token} />
//         <BusinessSettings token={token} />
//         <ProfileSettings token={token} />
//         <AddPreviousSection token={token} />
//         <VerifyID token={token} />
//       </Box>
//     </>
//   );
// };

// export default OnboardingPage;


import React, { useState, useEffect } from 'react';
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

const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
  backgroundColor: 'transparent',
  '& .MuiMobileStepper-dot': {
    width: 8, // Adjust the width as needed
    height: 8, // Adjust the height as needed
    margin: '0 5px',
    borderRadius: '50%', // Makes the dot circular
    backgroundColor: 'lightgray',
  },
  '& .MuiMobileStepper-dotActive': {
    borderRadius: '0%'
    width: 16, // Makes the active dot wider
    height: 8, // Same height for active dot
    backgroundColor: 'purple',
  },
  justifyContent: 'center', // Center the dots horizontally
}));

const CarouselComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 6; // Six components/pages in total

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

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

      <StyledMobileStepper steps={maxSteps} position="static" variant="dots" activeStep={activeStep} />
    </div>
  );
};

export default CarouselComponent;
