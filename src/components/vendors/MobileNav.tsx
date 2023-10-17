/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import NavItem from '../NavItem';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import CustomButton from '../common/CustomButton';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '@/features/authSlice';
import axios from 'axios';

type MobileNavProp = {
  show: boolean;
  handleClick: () => void;
  userInfo?: any;
};

const MobileNav = ({ show, userInfo, handleClick }: MobileNavProp) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handledLogin = () => {
    router.push(`/login`);
    if (typeof window !== `undefined`) {
      localStorage.setItem(`lastVisitedURL`, `/account/profile`);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_NEXT_API}/api/logout`);
      dispatch(clearCredentials());
    } catch (error: any) {}
  };

  const handledBecomeAVendor = () => {
    if (userInfo) {
      router.push(`/account/onboarding`);
    } else {
      router.push(`/login`);
      if (typeof window !== `undefined`) {
        localStorage.setItem(`lastVisitedURL`, `/account/onboarding`);
      }
    }
  };

  return (
    <MobileWrapper
      style={{
        transform: `${show ? `translateX(0%)` : `translateX(-100%)`}`,
        zIndex: `99`,
      }}
    >
      {!userInfo ? (
        <>
          <Link href="/signup">
            <Button
              type="button"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handledLogin}
            >
              Sign up
            </Button>
          </Link>
          <div></div>
          <Button
            type="button"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handledLogin}
          >
            Login
          </Button>
          <div></div>
          <Button
            onClick={handledBecomeAVendor}
            variant="outlined"
            sx={{
              backgroundColor: `primary.main`,
              color: `secondary.main`,
              borderColor: `primary.main`,
              textTransform: `inherit`,
              mt: 2,
              '&:hover': {
                borderColor: `secondary.main`,
                color: `primary.main`,
                backgroundColor: `secondary.main`,
              },
            }}
          >
            Become a vendor
          </Button>
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
  position: `fixed`,
  top: `0`,
  left: `0`,
  height: `100vh`,
  transition: `0.3s all ease`,
  width: `100%`,
  paddingTop: `6rem`,
  paddingLeft: `3rem`,
  paddingRight: `3rem`,
  overflowX: `auto`,
  zIndex: `99`,

  '.menuIcon': {
    position: `absolute`,
    top: `2rem`,
    right: `2rem`,
    color: theme.palette.primary.main,
    display: `none`,
    cursor: `pointer`,

    '@media (max-width: 1020px)': {
      display: `block`,
      fontSize: `2rem`,
    },
  },

  '@media (min-width: 1020px)': {
    display: `none`,
  },
}));

export default MobileNav;
