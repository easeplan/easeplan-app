import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Box, Button, IconButton, Tooltip } from '@mui/material';
import NavItems from './NavItems';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

type Anchor = 'right';

export default function SidenavDrawer({ data }: any) {
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

      setState({ ...state, [anchor]: open });
    };

  const NavItem = (anchor: Anchor) => (
    <Box
      sx={{
        width: {
          xs: anchor === `right` || anchor === `bottom` ? `60vw` : `auto`,
          sm: anchor === `right` || anchor === `bottom` ? `45vw` : `auto`,
          md: anchor === `right` || anchor === `bottom` ? `20vw` : `auto`,
          lg: anchor === `right` || anchor === `bottom` ? `15vw` : `auto`,
          xl: anchor === `right` || anchor === `bottom` ? `15vw` : `auto`,
        },
      }}
      role="presentation"
    >
      <NavItems data={data} />
    </Box>
  );

  return (
    <div>
      {([`right`] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Open settings">
            <IconButton onClick={toggleDrawer(anchor, true)}>
              {userInfo ? (
                <Avatar
                  alt={data?.profile?.firstName}
                  src={data?.profile?.picture}
                  sx={{ backgroundColor: `secondary.main` }}
                />
              ) : (
                <Avatar
                  alt=""
                  src="/"
                  sx={{ backgroundColor: `secondary.main` }}
                />
              )}
            </IconButton>
          </Tooltip>
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
