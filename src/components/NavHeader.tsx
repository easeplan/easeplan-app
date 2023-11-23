/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Logo from './Logo';
import AvatarMenu from './AvatarMenu';
import useFetch from '@/hooks/useFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '@/hooks/authContext';

const NavHeader = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { user } = useAuth();
  // const {
  //   allUnreadConversationMessagesCount,
  //   unreadConversationMessagesCount,
  // } = useSelector((state: RootState) => state.chatsData);
  const { notifyData } = useSelector((state: RootState) => state.notifications);
  // const { queryData } = useFetch(`/profiles/${userInfo}`, token);

  return (
    <Navbar>
      <Container fixed>
        <Flex>
          <div className="logoWrapper">
            <Logo />
          </div>
          <Typography
            fontWeight={700}
            color="primary.main"
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
            🥰 Nice to have you here {user?.profile?.firstName}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',

              '.linkButton': {
                backgroundColor: 'primary.main',
                color: 'secondary.main',
                padding: '0.9rem 2.5rem',
                fontWeight: '700',
                transition: 'all 0.5s ease',

                '&:hover': {
                  opacity: '0.8',
                },
              },
            }}
          >
            {user?.providerProfile ? null : (
              <Link href="/account/onboard">
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: '700',
                    paddingX: '0.9rem',
                    paddingY: '0.6rem',
                  }}
                >
                  Become a Vendor
                </Button>
              </Link>
            )}
            <NotificationDropdown
              token={token}
              notificationData={notifyData}
              user={user}
            />
            <AvatarMenu
              imgSrc={user?.profile?.picture}
              alt="userImage"
              height={100}
              width={100}
            />
          </Box>
        </Flex>
      </Container>
    </Navbar>
  );
};

const Navbar = styled('nav')({
  width: '100%',
  borderBottom: 'solid 1px #ccc',
  position: 'sticky',
  top: '0',
  padding: '0.5rem  0',
  zIndex: '9',
  background: '#fff',
  '@media (max-width: 600px)': {
    position: 'fixed',
  },
});

const Flex = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '.title': {
    color: theme.palette.primary.main,
    textTransform: 'capitalize',
  },

  '.logoWrapper': {
    display: 'none',
  },

  '@media (max-width: 900px)': {
    '.title': {
      color: theme.palette.primary.main,
      display: 'none',
    },
    '.logoWrapper': {
      display: 'block',
    },
  },
}));

const Icon = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  border: 'solid 1px #ccc',
  borderRadius: '9px',
  margin: '0 0.5rem',
  color: theme.palette.primary.main,
  cursor: 'pointer',

  '.icon': {
    fontSize: '1.5rem',
  },

  '@media (max-width: 900px)': {
    width: '35px',
    height: '35px',
  },
}));
export default NavHeader;
