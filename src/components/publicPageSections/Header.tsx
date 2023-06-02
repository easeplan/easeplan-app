/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Logo from '../Logo';
import { Box, Container } from '@mui/material';
import NavItem from '../NavItem';
import MobileNav from '../MobileNav';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CustomButton from '../common/CustomButton';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '@/features/authSlice';
import axios from 'axios';

const Header = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_NEXT_API}/api/logout`);
      dispatch(clearCredentials());
    } catch (error: any) {}
  };

  return (
    <NavWrapper>
      <MobileNav show={toggleMenu} handleClick={handleClick} />
      <Container maxWidth="xl">
        <Flex>
          <Logo />
          {!userInfo ? (
            <NavItemWrapper>
              <NavItem href="/login" text="Login" />
              <Link href="/signup">
                <CustomButton p="0 3rem" bgSecondary>
                  Sign up
                </CustomButton>
              </Link>
            </NavItemWrapper>
          ) : (
            <NavItemWrapper>
              <NavItem href="#" text="Logout" onClick={handleLogout} />
              <NavItem href="/account" text="Dashboard" />
            </NavItemWrapper>
          )}
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
  top: `0`,
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

export default Header;
