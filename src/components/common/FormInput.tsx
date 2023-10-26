/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';
import { styled } from '@mui/material/styles';
import { InputLabel, FormControl, Select } from '@mui/material';

type InputProps = {
  name: string;
  type?: string;
  max?: number;
  min?: number;
  placeholder?: string;
  ariaLabel?: string;
  isSelect?: any;
  children?: React.ReactNode | React.ReactElement;
  form?: any;
  options?: any;
  disabled?: boolean;
  sx?: any;
  selectPlaceholder?: string;
  value?: any;
  // onChange?: (e) => void;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FormInput = ({
  isSelect,
  ariaLabel,
  min,
  max,
  selectPlaceholder,
  ...props
}: InputProps) => {
  const [field, meta] = useField(props);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim(); // Trim leading and trailing whitespace
    field.onChange(e.target.name)(trimmedValue); // Call the formik field's onChange with the trimmed value
  };

  return (
    <>
      {isSelect ? (
        <FormControl fullWidth sx={{ mb: `0.4rem` }}>
          <InputLabel id="demo-simple-select-label">
            {selectPlaceholder}
          </InputLabel>
          <Select
            {...field}
            {...props}
            label="Select services"
            inputProps={{ 'aria-label': `Without label` }}
            sx={{ borderRadius: `10px` }}
            className={` ${meta.touched && meta.error ? `border-red-500` : ``}`}
            MenuProps={MenuProps}
          >
            {props.children}
          </Select>
          {meta.touched && meta.error ? (
            <FormError text={meta.error}></FormError>
          ) : null}
        </FormControl>
      ) : (
        <InputWrapper>
          <Input
            min={min}
            max={max}
            {...field}
            {...props}
            aria-label={ariaLabel}
            onChange={handleInputChange}
          />
          {meta.touched && meta.error ? (
            <FormError text={meta.error}></FormError>
          ) : null}
        </InputWrapper>
      )}
    </>
  );
};

const InputWrapper = styled(`div`)({
  marginBottom: `0.5rem`,
});

const Input = styled(`input`)({
  padding: `0.9rem 1.5rem`,
  outline: `none`,
  width: `100%`,
  borderRadius: `10px`,
  fontSize: `1rem`,
  border: `solid 1px #ccc;`,
  marginTop: `0.3rem`,
  background: `transparent`,

  '@media (max-width: 1020px)': {
    fontSize: `0.8rem`,
    padding: `1.2rem 1rem`,
  },

  '&:-webkit-autofill': {
    BackgroundColor: `transparent`,
  },
});

export default FormInput;
