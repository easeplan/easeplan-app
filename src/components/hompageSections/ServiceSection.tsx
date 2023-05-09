/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { serviceData } from '@/lib/data';
import Section from '../Section';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Box } from '@mui/material';

const ServiceSection = () => {
  const control = useAnimation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start(`visible`);
    }
  }, [control, inView]);

  return (
    <Section subtitle="You focus on yourself">
      <Box>
        <Title>
          Focus on Being the <span>HOST while we</span> Focus on your <br /> BIG
          DAY
        </Title>
      </Box>
      <Description>
        Never worry about your special events. Our platform connects event
        owners to top event planners and vendors. Whether you need to find a
        specific service provider or manage all aspects of your event, we have
        you covered.
      </Description>

      <Grid>
        {serviceData.map((data) => (
          <Card key={data.id}>
            <Image src={data.icon} alt="icons" height={54} width={54} />
            <h3>{data.title}</h3>
            <p>{data.discription}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

const Title = styled(`h1`)(({ theme }) => ({
  textAlign: `center`,
  color: theme.palette.primary.main,
  textTransform: `capitalize`,
  fontWeight: `700`,
  fontSize: `2.5rem`,
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

const Description = styled(`p`)(({ theme }) => ({
  width: `70%`,
  textAlign: `center`,
  fontWeight: `700`,
  lineHeight: `30px`,
  margin: `1rem auto 2rem auto`,
  fontSize: `1.2rem`,
  color: theme.palette.primary.main,

  '@media (max-width: 1020px)': {
    width: `70%`,
    fontSize: `1rem`,
    lineHeight: `20px`,
    margin: `1rem auto`,
  },

  '@media (max-width: 900px)': {
    width: `100%`,
    fontSize: `0.8rem`,
    margin: `1rem auto`,
  },
}));

const Grid = styled(`div`)(({}) => ({
  marginTop: `6rem`,
  position: `relative`,
  backgroundImage: `url(./bgShape.png)`,
  backgroundPosition: `center`,
  backgroundSize: `50%`,
  backgroundRepeat: `no-repeat`,
  display: `grid`,
  gridTemplateColumns: `repeat(3, 1fr)`,
  gap: `4rem`,

  '@media (max-width: 1020px)': {
    gridTemplateColumns: `repeat(2, 1fr)`,
    gap: `2rem`,
  },

  '@media (max-width: 900px)': {
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: `2rem`,
    backgroundSize: `100%`,
    marginTop: `3rem`,
  },
}));

const Card = styled(`div`)(({ theme }) => ({
  padding: `2.5rem 3rem`,
  width: `100%`,
  boxShadow: `0px 10px 40px rgba(0, 0, 0, 0.08)`,
  background: theme.palette.background.default,

  h3: {
    marginTop: `2rem`,
    fontWeight: `700`,
    color: theme.palette.primary.main,
  },

  p: {
    marginTop: `1rem`,
    color: `#73877B`,
  },

  '@media (max-width: 1320px)': {
    padding: `2rem`,
  },
}));

export default ServiceSection;
