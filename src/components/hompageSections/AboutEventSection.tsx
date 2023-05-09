/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import evtImg004 from '@/public/evt004.png';
import { BiCheckDouble } from 'react-icons/bi';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const eventData = [
  {
    id: 1,
    text: `Match you with the best event planners and vendors based on your needs and preferences.`,
  },
  {
    id: 2,
    text: `Provide a directory of vendors with detailed profiles and reviews.`,
  },
  {
    id: 3,
    text: `Use communication tools to help you stay in touch with your event planner and vendors.`,
  },
  {
    id: 4,
    text: `Offer payment processing services to ensure secure and easy financial transactions`,
  },
  {
    id: 5,
    text: `Provide a calendar and scheduling system to help you keep track of important dates and deadlines.`,
  },
  {
    id: 6,
    text: `Offer a rating system to provide feedback from satisfied clients`,
  },
];

interface dataProps {
  id: number;
  text: string;
}

const AboutEventSection = () => {
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
      <Section>
        <Container fixed>
          <Title>Talk to us about your event</Title>
          <EventImageGrid>
            <LargeImg>
              <Image src={evtImg004} alt="eventImg" width={400} height={400} />
            </LargeImg>
            <Content>
              <Text>
                To organize your event, we only need your budget, location, and
                date. We will then:
              </Text>
              <List>
                {eventData?.map((list: dataProps) => (
                  <div className="flex" key={list.id}>
                    <div>
                      <BiCheckDouble className="icon" />
                    </div>
                    <p>{list.text}</p>
                  </div>
                ))}
              </List>
            </Content>
          </EventImageGrid>
          <Center>
            <Link href="/" className="button">
              Get Started
            </Link>
          </Center>
        </Container>
      </Section>
    </motion.div>
  );
};

const Section = styled(`section`)(({ theme }) => ({
  background: theme.palette.background.default,
  height: `100%`,
  width: `100%`,
  padding: `4rem 4rem`,
  '@media (max-width: 900px)': {
    padding: `2rem 1rem`,
  },
}));

const EventImageGrid = styled(`div`)(({}) => ({
  marginTop: `6rem`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: `6rem`,

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

  img: {
    width: `100%`,
    height: `auto`,
  },
}));

const Content = styled(`div`)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const Center = styled(`center`)(({ theme }) => ({
  marginTop: `6rem`,

  '.button': {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    padding: `1rem 6rem`,
    fontWeight: `600`,
    textTransform: `uppercase`,

    '@media (max-width: 900px)': {
      padding: `0.7rem 3rem`,
    },
  },
}));

const Text = styled(`p`)(({}) => ({
  marginBottom: `2rem`,
  fontWeight: `600`,
  fontSize: `20px`,
}));

const List = styled(`div`)(({}) => ({
  '.flex': {
    display: `flex`,
    alignItems: `center`,
    marginBottom: `1rem`,

    '.icon': {
      fontSize: `1.5rem`,
      marginRight: `0.5rem`,
    },
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

export default AboutEventSection;
