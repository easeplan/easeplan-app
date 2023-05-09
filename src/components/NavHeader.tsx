/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';
import Logo from './Logo';
import AvatarMenu from './AvatarMenu';
import useFetch from '@/hooks/useFetch';

const NavHeader = ({ token }: any) => {
  const { queryData, error, isLoading } = useFetch(
    `/providers/profile`,
    `${token}`,
  );
  return (
    <Navbar>
      <Container fixed>
        <Flex>
          <div className="logoWrapper">
            <Logo />
          </div>
          <h3 className="title">Welcome {queryData?.details?.firstname}</h3>
          <Box>
            <Link href="/dashboard">
              <Icon>
                <InsertCommentIcon className="icon" />
              </Icon>
            </Link>
            <Link href="/dashboard">
              <Icon>
                <Dot></Dot>
                <NotificationsIcon className="icon" />
              </Icon>
            </Link>
            <AvatarMenu
              imgSrc={queryData?.picture}
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

const Navbar = styled(`nav`)({
  width: `100%`,
  borderBottom: `solid 1px #ccc`,
  position: `sticky`,
  top: `0`,
  padding: `0.5rem  0`,
  zIndex: `9`,
  background: `#fff`,
});

const Flex = styled(`div`)(({ theme }) => ({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,

  '.title': {
    color: theme.palette.primary.main,
    textTransform: `capitalize`,
  },

  '.logoWrapper': {
    display: `none`,
  },

  '@media (max-width: 900px)': {
    '.title': {
      color: theme.palette.primary.main,
      display: `none`,
    },
    '.logoWrapper': {
      display: `block`,
    },
  },
}));

const Box = styled(`div`)(({ theme }) => ({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,

  '.linkButton': {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    padding: `0.9rem 2.5rem`,
    fontWeight: `700`,
    transition: `all 0.5s ease`,

    '&:hover': {
      opacity: `0.8`,
    },
  },
}));

const Icon = styled(`div`)(({ theme }) => ({
  position: `relative`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  width: `40px`,
  height: `40px`,
  border: `solid 1px #ccc`,
  borderRadius: `9px`,
  margin: `0 0.5rem`,
  color: theme.palette.primary.main,
  cursor: `pointer`,

  '.icon': {
    fontSize: `1.5rem`,
  },

  '@media (max-width: 900px)': {
    width: `35px`,
    height: `35px`,
  },
}));

const Dot = styled(`div`)(({ theme }) => ({
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
}));

export default NavHeader;
