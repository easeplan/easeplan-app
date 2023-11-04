/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import AvatarImg from '@/public/avatar.png';
import { clearCredentials } from '@/features/authSlice';
import { useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';

interface AvatarMenuProps {
  imgSrc: any;
  alt: string;
  height: number;
  width: number;
}

export default function AvatarMenu({
  imgSrc,
  alt,
  height,
  width,
}: AvatarMenuProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(`/api/logout`);
      dispatch(clearCredentials());
      router.push(`/user/findvendors`);
      setOpen(false);
    } catch (error: any) {}
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
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row">
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? `composition-menu` : undefined}
          aria-expanded={open ? `true` : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ImageWrapper>
            {imgSrc ? (
              <img src={imgSrc} alt={alt} width={width} height={height} />
            ) : (
              <Image
                src={AvatarImg}
                alt="profileImg"
                height={50}
                width={50}
                style={{ borderRadius: `50%` }}
              />
            )}
            {/* <div className="imgCircle"></div> */}
          </ImageWrapper>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
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
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link href="/account/wallet">
                      <MenuItem
                        sx={{
                          color: `primary.main`,
                          fontWeight: `500`,
                          px: 6,
                          py: 2,
                        }}
                        onClick={handleClose}
                      >
                        Wallet
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link href="/account/history">
                      <MenuItem
                        sx={{
                          color: `primary.main`,
                          fontWeight: `500`,
                          px: 6,
                          py: 2,
                        }}
                        onClick={handleClose}
                      >
                        History
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link href="/account/settings">
                      <MenuItem
                        sx={{
                          color: `primary.main`,
                          fontWeight: `500`,
                          px: 6,
                          py: 2,
                        }}
                        onClick={handleClose}
                      >
                        Settings
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link href="/account/support">
                      <MenuItem
                        sx={{
                          color: `primary.main`,
                          fontWeight: `500`,
                          px: 6,
                          py: 2,
                        }}
                        onClick={handleClose}
                      >
                        Support
                      </MenuItem>
                    </Link>
                    <Divider />
                    <MenuItem
                      sx={{
                        color: `primary.main`,
                        fontWeight: `500`,
                        px: 6,
                        py: 2,
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}

const ImageWrapper = styled(`div`)(({ theme }) => ({
  img: {
    width: `50px`,
    height: `50px`,
    borderRadius: `50%`,
    border: `solid 2px ${theme.palette.secondary.main}`,

    '@media (max-width: 900px)': {
      width: `40px`,
      height: `40px`,
      border: `solid 1.5px #fff`,
    },
  },

  '.imgCircle': {
    width: `40px`,
    height: `40px`,
    borderRadius: `50%`,
    background: theme.palette.primary.main,
  },
}));

const Button = styled(`button`)({
  border: `none`,
  background: `none`,
  cursor: `pointer`,
  marginLeft: `1rem`,
});
