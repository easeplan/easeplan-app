/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import Section from './Section';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Evt013 from '@/public/evt013.png';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const data = [
  {
    id: 1,
    title: `Get started by Filling out the forms with your personal details, verify where necessary`,
    text: `We would like to know you, tell us more about you, this is to ensure our clients are in safe hands and quality jobs are delivered. we have a brand to protect.`,
  },
  {
    id: 2,
    title: `Create a three way budget friendly costing `,
    text: `Provide high-quality services at every price point. No hourly rates, just project-based pricing.`,
  },
  {
    id: 3,
    title: `Deliver Quality jobs quickly with the duration specified`,
    text: `Always be online to respond to potential clients quickly, Be seen so you can go into work quickly with your team.`,
  },
  {
    id: 4,
    title: `Protected payments, every time`,
    text: `clients will pay upfront. 50% payment will be approved to organize and 50% will be approve when the job is done.`,
  },
  {
    id: 5,
    title: `24/7 support`,
    text: `Questions? Our round-the-clock support team is available to help anytime, anywhere.`,
  },
];

const QuickGuideSection = () => {
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
      <Section subtitle="quick guide">
        <Title>A quick guide to get you started</Title>

        <Grid>
          <Image src={Evt013} alt="Planners Image" width={400} height={300} />
          <Content>
            {data.map((list) => (
              <div key={list.id} className="flex">
                <h3 className="title">{list.title}</h3>
                <p> {list.text}</p>
              </div>
            ))}
          </Content>
        </Grid>

        <Center>
          <ButtonStyled>GET STARTED</ButtonStyled>
        </Center>
      </Section>
    </motion.div>
  );
};

const Grid = styled(`div`)({
  marginTop: `6rem`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: `4rem`,

  '@media (max-width: 1020px)': {
    marginTop: `3rem`,
    gridTemplateColumns: `repeat(2, 1fr)`,
  },

  '@media (max-width: 900px)': {
    marginTop: `3rem`,
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: `1rem`,
  },

  img: {
    width: `100%`,
    height: `auto`,
  },
});

const Center = styled(`center`)(({}) => ({}));

const ButtonStyled = styled(`button`)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  padding: `1rem 4rem `,
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

const Content = styled(`div`)(({ theme }) => ({
  width: `100%`,
  color: theme.palette.primary.main,

  '.flex': {
    marginBottom: `2rem`,

    '.title': {
      marginBottom: `1rem`,
    },
  },

  '.icon': {
    fontSize: `1.5rem`,
    marginRight: `1rem`,
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

export default QuickGuideSection;
