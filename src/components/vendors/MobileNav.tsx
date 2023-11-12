/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import NavItem from '../NavItem';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import CustomButton from '../common/CustomButton';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '@/features/authSlice';
import axios from 'axios';
import theme from '@/styles/theme';

type MobileNavProp = {
  show: boolean;
  handleClick: () => void;
  userInfo?: any;
  data: any;
};

const MobileNav = ({ show, userInfo, data, handleClick }: MobileNavProp) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      dispatch(clearCredentials());
      router.push('/user/findvendors');
    } catch (error: any) {}
  };

  const handledBecomeAVendor = () => {
    if (userInfo) {
      router.push('/account/onboarding');
    } else {
      router.push('/login');
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastVisitedURL', '/account/onboarding');
      }
    }
  };

  const handledLoginRoute = () => {
    router.push('/login');
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastVisitedURL', '/findVendors');
    }
  };

  const handledRegRoute = () => {
    router.push('/signup');
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastVisitedURL', '/findVendors');
    }
  };

  console.log(data?.providerProfile);

  return (
    <MobileWrapper
      style={{
        transform: `${show ? 'translateX(0%)' : 'translateX(-100%)'}`,
        zIndex: '99',
      }}
    >
      {!userInfo ? (
        <>
          <NavItem href="https://www.easeplan.io/" text="Home" />
          <NavItem
            href="https://app.easeplan.io/findvendors"
            text="Find Vendors"
          />
          {!data?.providerProfile && (
            <ItemWrapper onClick={handledBecomeAVendor}>
              <Typography>
                <span className="capsize md:text-1xl">Become a vendor</span>
              </Typography>
            </ItemWrapper>
          )}

          <ItemWrapper onClick={handledLoginRoute}>
            <Typography>
              <span className="capsize md:text-1xl">Login</span>
            </Typography>
          </ItemWrapper>
          <CustomButton onClick={handledRegRoute} bgSecondary>
            SIGN UP
          </CustomButton>
        </>
      ) : (
        <>
          <NavItem href="/account" text="Dashboard" />
          {!data?.providerProfile && (
            <ItemWrapper onClick={handledBecomeAVendor}>
              <Typography>
                <span className="capsize md:text-1xl">Become a vendor</span>
              </Typography>
            </ItemWrapper>
          )}
          <ItemWrapper onClick={handleLogout}>
            <Typography>
              <span className="capsize md:text-1xl">Log out</span>
            </Typography>
          </ItemWrapper>
        </>
      )}
      <CloseIcon className="menuIcon" onClick={handleClick} />
    </MobileWrapper>
  );
};

const ItemWrapper = styled('li')({
  listStyle: 'none',
  marginRight: '2.5rem',
  marginBottom: '2rem',
  color: theme.palette.secondary.light,
  textTransform: 'uppercase',
  lineHeight: '16px',
  letterSpacing: '0.0125em',
  fontSize: '0.8rem',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  transition: '0.1s all ease',

  '@media (max-width: 1025px)': {
    marginRight: '2rem',
  },

  '@media (max-width: 1020px)': {
    color: theme.palette.primary.main,
    lineHeight: '5rem',
    fontSize: '1.2rem',
    transition: '0.5s all ease',

    '&:hover': {
      opacity: '0.8',
      paddingLeft: '1rem',
      fontWeight: 'bold',
    },
  },
});

const MobileWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.light,
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100vh',
  transition: '0.3s all ease',
  width: '100%',
  paddingTop: '6rem',
  paddingLeft: '3rem',
  paddingRight: '3rem',
  overflowX: 'auto',
  zIndex: '99',

  '.menuIcon': {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    color: theme.palette.primary.main,
    display: 'none',
    cursor: 'pointer',

    '@media (max-width: 1020px)': {
      display: 'block',
      fontSize: '2rem',
    },
  },

  '@media (min-width: 1020px)': {
    display: 'none',
  },
}));

export default MobileNav;
