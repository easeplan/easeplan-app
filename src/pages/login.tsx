/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { styled } from '@mui/material/styles';
import LoginImg from '@/public/loginImg.png';
import LoginBg from '@/public/decoration.png';
import Image from 'next/image';
import LoginForm from '@/components/LoginForm';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (userInfo) {
  //     router.push(`/account`);
  //   }
  // }, [router, userInfo]);

  return (
    <>
      <Navbar />
      <Main>
        <ImageSection>
          <ImgBanner>
            <Title>
              save you time, energy, and ensure you stay within budget
            </Title>
            <Image
              src={LoginImg}
              className="imgStyle"
              alt="logoImg"
              width={400}
              height={350}
            />
          </ImgBanner>
        </ImageSection>
        <FormSection>
          <LoginForm />
        </FormSection>
        <Image
          src={LoginBg}
          className="bgimgStyle"
          alt="logoImg"
          width={400}
          height={400}
        />
      </Main>
    </>
  );
};

const Main = styled(`main`)({
  height: `100vh`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,

  '@media (max-width: 1020px)': {
    marginTop: `0rem`,
    gridTemplateColumns: `repeat(1, 1fr)`,
  },

  '@media (max-width: 900px)': {
    marginTop: `0rem`,
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: `1rem`,
  },

  '.bgimgStyle': {
    position: `fixed`,
    bottom: `0`,
    left: `0`,
    width: `25%`,
    height: `auto`,

    '@media (max-width: 1020px)': {
      width: `20%`,
      height: `auto`,
    },
    '@media (max-width: 900px)': {
      display: `none`,
    },
  },
});

const ImageSection = styled(`div`)(({ theme }) => ({
  width: `100%`,
  height: `100vh`,
  background: theme.palette.primary.main,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,

  '@media (max-width: 1020px)': {
    display: `none`,
  },
}));

const ImgBanner = styled(`div`)({
  width: `70%`,
  height: `70vh`,
  marginTop: `4rem`,
  background: `rgba(183, 233, 246, 0.25)`,
  backdropFilter: `blur(13px)`,
  borderRadius: `1rem`,
  padding: `2.5rem`,
  color: `#fff`,
  position: `relative`,
  zIndex: `9`,

  '.imgStyle': {
    position: `absolute`,
    bottom: `0`,
    left: `4rem`,
    width: `55%`,
    height: `auto`,
  },
});

const Title = styled(`h4`)({
  fontWeight: `700`,
  fontSize: `1.5rem`,
});

const FormSection = styled(`div`)({
  width: `100%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,

  '@media (max-width: 1020px)': {
    height: `100%`,
  },
});

export default LoginPage;
