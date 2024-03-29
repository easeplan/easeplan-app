import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';
import { InputLabel, FormControl, Select } from '@mui/material';

interface SelectProps {
  onChange: (e: any) => void;
  name: string;
  selectPlaceholder?: string;
  children: React.ReactNode | React.ReactElement;
}

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

const SelectState = ({
  onChange,
  selectPlaceholder,
  ...props
}: SelectProps) => {
  const [field, meta] = useField(props);
  return (
    <FormControl fullWidth sx={{ mb: `1rem` }}>
      <InputLabel id="demo-simple-select-label">{selectPlaceholder}</InputLabel>
      <Select
        {...field}
        {...props}
        label={selectPlaceholder}
        id="demo-simple-select"
        onChange={onChange}
        sx={{ borderRadius: `10px` }}
        inputProps={{ 'aria-label': `Without label` }}
        className={` ${meta.touched && meta.error ? `border-red-500` : ``}`}
        MenuProps={MenuProps}
      >
        {props.children}
      </Select>
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </FormControl>
  );
};

export default SelectState;
