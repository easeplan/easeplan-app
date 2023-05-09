/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import evtImg001 from '@/public/evt001.png';
import evtImg003 from '@/public/evt003.png';
import Section from '../Section';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EventSection = () => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start(`visible`);
    }
  }, [control, inView]);
  return (
    <motion.div
      ref={ref}
      variants={{
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        hidden: { opacity: 0, scale: 0 },
      }}
      initial="hidden"
      animate={control}
    >
      <Section subtitle="Events at your Comfort" isBg>
        <Title>
          We Bring <span> Once in a lifetime </span> moment
        </Title>
        <EventImageGrid>
          <LargeImg>
            <Image src={evtImg001} alt="eventImg" width={400} height={400} />
          </LargeImg>
          <ImgFlex>
            <Image src={evtImg003} alt="eventImg" width={400} height={400} />
          </ImgFlex>
        </EventImageGrid>
      </Section>
    </motion.div>
  );
};

const EventImageGrid = styled(`div`)(({}) => ({
  marginTop: `6rem`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: `2rem`,

  '@media (max-width: 1020px)': {
    marginTop: `3rem`,
    gridTemplateColumns: `repeat(2, 1fr)`,
  },

  '@media (max-width: 900px)': {
    marginTop: `3rem`,
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: `1rem`,
  },
}));

const LargeImg = styled(`div`)(({}) => ({
  width: `100%`,
  // height: `600px`,

  img: {
    width: `100%`,
    height: `100%`,
  },
}));

const ImgFlex = styled(`div`)(({}) => ({
  // display: `flex`,
  width: `100%`,

  img: {
    width: `100%`,
    height: `100%`,
  },
}));

const Title = styled(`h1`)(({ theme }) => ({
  textAlign: `center`,
  color: theme.palette.primary.main,
  textTransform: `capitalize`,
  fontWeight: `700`,
  lineHeight: `28px`,
  fontSize: `3rem`,
  marginBottom: `1rem`,

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

export default EventSection;
