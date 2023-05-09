/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { styled } from '@mui/material/styles';

type LabelProps = {
  text: string;
};

const Label = ({ text }: LabelProps) => <LabelStyle>{text}</LabelStyle>;

const LabelStyle = styled(`label`)(({}) => ({
  fontSize: `0.8rem`,
  color: `#73877B`,
  fontWeight: `600`,
}));

export default Label;
