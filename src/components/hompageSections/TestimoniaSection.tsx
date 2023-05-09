/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import evtImg007 from '@/public/evt007.png';
import Section from '../Section';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TestimoniaSection = () => {
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
      <Section subtitle="Testimonials">
        <Title>
          Ours services has <span> a lot of people talking </span> about us
        </Title>
        <EventImageGrid>
          <Content>
            <QuoteIcon />
            <Text>
              It&apos;s awesome service. Land from day very fill that midst
              stars one dominion. Itself was let that divided itself god
              don&apos;t subdue wherein let behold over he whose of sea moved
              called. It’s service. Land from day very fill that midst stars one
              dominion.
            </Text>
            <TextFlex>
              <div>
                <p className="name">John Deo</p>
                <p className="title">CEO of DiNO</p>
              </div>
            </TextFlex>
          </Content>
          <LargeImg>
            <Image src={evtImg007} alt="eventImg" width={400} height={400} />
          </LargeImg>
        </EventImageGrid>
      </Section>
    </motion.div>
  );
};

const EventImageGrid = styled(`div`)(({}) => ({
  marginTop: `6rem`,
  display: `grid`,
  alignItems: `center`,
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
    height: `100%`,
  },
}));

const Content = styled(`div`)(({}) => ({}));

const TextFlex = styled(`div`)(({}) => ({
  '.name': {
    marginTop: `1rem`,
    fontSize: `1.2rem`,
  },

  '.title': {
    marginTop: `0.3rem`,
    fontWeight: `600`,
    color: `#73877B`,
    fontSize: `0.8rem`,
  },
}));

const Text = styled(`p`)(({ theme }) => ({
  marginTop: `2rem`,
  fontSize: `20px`,
  color: theme.palette.primary.main,
}));

const Title = styled(`h1`)(({ theme }) => ({
  textAlign: `center`,
  color: theme.palette.primary.main,
  textTransform: `capitalize`,
  fontWeight: `700`,
  fontSize: `2.5rem`,
  marginBottom: `3rem`,

  '@media (max-width: 1020px)': {
    fontSize: `2rem`,
  },

  '@media (max-width: 900px)': {
    fontSize: `1.5rem`,
  },

  span: {
    color: theme.palette.secondary.main,
  },
}));

function QuoteIcon(_props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      width="39"
      height="33"
      viewBox="0 0 59 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.7026 10.8181C25.1781 10.1994 25.7968 8.43832 25.1305 7.01046L22.7983 2.10811C22.132 0.72831 20.5137 0.109091 19.0858 0.72831C15.0402 2.44175 11.5657 4.67875 8.80519 7.3917C5.4259 10.5801 3.14131 14.245 1.90382 18.2906C0.666339 22.3843 0 27.9525 0 35.0443V49.6561C0 51.2268 1.28508 52.5119 2.85574 52.5119H21.5608C23.1315 52.5119 24.4165 51.2268 24.4165 49.6561V30.9511C24.4165 29.3799 23.1315 28.0953 21.5608 28.0953H12.6128C12.708 23.2877 13.8503 19.4329 15.9445 16.5291C17.658 14.1979 20.2281 12.294 23.7026 10.8181Z"
        fill="#0F3443"
      />
      <path
        d="M57.3049 10.8181C58.7804 10.1994 59.3987 8.43837 58.7328 7.0105L56.4006 2.15622C55.7343 0.775949 54.116 0.157206 52.6881 0.775949C48.6901 2.48939 45.2628 4.72638 42.4551 7.39174C39.0753 10.6282 36.7436 14.2931 35.5057 18.3387C34.2682 22.3363 33.6499 27.9054 33.6499 35.0448V49.6566C33.6499 51.2273 34.935 52.5124 36.5056 52.5124H55.2107C56.7814 52.5124 58.0665 51.2273 58.0665 49.6566V30.9516C58.0665 29.3804 56.7814 28.0958 55.2107 28.0958H46.2151C46.3103 23.2882 47.4531 19.4334 49.5468 16.5296C51.2603 14.1979 53.8304 12.2941 57.3049 10.8181Z"
        fill="#0F3443"
      />
    </svg>
  );
}
export default TestimoniaSection;
