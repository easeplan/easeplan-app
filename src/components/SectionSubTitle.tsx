/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import starImg from '@/public/Star.png';
import Image from 'next/image';

interface TitleProps {
  subTitle: string;
}

const SectionSubTitle = ({ subTitle }: TitleProps) => {
  return (
    <TitleStyle>
      <SubTitle>
        <Image src={starImg} alt="starImg" width={20} height={20} />
        {` `}
        <span>{subTitle}</span>
        {` `}
        <Image src={starImg} alt="starImg" width={20} height={20} />
      </SubTitle>
    </TitleStyle>
  );
};

const TitleStyle = styled(`div`)(({}) => ({
  textAlign: `center`,
  marginTop: `5rem`,
  marginBottom: `3rem`,

  '@media (max-width: 900px)': {
    marginTop: `1rem`,
    marginBottom: `1rem`,
  },
}));

const SubTitle = styled(`p`)(({ theme }) => ({
  textAlign: `center`,
  color: theme.palette.primary.main,
  textTransform: `uppercase`,
  lineHeight: `28px`,
  letterSpacing: `6px`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  fontSize: `1rem`,
  marginBottom: `1rem`,

  '@media (max-width: 900px)': {
    letterSpacing: `3px`,
    fontSize: `0.8rem`,
    marginBottom: `1rem`,
  },
  span: {
    margin: `0 16px`,
  },
}));
export default SectionSubTitle;
