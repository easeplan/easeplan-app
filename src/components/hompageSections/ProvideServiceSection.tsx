/* eslint-disable @typescript-eslint/no-use-before-define */

import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import evtImg002 from '@/public/evt002.png';
import evtImg005 from '@/public/evt005.png';
import evtImg006 from '@/public/evt006.png';
import Section from '../Section';
import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProvideServiceSection = () => {
  const control = useAnimation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start(`visible`);
    }
  }, [control, inView]);
  return (
    <Section subtitle="Provide Service" isBg>
      <Title>
        Become an <span> event planner or provide services </span> to help give
        every event a success story
      </Title>
      <EventImageGrid>
        <LargeImg>
          <Image src={evtImg002} alt="eventImg" width={400} height={400} />
        </LargeImg>
        <Grid>
          <Card>
            <Image src={evtImg005} alt="eventImg" width={500} height={400} />
            <p>
              Join the most talented and experienced event planners in the
              industry on our platform, and gain access to the tools and
              resources you need to showcase your expertise, connect with
              clients, and grow your business.
            </p>

            <Link href="/" className="button">
              Join Event Planners
            </Link>
          </Card>
          <Card>
            <Image src={evtImg006} alt="eventImg" width={500} height={200} />
            <p>
              Join our platform as a vendor and gain access to a broad network
              of event planners and customers. Use our vendor directory and
              communication tools to promote your services, build your brand,
              and take your business to the next level.
            </p>

            <Link href="/" className="button">
              Join Vendors
            </Link>
          </Card>
        </Grid>
      </EventImageGrid>
    </Section>
  );
};

const EventImageGrid = styled(`div`)(({}) => ({
  marginTop: `6rem`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: `2rem`,

  '@media (max-width: 1020px)': {
    marginTop: `3rem`,
    gridTemplateColumns: `repeat(1, 1fr)`,
  },

  '@media (max-width: 900px)': {
    marginTop: `3rem`,
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: `1rem`,
  },
}));

const LargeImg = styled(`div`)(({}) => ({
  width: `100%`,

  img: {
    width: `100%`,
    height: `100%`,
  },
}));

const Grid = styled(`div`)(({}) => ({
  position: `relative`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: `2rem`,

  '@media (max-width: 1020px)': {
    gridTemplateColumns: `repeat(2, 1fr)`,
    gap: `2rem`,
  },

  '@media (max-width: 900px)': {
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: `1rem`,
    backgroundSize: `100%`,
    marginTop: `3rem`,
  },
}));

const Card = styled(`div`)(({ theme }) => ({
  width: `100%`,

  img: {
    width: `100%`,
    height: `auto`,
  },

  p: {
    marginTop: `1rem`,
    marginBottom: `1rem`,
    letterSpacing: `0.25px`,
    padding: `1rem`,
    color: theme.palette.primary.main,
  },

  '.button': {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    padding: `1rem`,
    display: `block`,
    textAlign: `center`,
    fontWeight: `600`,
    textTransform: `capitalize`,
  },

  '@media (max-width: 1020px)': {},

  '@media (max-width: 900px)': {
    marginBottom: `2rem`,

    img: {
      width: `100%`,
      // height: `400px`,
    },

    p: {
      marginTop: `0.5rem`,
      marginBottom: `0.5rem`,
      padding: `0.7rem`,
      fontSize: `1rem`,
    },
  },
}));

const Title = styled(`h1`)(({ theme }) => ({
  textAlign: `center`,
  color: theme.palette.primary.main,
  textTransform: `capitalize`,
  fontWeight: `700`,
  fontSize: `2.5rem`,
  padding: `0 6rem`,
  marginBottom: `1rem`,

  '@media (max-width: 1020px)': {
    fontSize: `2rem`,
    padding: `0`,
  },

  '@media (max-width: 900px)': {
    fontSize: `1.5rem`,
    padding: `0`,
  },

  span: {
    color: theme.palette.secondary.main,
  },
}));

export default ProvideServiceSection;
