/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Logo from '../Logo';
import { Box, Button, Container } from '@mui/material';
import Link from 'next/link';
import { RootState } from '@/store/store';
import SearchInput from './SearchInput';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import SidenavDrawer from './SidenavDrawer';
import { useAuth } from '@/hooks/authContext';
import { parseCookies } from '@/lib/parseCookies';

const Header = ({ handleSearchChange, data, isSearch }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, setUser } = useAuth();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = user?._id;
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
      router.push('/account/onboard');
    } else {
      router.push('/login');
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastVisitedURL', '/account/onboard');
      }
    }
  };

  return (
    <NavWrapper>
      {/* <MobileNav
        userInfo={userInfo}
        data={data}
        show={toggleMenu}
        handleClick={handleClick}
      /> */}
      <Container maxWidth="xl">
        <Flex>
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
                lg: 'block',
                xl: 'block',
              },
            }}
          >
            <Link href="https://www.easeplan.io/">
              <Logo />
            </Link>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              display: {
                xs: 'none',
                sm: 'none',
                md: 'flex',
                lg: 'flex',
                xl: 'flex',
              },
            }}
          >
            {isSearch && (
              <SearchInput handleSearchChange={handleSearchChange} />
            )}
            {userInfo && !data?.providerProfile && (
              <Button
                onClick={handledBecomeAVendor}
                variant="outlined"
                sx={{
                  color: 'secondary.main',
                  borderColor: 'secondary.main',
                  textTransform: 'inherit',
                  whiteSpace: 'nowrap',
                  mr: 6,
                  '&:hover': {
                    borderColor: 'secondary.main',
                    color: 'primary.main',
                    backgroundColor: 'secondary.main',
                  },
                }}
              >
                Become a vendor
              </Button>
            )}
            <Box
              sx={{
                flexGrow: 0,
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'none',
                  lg: 'block',
                  xl: 'block',
                },
              }}
            >
              <SidenavDrawer data={data} />
            </Box>
          </Box>
          {/* <MenuIcon className="menuIcon" onClick={handleClick} /> */}
          <Box
            sx={{
              display: {
                xs: 'block',
                sm: 'block',
                md: 'none',
                lg: 'none',
                xl: 'none',
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
                xs: 'block',
                sm: 'block',
                md: 'block',
                lg: 'none',
                xl: 'none',
              },
            }}
          >
            <SidenavDrawer data={data} />
          </Box>
        </Flex>
        {/* <MobileNav show={toggleMenu} handleClick={handleClick} /> */}
      </Container>
    </NavWrapper>
  );
};

const NavWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0',
  position: 'fixed',
  width: '100%',
  zIndex: '10',
  top: '0',

  '@media (max-width: 900px)': {
    padding: '0.3rem 0 ',
  },
}));

const Flex = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 4rem',

  '@media (max-width: 1020px)': {
    padding: ' 0 ',
  },

  '.menuIcon': {
    color: theme.palette.secondary.main,
    display: 'none',
    cursor: 'pointer',

    '@media (max-width: 1020px)': {
      display: 'block',
      fontSize: '2rem',
    },
  },
}));

const NavItemWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media (max-width: 1020px)': {
    display: 'none',
  },
});

export default Header;
