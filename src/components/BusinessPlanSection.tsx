/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import Section from './Section';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Evt012 from '@/public/evt012.png';
import { BiCheckDouble } from 'react-icons/bi';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const data = [
  {
    id: 1,
    text: `Create a profile and portfolio to showcase your expertise, experience, and past events.`,
  },
  {
    id: 2,
    text: `Connect with clients and respond to event requests through the platform's communication tools.`,
  },
  {
    id: 3,
    text: `Manage events and track progress through the platform's calendar and scheduling system`,
  },
  {
    id: 4,
    text: `Access the vendor directory to find and hire vendors for events`,
  },
  {
    id: 5,
    text: `Process payments securely and easily through the platform's payment processing system`,
  },
  {
    id: 6,
    text: `Get reviews and ratings from clients to build a reputation and improve your services`,
  },
  {
    id: 7,
    text: `Engage with the platform's community of event planners to share ideas, advice, and best practices.`,
  },
];

const BusinessPlanSection = () => {
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
      <Section subtitle="easyplan business" isBg>
        <Title>
          Business designed to enhance <span>teamwork</span>
        </Title>

        <Grid>
          <Content>
            <h3>Millions of potential clients at your fingertips</h3>
            {data.map((list) => (
              <div className="flex" key={list.id}>
                <div>
                  <BiCheckDouble className="icon" />
                </div>
                <p> {list.text}</p>
              </div>
            ))}
            <ButtonStyled>GET STARTED</ButtonStyled>
          </Content>
          <Image src={Evt012} alt="Planners Image" width={400} height={300} />
        </Grid>
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

const Content = styled(`div`)(({ theme }) => ({
  width: `100%`,
  color: theme.palette.primary.main,

  '.flex': {
    display: `flex`,
    alignItems: `center`,
    marginTop: `2rem`,
  },

  '.icon': {
    fontSize: `1.5rem`,
    marginRight: `1rem`,
  },
}));

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
    margin: `2rem 0`,
    fontSize: `0.7rem`,
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

export default BusinessPlanSection;
