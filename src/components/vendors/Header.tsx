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
import SearchInput from './SearchInput';
import { useRouter } from 'next/router';
import NavItem from '../NavItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '@/features/authSlice';
import axios from 'axios';
import SidenavDrawer from './SidenavDrawer';

const Header = ({ handleSearchChange, data, isSearch }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
      router.push(`/account/onboard`);
    } else {
      router.push(`/login`);
      if (typeof window !== `undefined`) {
        localStorage.setItem(`lastVisitedURL`, `/account/onboard`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_NEXT_API}/api/logout`);
      dispatch(clearCredentials());
    } catch (error: any) {}
  };

  return (
    <NavWrapper>
      <MobileNav
        userInfo={userInfo}
        show={toggleMenu}
        handleClick={handleClick}
      />
      <Container maxWidth="xl">
        <Flex>
          <Box
            sx={{
              display: {
                xs: `none`,
                sm: `none`,
                md: `block`,
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
            {isSearch && (
              <SearchInput handleSearchChange={handleSearchChange} />
            )}
            <Button
              onClick={handledBecomeAVendor}
              variant="outlined"
              sx={{
                color: `secondary.main`,
                borderColor: `secondary.main`,
                textTransform: `inherit`,
                whiteSpace: `nowrap`,
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
              <SidenavDrawer data={data} />
            </Box>
          </NavItemWrapper>
          <MenuIcon className="menuIcon" onClick={handleClick} />
          <Box
            sx={{
              display: {
                xs: `block`,
                sm: `block`,
                md: `none`,
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
                md: `none`,
                lg: `none`,
                xl: `none`,
              },
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={data?.profile?.firstName}
                  src={data?.profile?.picture}
                />
              </IconButton>
            </Tooltip>
            {/* <Menu
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
                  <MenuItem>
                    <Link href="/account/settings">Settings</Link>
                  </MenuItem>
                )}
                <MenuItem>
                  <Link href="/login">Login</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href="/signup">Sign up</Link>
                </MenuItem>
              </Box>
            </Menu> */}
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
