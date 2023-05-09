import React from 'react';

type InputProps = {
  ariaLabel?: string;
  name?: string;
  type: string;
  field?: any;
};

const Checkbox = ({ ariaLabel, name, type, field }: InputProps) => (
  <input {...field} aria-label={ariaLabel} name={name} type={type} />
);

export default Checkbox;
