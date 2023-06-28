/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

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
  form,
  options,
  selectPlaceholder,
  // disabled,
  ...props
}: InputProps) => {
  const [field, meta] = useField(props);

  return (
    <>
      {isSelect ? (
        <FormControl fullWidth size="small" sx={{ mb: `1rem` }}>
          <Select
            {...field}
            {...props}
            displayEmpty
            inputProps={{ 'aria-label': `Without label` }}
            sx={{ py: `0.4rem`, borderRadius: `10px` }}
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
  marginBottom: `1rem`,
});

const Input = styled(`input`)({
  padding: `1rem 1rem`,
  outline: `none`,
  width: `100%`,
  borderRadius: `10px`,
  fontSize: `1rem`,
  border: `solid 1px #ccc;`,
  marginTop: `0.5rem`,
  background: `transparent`,

  '@media (max-width: 1020px)': {
    fontSize: `1rem`,
    padding: `1rem 1rem`,
  },

  '&:-webkit-autofill': {
    BackgroundColor: `transparent`,
  },
});

export default FormInput;
