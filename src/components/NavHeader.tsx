/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Link from 'next/link';
import Logo from './Logo';
import AvatarMenu from './AvatarMenu';
import useFetch from '@/hooks/useFetch';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import NotificationDropdown from './NotificationDropdown';
import { setNotifyData } from '@/features/notificationsSlice';

const API_URL = `http://apidev.us-east-1.elasticbeanstalk.com/api/v2`;

const NavHeader = ({ token }: any) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { notifyData } = useSelector((state: RootState) => state.notifications);
  const { queryData } = useFetch(
    `/${
      userInfo?.role === `provider`
        ? `provider-profiles`
        : userInfo?.role === `planner`
        ? `planner-profiles`
        : userInfo?.role === `user`
        ? `user-profiles`
        : `user-profiles`
    }/${userInfo?._id}`,
    token,
  );

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/contracts/${queryData?.userId}`,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(setNotifyData(data));
    } catch (error) {}
  };

  console.log(notifyData);

  return (
    <Navbar>
      <Container fixed>
        <Flex>
          <div className="logoWrapper">
            <Logo />
          </div>
          <h3 className="title">Welcome, {queryData?.firstName}</h3>
          <Box>
            <Link href="/account">
              <Icon>
                <InsertCommentIcon className="icon" />
              </Icon>
            </Link>
            <NotificationDropdown
              token={token}
              notificationData={notifyData}
              queryData={queryData}
            />
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
