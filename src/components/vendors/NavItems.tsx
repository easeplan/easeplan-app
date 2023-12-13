import { Avatar, Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import NavLink from './NavLink';
import StyleIcon from '@mui/icons-material/Style';
import GroupIcon from '@mui/icons-material/Group';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import RateReviewIcon from '@mui/icons-material/RateReview';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '@/features/authSlice';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setCloseModal } from '@/features/onboardingSlice';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useAuth } from '@/hooks/authContext';
import { parseCookies } from '@/lib/parseCookies';

const links = [
  // {
  //   id: 1,
  //   icon: (
  //     <GroupIcon sx={{ mr: 1, fontSize: `1.5rem`, color: `primary.main` }} />
  //   ),
  //   text: `Find Vendors`,
  //   href: `/user/findvendors`,
  // },
  {
    id: 2,
    icon: (
      <StyleIcon sx={{ mr: 1, fontSize: '1.5rem', color: 'primary.main' }} />
    ),
    text: 'My Events',
    href: '/user/events',
  },
  {
    id: 3,
    icon: (
      <InsertCommentIcon
        sx={{ mr: 1, fontSize: '1.5rem', color: 'primary.main' }}
      />
    ),
    text: 'Chats',
    href: '/user/chat',
  },
  {
    id: 4,
    icon: (
      <SettingsIcon sx={{ mr: 1, fontSize: '1.5rem', color: 'primary.main' }} />
    ),
    text: 'Settings',
    href: '/user/settings',
  },
  // {
  //   id: 5,
  //   icon: (
  //     <PermPhoneMsgIcon
  //       sx={{ mr: 1, fontSize: `1.5rem`, color: `primary.main` }}
  //     />
  //   ),
  //   text: `Support`,
  //   href: `/user/support`,
  // },
];
const NavItems = ({ data }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { closeModal } = useSelector((state: RootState) => state.onboarding);
  const [loginModal, setLoginModal] = useState(false);
  const { user, setUser, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const data = await axios.post(
        '/api/logout',
        {},
        { withCredentials: true },
      );
      if (data?.status === 200) {
        setLoginModal(false);
        setIsLoggedIn(false);
        dispatch(clearCredentials());
        setUser(null);
        router.push('/findvendors');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLoginModal = () => {
    dispatch(setCloseModal(true));
    setLoginModal(true);
  };

  const handledBecomeAVendor = () => {
    if (data) {
      router.push('/account/onboard');
    } else {
      dispatch(setCloseModal(true));
      setLoginModal(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastVisitedURL', '/account/onboard');
      }
    }
  };

  useEffect(() => {
    if (data) {
      setUser(user);
    }
  }, [data, setUser, user]);
  return (
    <Box>
      <Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tooltip title="Open settings">
              <IconButton>
                {user ? (
                  <Avatar
                    alt={data?.profile?.firstName}
                    src={data?.profile?.picture}
                    sx={{
                      width: 56,
                      height: 56,
                      mt: 5,
                      backgroundColor: 'primary.main',
                    }}
                  />
                ) : (
                  <Avatar
                    alt=""
                    src="/"
                    sx={{
                      width: 56,
                      height: 56,
                      mt: 5,
                      backgroundColor: 'primary.main',
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              mt: 4,
              px: 4,
            }}
          >
            {user && user?.providerProfile && (
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  mb: {
                    xs: 3,
                    sm: 3,
                    md: 4,
                    lg: 4,
                    xl: 4,
                  },
                }}
              >
                <AddBusinessIcon
                  sx={{ mr: 1, fontSize: '1.5rem', color: 'primary.main' }}
                />
                <NavLink text="Dashboard" href="/account" />
              </Stack>
            )}
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                mb: {
                  xs: 3,
                  sm: 3,
                  md: 4,
                  lg: 4,
                  xl: 4,
                },
              }}
            >
              <GroupIcon
                sx={{ mr: 1, fontSize: '1.5rem', color: 'primary.main' }}
              />

              <NavLink text="Find Vendors" href="/findvendors" />
            </Stack>
            {!user?.providerProfile &&
              links?.map((link) => (
                <Stack
                  key={link.id}
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    mb: {
                      xs: 3,
                      sm: 3,
                      md: 4,
                      lg: 4,
                      xl: 4,
                    },
                  }}
                >
                  {link.icon}
                  {user ? (
                    <NavLink text={link.text} href={link.href} />
                  ) : (
                    <NavLink text={link.text} onClick={handleLoginModal} />
                  )}
                </Stack>
              ))}
            {user && !user?.providerProfile && (
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  mb: {
                    xs: 3,
                    sm: 3,
                    md: 4,
                    lg: 4,
                    xl: 4,
                  },
                }}
              >
                <AddBusinessIcon
                  sx={{ mr: 1, fontSize: '1.5rem', color: 'primary.main' }}
                />
                <NavLink text="Become a vendor" href="/account/onboard" />
              </Stack>
            )}
            {!user ? (
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  mb: {
                    xs: 3,
                    sm: 3,
                    md: 4,
                    lg: 4,
                    xl: 4,
                  },
                }}
              >
                <LoginIcon
                  sx={{ mr: 1, fontSize: '1.5rem', color: 'primary.main' }}
                />
                <NavLink text="Login" onClick={handleLoginModal} />
              </Stack>
            ) : (
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  mb: {
                    xs: 3,
                    sm: 3,
                    md: 4,
                    lg: 4,
                    xl: 4,
                  },
                }}
              >
                <LoginIcon
                  sx={{ mr: 1, fontSize: '1.5rem', color: 'primary.main' }}
                />
                <NavLink text="Logout" onClick={handleLogout} />
              </Stack>
            )}
            <Button variant="contained" sx={{ mt: 8 }}>
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <RateReviewIcon
                  sx={{ mr: 1, fontSize: '1.5rem', color: 'secondary.light' }}
                />
                Feedback
              </Stack>
            </Button>
            {/* Login Modal */}
            {closeModal && (
              <LoginModal
                isOpen={loginModal}
                isClose={() => setLoginModal(false)}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NavItems;
