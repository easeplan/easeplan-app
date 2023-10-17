/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Logo from '../Logo';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import MobileNav from './MobileNav';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import SearchInput from './SearchInput';
import { useRouter } from 'next/router';

const Header = ({ handleSearchChange }: any) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
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
    <NavWrapper>
      <MobileNav show={toggleMenu} handleClick={handleClick} />
      <Container maxWidth="xl">
        <Flex>
          <Box
            sx={{
              display: {
                xs: `none`,
                sm: `none`,
                md: `none`,
                lg: `block`,
                xl: `block`,
              },
            }}
          >
            <Link href="https://www.easeplan.io/">
              <Logo />
            </Link>
          </Box>
          <NavItemWrapper>
            <SearchInput handleSearchChange={handleSearchChange} />
            <Button
              onClick={handledBecomeAVendor}
              variant="outlined"
              sx={{
                color: `secondary.main`,
                borderColor: `secondary.main`,
                textTransform: `inherit`,
                mr: 6,
                '&:hover': {
                  borderColor: `secondary.main`,
                  color: `primary.main`,
                  backgroundColor: `secondary.main`,
                },
              }}
            >
              Become a vendor
            </Button>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: `65px`,
                  boxShadow: `0px 0px 15px rgba(0, 0, 0, 0.1)`,
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: `top`,
                  horizontal: `right`,
                }}
                keepMounted
                transformOrigin={{
                  vertical: `top`,
                  horizontal: `right`,
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box>
                  {userInfo && (
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Settings</Typography>
                      </MenuItem>
                    </>
                  )}
                  <MenuItem>
                    <Link href="/login">Login</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/sign up">Sign up</Link>
                  </MenuItem>
                </Box>
              </Menu>
            </Box>
          </NavItemWrapper>
          <MenuIcon className="menuIcon" onClick={handleClick} />
          <Box
            sx={{
              display: {
                xs: `block`,
                sm: `block`,
                md: `block`,
                lg: `none`,
                xl: `none`,
              },
            }}
          >
            <Link href="https://www.easeplan.io/">
              <Logo />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: {
                xs: `block`,
                sm: `block`,
                md: `block`,
                lg: `none`,
                xl: `none`,
              },
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: `65px`,
                boxShadow: `0px 0px 15px rgba(0, 0, 0, 0.1)`,
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: `top`,
                horizontal: `right`,
              }}
              keepMounted
              transformOrigin={{
                vertical: `top`,
                horizontal: `right`,
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box>
                {userInfo && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Settings</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Sign up</Typography>
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Flex>
        {/* <MobileNav show={toggleMenu} handleClick={handleClick} /> */}
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

export default Header;
