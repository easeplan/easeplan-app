import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import NavItems from './NavItems';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import Divider from '../common/Divider';
import TelegramIcon from '@mui/icons-material/Telegram';
import Link from 'next/link';

type Anchor = 'right';

export default function EventDetailsDrawer({ data, id }: any) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === `keydown` &&
        ((event as React.KeyboardEvent).key === `Tab` ||
          (event as React.KeyboardEvent).key === `Shift`)
      ) {
        return;
      }

      console.log(`ID:`, id);

      setState({ ...state, [anchor]: open });
    };

  const NavItem = (anchor: Anchor) => (
    <Box
      sx={{
        width: {
          xs: anchor === `right` || anchor === `bottom` ? `70vw` : `auto`,
          sm: anchor === `right` || anchor === `bottom` ? `70vw` : `auto`,
          md: anchor === `right` || anchor === `bottom` ? `40vw` : `auto`,
          lg: anchor === `right` || anchor === `bottom` ? `30vw` : `auto`,
          xl: anchor === `right` || anchor === `bottom` ? `30vw` : `auto`,
        },
      }}
      role="presentation"
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <Box>
            {userInfo ? (
              <Avatar
                alt={data?.profile?.firstName}
                src={data?.profile?.picture}
                sx={{
                  width: 56,
                  height: 56,
                  mt: 2,
                  mb: 4,
                  backgroundColor: `primary.main`,
                }}
              />
            ) : (
              <Avatar
                alt=""
                src="/"
                sx={{
                  width: 56,
                  height: 56,
                  mt: 2,
                  mb: 4,
                  backgroundColor: `primary.main`,
                }}
              />
            )}
          </Box>
        </Box>
        {/* Details */}
        <Box>
          <Typography sx={{ fontWeight: `600`, color: `primary.main` }}>
            Vendor Details
          </Typography>
          <Divider />
          <Stack
            direction="row"
            sx={{
              alignItems: `center`,
              mt: 4,
            }}
          >
            <LoginIcon
              sx={{ mr: 1, fontSize: `1.5rem`, color: `primary.main` }}
            />
            Full Name
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: `center`,
              mt: 2,
            }}
          >
            <LoginIcon
              sx={{ mr: 1, fontSize: `1.5rem`, color: `primary.main` }}
            />
            State:
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: `center`,
              mt: 2,
            }}
          >
            <LoginIcon
              sx={{ mr: 1, fontSize: `1.5rem`, color: `primary.main` }}
            />
            City
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: `center`,
              mt: 2,
            }}
          >
            <LoginIcon
              sx={{ mr: 1, fontSize: `1.5rem`, color: `primary.main` }}
            />
            Services
          </Stack>
        </Box>

        {/* Event Status */}
        <Box mt={3}>
          <Typography sx={{ fontWeight: `600`, color: `primary.main` }}>
            Event Status
          </Typography>
          <Divider />
          <Stack
            direction="row"
            sx={{
              alignItems: `center`,
              mt: 4,
            }}
          >
            <LoginIcon
              sx={{ mr: 1, fontSize: `1.5rem`, color: `primary.main` }}
            />
            Event type
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: `center`,
              mt: 2,
            }}
          >
            <LoginIcon
              sx={{ mr: 1, fontSize: `1.5rem`, color: `primary.main` }}
            />
            Amount
          </Stack>

          <Box mt={4}>
            {/* <Typography>Start Messaging Vendor</Typography> */}
            <Link href="/">
              <Button variant="contained" sx={{ textTransform: `capitalize` }}>
                <TelegramIcon sx={{ mr: 1 }} />
                Message Vendor
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      {([`right`] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            sx={{ textTransform: `capitalize` }}
          >
            View
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box pt={2} pl={2}>
              <Button variant="outlined" onClick={toggleDrawer(anchor, false)}>
                <CloseIcon sx={{ color: `grey` }} />
              </Button>
            </Box>
            <Box p={1}>{NavItem(anchor)}</Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
