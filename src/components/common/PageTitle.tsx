/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { styled } from '@mui/material/styles';

interface TitleProps {
  title: string;
}

const PageTitle = ({ title }: TitleProps) => {
  return <Title>{title}</Title>;
};

const Title = styled(`h3`)(({ theme }) => ({
  marginTop: `2rem`,
  color: theme.palette.primary.main,

  '@media (max-width: 900px)': {
    marginTop: `1rem`,
  },
}));

export default PageTitle;
