/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import NavItem from './NavItem';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import CustomButton from './common/CustomButton';

type MobileNavProp = {
  show: boolean;
  handleClick: () => void;
};

const MobileNav = ({ show, handleClick }: MobileNavProp) => {
  return (
    <MobileWrapper
      style={{
        transform: `${show ? `translateX(0%)` : `translateX(-100%)`}`,
        zIndex: `99`,
      }}
    >
      <NavItem href="https://www.easeplan.io/" text="Home" />
      <NavItem href="https://www.easeplan.io/planner" text="Join planners" />
      <NavItem href="https://www.easeplan.io/vendor" text="Join vendors" />
      <NavItem href="/login" text="Login" />
      <Link href="/signup">
        <CustomButton bgSecondary>SIGN UP</CustomButton>
      </Link>
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
  padding: `3rem`,
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
