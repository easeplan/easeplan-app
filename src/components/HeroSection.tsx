/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/system';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { motion as m } from 'framer-motion';
import WaitlistModal from './WaitListModal';
import starImg from '@/public/Star2.png';
import CustomButton from './common/CustomButton';
import Link from 'next/link';

type IHeroProps = {
  subtitle: string;
  leftText: string;
  centerText: string;
  rightText: string;
  description: string;
  href: string;
  btnText: string;
  heroImg: any;
  waitlist?: boolean;
  onClick?: () => void;
};

const HeroSection = ({
  waitlist,
  subtitle,
  btnText,
  leftText,
  centerText,
  rightText,
  description,
  heroImg,
  href,
}: IHeroProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Section>
      <WaitlistModal isOpen={open} isClose={() => setOpen(false)} />
      <Container maxWidth="xl">
        <Grid>
          <m.div
            animate={{ y: 0 }}
            initial={{ y: `100%` }}
            transition={{ duration: 0.2 }}
          >
            <ContentWrapper>
              <m.div
                animate={{ y: 0 }}
                initial={{ y: `100%` }}
                transition={{ duration: 0.4 }}
              >
                <SubTitle>
                  <Image src={starImg} alt="starImg" width={20} height={20} />
                  <span className="text">{subtitle}</span>
                  <Image src={starImg} alt="starImg" width={20} height={20} />
                </SubTitle>
              </m.div>
              <m.div
                animate={{ y: 0 }}
                initial={{ y: `100%` }}
                transition={{ duration: 0.5 }}
              >
                <Title>
                  {leftText} <span>{centerText} </span> {rightText}
                </Title>
              </m.div>
              <Description>{description}</Description>
              {waitlist ? (
                <CustomButton
                  lgWidth="40%"
                  bgSecondary
                  onClick={() => setOpen(true)}
                >
                  join waitlist
                </CustomButton>
              ) : (
                <Link href={href}>
                  <CustomButton lgWidth="40%" bgSecondary>
                    {btnText}
                  </CustomButton>
                </Link>
              )}
            </ContentWrapper>
          </m.div>
          <ImgWrapper>
            <Image src={heroImg} alt="EvenImg" width="500" height="300" />
          </ImgWrapper>
        </Grid>
      </Container>
    </Section>
  );
};

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: `100%`,
  width: `100%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  padding: `6rem 0`,

  '@media (max-width: 900px)': {
    padding: `6rem 0 2rem 0`,
  },
}));

const HeroButton = styled(`button`)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  padding: `1.2rem 3rem `,
  borderRadius: `0`,
  marginTop: `3rem`,
  border: `none`,
  fontFamily: `"Raleway", sans-serif`,
  fontWeight: `700`,
  textTransform: `uppercase`,

  '@media (max-width: 1020px)': {
    padding: `0.8rem 3rem`,
    marginTop: `1.4rem`,
    fontSize: `0.7rem`,
  },

  '@media (max-width: 768px)': {
    padding: `0.8rem`,
    width: `100%`,
    marginTop: `1.4rem`,
    fontSize: `0.7rem`,
  },
}));

const Grid = styled(Box)(({}) => ({
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: `2rem`,
  padding: `7rem 4rem 0 4rem`,

  '@media (max-width: 1020px)': {
    padding: `4rem 2rem`,
  },

  '@media (max-width: 900px)': {
    padding: `1rem`,

    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: `4rem`,
  },
}));

const ContentWrapper = styled(Box)(({}) => ({
  width: `100%`,
}));

const ImgWrapper = styled(`div`)(({}) => ({
  width: `100%`,

  img: {
    width: `100%`,
    height: `auto`,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  textTransform: `capitalize`,
  lineHeight: `1.1`,
  fontWeight: `700`,
  fontSize: `4.5rem`,
  marginTop: `2rem`,

  '@media (max-width: 1309px)': {
    fontSize: `4rem`,
  },

  '@media (max-width: 1020px)': {
    fontSize: `3rem`,
  },

  '@media (max-width: 900px)': {
    fontSize: `2rem`,
  },

  span: {
    color: theme.palette.secondary.main,
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  textTransform: `uppercase`,
  lineHeight: `28px`,
  letterSpacing: `6px`,
  display: `flex`,
  alignItems: `center`,
  fontSize: `1.2rem`,

  '@media (max-width: 1309px)': {
    fontSize: `1rem`,
  },

  '@media (max-width: 1020px)': {
    fontSize: `0.9rem`,
    textAlign: `center`,
  },

  '@media (max-width: 900px)': {
    fontSize: `0.5rem`,
    textAlign: `left`,
    letterSpacing: `4px`,
  },

  '.text': {
    margin: `0 16px`,
  },

  '.icon': {
    display: `block`,

    '@media (max-width: 900px)': {
      display: `none`,
    },
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  margin: `2rem 0`,
  fontSize: `1.2rem`,

  '@media (max-width: 1309px)': {
    fontSize: `1rem`,
  },

  '@media (max-width: 1020px)': {
    fontSize: `1.2rem`,
  },

  span: {
    margin: `0 16px`,
  },

  '@media (max-width: 900px)': {
    fontSize: `0.7rem`,
    marginTop: `1rem`,

    span: {
      margin: `0 2px`,
    },
  },
}));

export default HeroSection;
