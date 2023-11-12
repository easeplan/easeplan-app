/* eslint-disable @typescript-eslint/no-use-before-define */
import Navbar from '@/components/Navbar';
import { styled } from '@mui/material/styles';
import EmailForm from '@/components/ForgetPassword/EmailForm';

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <Main>
        <FormSection>
          <EmailForm />
        </FormSection>
      </Main>
    </>
  );
};

const Main = styled('main')({
  height: '100vh',
  display: 'flex',
  width: '100%',
  background: 'rgba(183, 233, 246, 0.25)',
  backdropFilter: 'blur(13px)',

  '@media (max-width: 1020px)': {
    marginTop: '0rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
  },

  '@media (max-width: 900px)': {
    marginTop: '0rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem',
  },

  '.bgimgStyle': {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '25%',
    height: 'auto',

    '@media (max-width: 1020px)': {
      width: '20%',
      height: 'auto',
    },
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
});

const FormSection = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (max-width: 1020px)': {
    height: '100%',
  },
});

export default LoginPage;
