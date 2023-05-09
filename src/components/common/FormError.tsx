/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import Alert from '@mui/material/Alert';

type ErrorProps = {
  text: string;
};

const FormError = ({ text }: ErrorProps) => (
  <Alert severity="error">{text}</Alert>
);
export default FormError;
