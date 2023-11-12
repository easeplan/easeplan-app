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
import { formatCurrency } from '@/utils';

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
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      console.log('ID:', id);

      setState({ ...state, [anchor]: open });
    };

  const loggedUserId = userInfo;

  const NavItem = (anchor: Anchor) => (
    <Box
      sx={{
        width: {
          xs: anchor === 'right' || anchor === 'bottom' ? '70vw' : 'auto',
          sm: anchor === 'right' || anchor === 'bottom' ? '70vw' : 'auto',
          md: anchor === 'right' || anchor === 'bottom' ? '20vw' : 'auto',
          lg: anchor === 'right' || anchor === 'bottom' ? '20vw' : 'auto',
          xl: anchor === 'right' || anchor === 'bottom' ? '20vw' : 'auto',
        },
      }}
      role="presentation"
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box>
            <Avatar
              alt={data?.parties?.receiver?.profile?.firstName}
              src={data?.parties?.receiver?.profile?.picture}
              sx={{
                width: 56,
                height: 56,
                mt: 2,
                mb: 2,
                backgroundColor: 'primary.main',
              }}
            />
          </Box>
        </Box>
        {/* Details */}
        <Box>
          <Typography textAlign="center">
            {data?.parties?.receiver?.profile?.firstName}{' '}
            {data?.parties?.receiver?.profile?.lastName}
          </Typography>
          <Typography textAlign="center">{data?.service}</Typography>
          <Typography textAlign="center">
            <small>₦</small>
            {formatCurrency(data?.budget)}
          </Typography>
        </Box>
        <Box mt={3} sx={{ textAlign: 'center' }}>
          {data?.parties?.receiver?.providerProfile?.currentlyHiredBy?.includes(
            loggedUserId,
          ) ? (
            <Link href="/account/chats">
              <Button variant="contained" sx={{ textTransform: 'capitalize' }}>
                <TelegramIcon sx={{ mr: 1 }} />
                Message Vendor
              </Button>
            </Link>
          ) : data?.parties?.receiver?.providerProfile?.currentlyRequestedBy?.includes(
              loggedUserId,
            ) ? (
            <Button variant="contained" sx={{ color: 'secondary.main', px: 6 }}>
              Awaiting Vendor Response
            </Button>
          ) : (
            <Link href="/user/chats">
              <Button variant="contained" sx={{ textTransform: 'capitalize' }}>
                <TelegramIcon sx={{ mr: 1 }} />
                Message Vendor
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            // onClick={toggleDrawer(anchor, true)}
            sx={{ textTransform: 'capitalize' }}
          >
            <Link href={`/user/events/${data._id}`}> View</Link>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box pt={2} pl={2}>
              <Button variant="outlined" onClick={toggleDrawer(anchor, false)}>
                <CloseIcon sx={{ color: 'grey' }} />
              </Button>
            </Box>
            <Box p={1}>{NavItem(anchor)}</Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
