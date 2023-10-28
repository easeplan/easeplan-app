/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Logo from './Logo';
import { Box, Container } from '@mui/material';
import NavItem from './NavItem';
import MobileNav from './MobileNav';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CustomButton from './common/CustomButton';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <NavWrapper>
      <MobileNav show={toggleMenu} handleClick={handleClick} />
      <Container maxWidth="xl">
        <Flex>
          <Logo />
          <NavItemWrapper>
            <NavItem href="https://www.easeplan.io" text="Home" />
            <NavItem
              href="https://app.easeplan.io/user/findvendors"
              text="Find Vendors"
            />
            <NavItem href="/signup" text="Become a vendor" />
            <NavItem href="https://app.easeplan.io/login" text="Login" />
            <Link href="https://app.easeplan.io/signup">
              <CustomButton p="0 3rem" bgSecondary>
                Sign up
              </CustomButton>
            </Link>
          </NavItemWrapper>
          <MenuIcon className="menuIcon" onClick={handleClick} />
        </Flex>
        <MobileNav show={toggleMenu} handleClick={handleClick} />
      </Container>
    </NavWrapper>
  );
};

const NavWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: `flex`,
  alignItems: `center`,
  padding: `1rem 0`,
  position: `fixed`,
  width: `100%`,
  zIndex: `10`,

  '@media (max-width: 900px)': {
    padding: `0.8rem 0 `,
  },
}));

const Flex = styled(Box)(({ theme }) => ({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  padding: `0 4rem`,

  '@media (max-width: 1020px)': {
    padding: ` 0 `,
  },

  '.menuIcon': {
    color: theme.palette.secondary.main,
    display: `none`,
    cursor: `pointer`,

    '@media (max-width: 1020px)': {
      display: `block`,
      fontSize: `2rem`,
    },
  },
}));

const NavItemWrapper = styled(Box)({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,

  '@media (max-width: 1020px)': {
    display: `none`,
  },
});

export default Navbar;
