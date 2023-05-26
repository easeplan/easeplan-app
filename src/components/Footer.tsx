/* eslint-disable @typescript-eslint/no-use-before-define */
// import theme from '@/styles/theme';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from './Logo';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterSection>
      <Container fixed>
        <FooterContent>
          <Grid>
            <div className="logoContainer">
              <div className="logoWrapper">
                <Logo />
              </div>
              <Typography mt={2} color="secondary.light">
                Plan fantastic events with ease using Easeplan. Our platform
                helps you find the best service providers, event planners, and
                vendors, simplifying the event planning process in one
                easy-to-use platform.
              </Typography>
            </div>
            <List>
              <div>
                <p className="title">Company</p>
                <div className="list">
                  <Link href="/">About us</Link>
                  {/* <Link href="/blog">Blog</Link> */}
                  <Link href="/">Contact Support</Link>
                  <Link href="/">Terms and Conditions</Link>
                  <Link href="/">Privacy Policy</Link>
                </div>
              </div>
            </List>
            {/* <List>
              <p className="title">Community</p>
              <div className="list">
                <Link href="/">Events</Link>
                <Link href="/">Blogs</Link>
                <Link href="/">Forum</Link>
                <Link href="/">Become vendor</Link>
              </div>
            </List> */}
            <List>
              <div>
                <p className="title">Top Services</p>
                <div className="list">
                  <Link href="/">Events Planners</Link>
                  <Link href="/">Photographer</Link>
                  <Link href="/">Dj</Link>
                  <Link href="/">Catering</Link>
                  <Link href="/">Make-up Artist</Link>
                  <Link href="/">Event decorator</Link>
                  <Link href="/">Security personnel</Link>
                </div>
              </div>
            </List>
            <List>
              <div>
                <div className="iconFlex">
                  <Link
                    href="https://www.facebook.com/easeplan.io/"
                    target="_blank"
                  >
                    <FaFacebook className="icon" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/easeplan.io/"
                    target="_blank"
                  >
                    <FaInstagram className="icon" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/easeplan/"
                    target="_blank"
                  >
                    <FaLinkedin className="icon" />
                  </Link>
                  <Link
                    href="https://twitter.com/easeplan_team"
                    target="_blank"
                  >
                    <FaTwitter className="icon" />
                  </Link>
                </div>
                <p>easeplan.team@gmail.com</p>
              </div>
              {/* <p style={{ marginTop: `1rem` }}>+234 XXXXXXXX</p> */}
            </List>
          </Grid>
        </FooterContent>
        <BottomFooter>
          &copy; {new Date().getFullYear()} EasePlan & Co. All rights reserved
        </BottomFooter>
      </Container>
    </FooterSection>
  );
};

const FooterSection = styled(`section`)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: `3rem 0 1rem 0`,
}));

const BottomFooter = styled(`section`)(({ theme }) => ({
  padding: `3rem 0 1rem 0`,
  textAlign: `center`,
  color: theme.palette.common.white,
}));

const Newsletter = styled(`div`)(({}) => ({
  backgroundColor: `#73877B`,
  padding: `3rem`,

  '@media (max-width: 1020px)': {
    padding: `2rem`,
  },

  '@media (max-width: 900px)': {
    padding: `1rem`,
  },
}));

const FooterContent = styled(`div`)(({}) => ({
  padding: `2rem 0`,
  marginTop: `3rem`,

  '@media (max-width: 1020px)': {
    padding: `2rem`,
  },

  '@media (max-width: 900px)': {
    padding: `1rem`,
  },
}));

const Grid = styled(`div`)(({}) => ({
  display: `grid`,
  gridTemplateColumns: `repeat(4, 1fr)`,
  alignItems: `start`,
  gap: `2rem`,

  '@media (max-width: 1020px)': {
    gridTemplateColumns: `repeat(2, 1fr)`,
    gap: `2rem`,
  },

  '@media (max-width: 900px)': {
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: `2rem`,

    '.logoContainer': {
      textAlign: `center`,
    },
    '.logoWrapper': {
      width: `100px`,
      display: `none`,
    },
  },
}));

const List = styled(`div`)(({ theme }) => ({
  color: `#fff`,
  display: `flex`,
  alignItems: `end`,
  justifyContent: `end`,

  '.list': {
    display: `flex`,
    flexDirection: `column`,

    a: {
      lineHeight: `2.5`,
      color: `#fff`,
    },
  },

  '.iconFlex': {
    display: `flex`,

    '.icon': {
      fontSize: `1.7rem`,
      color: theme.palette.secondary.main,
      marginRight: `1.5rem`,
      marginBottom: `1rem`,
    },
  },

  '.title': {
    color: theme.palette.secondary.main,
    fontWeight: `700`,
    fontSize: `1rem`,
    marginBottom: `1rem`,
  },

  '@media (max-width: 1020px)': {
    padding: `2rem`,
  },

  '@media (max-width: 900px)': {
    padding: `1rem`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    textAlign: `center`,
  },
}));

const Title = styled(`h2`)(({ theme }) => ({
  fontWeight: `3rem`,
  color: theme.palette.primary.main,
  textAlign: `center`,

  '@media (max-width: 1020px)': {
    fontSize: `1.5rem`,
  },

  '@media (max-width: 900px)': {
    fontSize: `1rem`,
  },
}));

const FormWrapper = styled(`div`)(({}) => ({
  backgroundColor: `#73877B`,
  padding: `3rem`,
  width: `70%`,
  margin: `0 auto`,
  display: `flex`,
  flexDirection: `row`,

  '@media (max-width: 1020px)': {
    flexDirection: `column`,
    width: `100%`,
    padding: `0`,
    marginTop: `2rem`,
  },

  '@media (max-width: 900px)': {
    flexDirection: `column`,
    width: `100%`,
    padding: `0`,
    marginTop: `1rem`,
  },
}));

const Input = styled(`input`)(({ theme }) => ({
  padding: `1rem`,
  width: `100%`,
  marginRight: `1rem`,

  '&::placeholder': {
    color: theme.palette.primary.main,
  },

  '@media (max-width: 1020px)': {
    marginBottom: `1rem`,
    marginRight: `0`,
  },

  '@media (max-width: 900px)': {
    marginTop: `1rem`,
    marginRight: `0`,
  },
}));

const Button = styled(`button`)(({ theme }) => ({
  padding: `1rem 3rem`,
  textTransform: `uppercase`,
  fontWeight: `600`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  border: `transparent`,
}));

export default Footer;
