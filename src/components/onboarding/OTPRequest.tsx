import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';

const OTPRequestCooldown = ({
  onRequestOTP,
  onEditPhoneNumber,
  cooldownPeriod = 100,
  values,
}) => {
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
  }, [cooldown, cooldownPeriod]);

  const handleRequestOTP = () => {
    onRequestOTP(values); // Call the function that handles the OTP request
    setCooldown(true); // Start the cooldown
  };

  const handleEditPhoneNumber = () => {
    onEditPhoneNumber(false); // Call the function that resets the phone number input
    setCooldown(false); // Reset the cooldown
    setTimer(cooldownPeriod * 2 ** requestCount); // Set the timer with exponential backoff
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
          Didn&apost receive a code? request again
        </Button>
      )}
    </Typography>
  );
};

export default OTPRequestCooldown;
