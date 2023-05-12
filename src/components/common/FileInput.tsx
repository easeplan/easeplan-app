/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';
import { styled } from '@mui/material/styles';

type InputProps = {
  name: string;
  ariaLabel?: string;
  sx?: any;
};

const FileInput = ({ ariaLabel, ...props }: InputProps) => {
  const [field, meta] = useField(props);

  return (
    <>
      <InputWrapper>
        <input type="file" {...field} {...props} aria-label={ariaLabel} />
        {meta.touched && meta.error ? (
          <FormError text={meta.error}></FormError>
        ) : null}
      </InputWrapper>
    </>
  );
};

const InputWrapper = styled(`div`)({
  marginBottom: `1rem`,
});

export default FileInput;
