import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

interface SelectProps {
  onChange: (e: any) => void;
  name: string;
  selectPlaceholder: string;
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
    <FormControl fullWidth size="small" sx={{ mb: `1rem` }}>
      <Select
        {...field}
        {...props}
        onChange={onChange}
        sx={{ py: `0.4rem`, borderRadius: `10px` }}
        displayEmpty
        inputProps={{ 'aria-label': `Without label` }}
        className={` ${meta.touched && meta.error ? `border-red-500` : ``}`}
        MenuProps={MenuProps}
      >
        <MenuItem value="">
          <span>{selectPlaceholder}</span>
        </MenuItem>
        {props.children}
      </Select>
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </FormControl>
  );
};

export default SelectState;
