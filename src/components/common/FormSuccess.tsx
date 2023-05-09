import React from 'react';
import Alert from '@mui/material/Alert';

type SuccessProps = {
  text: string;
};

const FormSuccess = ({ text }: SuccessProps) => (
  <Alert severity="success">{text}</Alert>
);

export default FormSuccess;
