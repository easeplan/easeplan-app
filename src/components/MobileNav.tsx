/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import NavItem from './NavItem';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import CustomButton from './common/CustomButton';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '@/features/authSlice';
import axios from 'axios';
import { useAuth } from '@/hooks/authContext';

type MobileNavProp = {
  show: boolean;
  handleClick: () => void;
  userInfo?: any;
  publicId?: any;
};

const MobileNav = ({
  show,
  userInfo,
  publicId,
  handleClick,
}: MobileNavProp) => {
  const { setUser } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const handledLogin = () => {
    router.push('/login');
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastVisitedURL', `/account/profile/${publicId}`);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      dispatch(clearCredentials());
      setUser(null);
      router.push('/user/findvendors');
    } catch (error: any) {}
  };

  return (
    <MobileWrapper
      style={{
        transform: `${show ? 'translateX(0%)' : 'translateX(-100%)'}`,
        zIndex: '99',
      }}
    >
      {!userInfo ? (
        <>
          <NavItem href="https://www.easeplan.io" text="Home" />
          <NavItem
            href="https://app.easeplan.io/findvendors"
            text="Find Vendors"
          />
          <NavItem href="/signup" text="Become a vendor" />
          <NavItem href="https://app.easeplan.io/login" text="Login" />
          <Link href="https://app.easeplan.io/signup">
            <CustomButton bgSecondary>SIGN UP</CustomButton>
          </Link>
        </>
      ) : (
        <>
          <NavItem href="#" text="Logout" onClick={handleLogout} />
          <NavItem href="/account" text="Dashboard" />
        </>
      )}
      <CloseIcon className="menuIcon" onClick={handleClick} />
    </MobileWrapper>
  );
};

const MobileWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.light,
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100vh',
  transition: '0.3s all ease',
  width: '100%',
  padding: '3rem',
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
