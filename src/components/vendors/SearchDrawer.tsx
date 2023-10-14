import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchForm from './SearchForm';

type Anchor = 'right';

export default function SearchDrawer() {
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

  const Form = (anchor: Anchor) => (
    <Box
      sx={{
        width: {
          xs: anchor === `right` || anchor === `bottom` ? `80vw` : `auto`,
          sm: anchor === `right` || anchor === `bottom` ? `80vw` : `auto`,
          md: anchor === `right` || anchor === `bottom` ? `50vw` : `auto`,
          lg: anchor === `right` || anchor === `bottom` ? `50vw` : `auto`,
          xl: anchor === `right` || anchor === `bottom` ? `50vw` : `auto`,
        },
      }}
      role="presentation"
    >
      <SearchForm />
    </Box>
  );

  return (
    <div>
      {([`right`] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            variant="contained"
            sx={{
              color: `primary.main`,
              background: `#fff`,
              borderColor: `secondary.main`,
              textTransform: `inherit`,
              mr: 6,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
              py: 1,
              width: {
                xs: `100%`,
                sm: `100%`,
                md: `20rem`,
                lg: `30rem`,
                xl: `30rem`,
              },
              '&:hover': {
                background: `#fff`,
              },
            }}
          >
            <Typography mr={2}>Search vendors</Typography>
            <SearchIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box p={4}>
              <Button variant="outlined" onClick={toggleDrawer(anchor, false)}>
                Close
              </Button>
            </Box>
            <Box p={1}>{Form(anchor)}</Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
