/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect, useRef, Key } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from '@mui/material';
import theme from '@/styles/theme';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const NotificationDropdown = ({ notificationData }: any) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // const handleClose = (event: Event | React.SyntheticEvent) => {
  //   if (
  //     anchorRef.current &&
  //     anchorRef.current.contains(event.target as HTMLElement)
  //   ) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // function handleListKeyDown(event: React.KeyboardEvent) {
  //   if (event.key === `Tab`) {
  //     event.preventDefault();
  //     setOpen(false);
  //   } else if (event.key === `Escape`) {
  //     setOpen(false);
  //   }
  // }

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
      <Link href="/account/contracts/">
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
            {notificationData?.length < 1 ? null : (
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
            )}
            <NotificationsIcon className="icon" />
          </Box>
        </Button>
      </Link>
      {/* {notificationData?.length < 0 ? null : (
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
                    {notificationData?.length < 0 ? null : (
                      <Link href={`/account/contracts/`}>
                        <ListItem
                          sx={{ cursor: `pointer` }}
                          onClick={handleClose}
                        >
                          <ListItemText
                            primary={`Status:`}
                            secondary={
                              <>
                                <Typography
                                  sx={{ display: `inline` }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  You have a new Event Request
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </Link>
                    )}
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )} */}
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
