import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

type OTPRequestCooldownProps = {
  onRequestOTP: (values: any) => void;
  onEditPhoneNumber?: (value: boolean) => void;
  cooldownPeriod?: number;
  values: any;
};

const OTPRequestCooldown = ({
  onRequestOTP,
  onEditPhoneNumber,
  cooldownPeriod = 100,
  values,
}: OTPRequestCooldownProps) => {
  const [cooldown, setCooldown] = useState(false);
  const [timer, setTimer] = useState(cooldownPeriod);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    let interval: any;
    if (cooldown) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) return prevTimer - 1;
          clearInterval(interval);
          setCooldown(false);
          return cooldownPeriod * 2 ** requestCount; // exponential increase
        });
      }, 1000);
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [cooldown, cooldownPeriod, requestCount]);

  const handleRequestOTP = () => {
    onRequestOTP(values); // Call the function that handles the OTP request
    setCooldown(true); // Start the cooldown
  };

  const handleEditPhoneNumber = () => {
    if (onEditPhoneNumber) {
      // Check if onEditPhoneNumber is provided before calling
      onEditPhoneNumber(false); // Call the function if it's defined
    }
    setRequestCount(requestCount + 1); // Increase the request count
    setCooldown(false); // Reset the cooldown
    setTimer(cooldownPeriod ? cooldownPeriod * 2 ** requestCount : 100); // Set the timer with exponential backoff
  };

  return (
    <Typography variant="body2" color="primary">
      {cooldown ? (
        <div>
          <Button disabled color="primary">
            Request a new code in {timer} seconds
          </Button>
          <Button color="primary" onClick={handleEditPhoneNumber}>
            Made a mistake? Change details
          </Button>
        </div>
      ) : (
        <Button color="primary" onClick={handleRequestOTP}>
          Did&apos;nt receive a code? request again
        </Button>
      )}
    </Typography>
  );
};

export default OTPRequestCooldown;
