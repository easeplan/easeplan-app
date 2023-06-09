import { useState, useEffect, useRef, Key } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from '@mui/material';
import theme from '@/styles/theme';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
// import Popover from '@mui/material/Popover';
// import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useRouter } from 'next/router';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { dateFormater } from '@/utils';

const API_URL = `http://apidev.us-east-1.elasticbeanstalk.com/api/v2`;

const NotificationDropdown = ({ token, notificationData, queryData }: any) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === `Tab`) {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === `Escape`) {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row">
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? `composition-menu` : undefined}
        aria-expanded={open ? `true` : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Box
          sx={{
            position: `relative`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            width: `40px`,
            height: `40px`,
            border: `solid 1px #ccc`,
            borderRadius: `9px`,
            margin: `0 0.5rem`,
            color: `primary.main`,
            cursor: `pointer`,

            '.icon': {
              fontSize: `1.5rem`,
            },

            '@media (max-width: 900px)': {
              width: `35px`,
              height: `35px`,
            },
          }}
        >
          <Box
            sx={{
              width: `10px`,
              height: `10px`,
              border: `solid 2px #fff`,
              borderRadius: `16px`,
              position: `absolute`,
              top: `0.6rem`,
              right: `0.6rem`,
              background: theme.palette.info.main,

              '@media (max-width: 900px)': {
                width: `9px`,
                height: `9px`,
                border: `solid 1.5px #fff`,
                position: `absolute`,
                top: `0.6rem`,
                right: `0.5rem`,
              },
            }}
          ></Box>
          <NotificationsIcon className="icon" />
        </Box>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              background: `#fff`,
              color: `#333`,
              transformOrigin:
                placement === `bottom-start` ? `left top` : `left bottom`,
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  onKeyDown={handleListKeyDown}
                  sx={{
                    width: `100%`,
                    maxWidth: 360,
                    p: 3,
                    bgcolor: `background.paper`,
                  }}
                >
                  {notificationData?.data
                    ?.slice(0, 5)
                    .map(
                      (data: { status: any; dateTime: any; _id: string }) => (
                        <>
                          {data?.dateTime && (
                            <Link
                              href={`/account/notifications/${data?._id}`}
                              key={data?._id}
                            >
                              <ListItem
                                sx={{ cursor: `pointer` }}
                                onClick={handleClose}
                              >
                                <ListItemText
                                  primary={`Status: ${data?.status}`}
                                  secondary={
                                    <>
                                      <Typography
                                        sx={{ display: `inline` }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      ></Typography>
                                      {` Date: — ${dateFormater(
                                        data?.dateTime,
                                      )}`}
                                    </>
                                  }
                                />
                              </ListItem>
                              <Divider />
                            </Link>
                          )}
                        </>
                      ),
                    )}
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
};

const Button = styled(`button`)({
  border: `none`,
  background: `none`,
  cursor: `pointer`,
  marginLeft: `1rem`,
});

export default NotificationDropdown;
