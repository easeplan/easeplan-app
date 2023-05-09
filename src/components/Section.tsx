/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Container } from '@mui/system';
import theme from '@/styles/theme';
import { styled } from '@mui/material/styles';
import SectionSubTitle from './SectionSubTitle';

type ISectionProps = {
  subtitle?: string;
  children: React.ReactNode;
  isBg?: boolean;
};

const Section = ({ subtitle, children, isBg }: ISectionProps) => {
  return (
    <SectionWrapper
      style={{
        background: isBg
          ? theme.palette.secondary.light
          : theme.palette.background.default,
      }}
    >
      <Container fixed>
        {subtitle && <SectionSubTitle subTitle={subtitle} />}
        {children}
      </Container>
    </SectionWrapper>
  );
};

const SectionWrapper = styled(`section`)(({}) => ({
  height: `100%`,
  width: `100%`,
  padding: `4rem 0`,
  '@media (max-width: 900px)': {
    padding: `2rem 1rem`,
  },
}));

const Title = styled(`h1`)(({ theme }) => ({
  textAlign: `center`,
  color: theme.palette.primary.main,
  textTransform: `capitalize`,
  fontWeight: `700`,
  lineHeight: `28px`,
  fontSize: `3rem`,
  marginBottom: `3rem`,

  '@media (max-width: 1020px)': {
    fontSize: `2rem`,
    lineHeight: `8px`,
  },

  '@media (max-width: 900px)': {
    fontSize: `1.5rem`,
    lineHeight: `28px`,
  },

  span: {
    color: theme.palette.secondary.main,
  },
}));

export default Section;
