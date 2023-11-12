import { QueryData } from '@/lib/types';
import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  event: QueryData['events'][string];
};

export default function EventAlert({ event }: Props) {
  return (
    <Box>
      {event.status !== 'Completed' ? (
        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            mt: 4,
            backgroundColor: 'red',
          }}
        >
          <Typography color="white" fontWeight="600">
            Dispute opened on this event
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            mt: 4,
            backgroundColor: '#0DE75A',
          }}
        >
          <Typography color="white" fontWeight="600">
            <svg
              style={{ display: 'inline-block', marginRight: 2 }}
              width="25"
              height="10"
              viewBox="0 0 32 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0022 2.33215L22.1222 0.452148L13.6688 8.90548L15.5488 10.7855L24.0022 2.33215ZM29.6555 0.452148L15.5488 14.5588L9.9755 8.99881L8.0955 10.8788L15.5488 18.3321L31.5488 2.33215L29.6555 0.452148ZM0.548828 10.8788L8.00216 18.3321L9.88216 16.4521L2.44216 8.99881L0.548828 10.8788Z"
                fill="#FEFEFE"
              />
            </svg>
            Event completed
          </Typography>
        </Box>
      )}
    </Box>
  );
}
