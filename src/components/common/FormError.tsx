/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type ErrorProps = {
  text: string;
};

const FormError = ({ text }: ErrorProps) => (
  <Box
    sx={{
      display: `flex`,
      alignItems: `center`,
      color: `red`,
      width: `100%`,
    }}
  >
    <ErrorOutlineIcon sx={{ fontSize: `0.9rem`, mr: `0.5rem` }} />
    <Typography fontSize="0.8rem">{text}</Typography>
  </Box>
);
export default FormError;
