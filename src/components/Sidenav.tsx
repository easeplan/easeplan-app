/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { styled } from '@mui/material/styles';
import Logo from './Logo';
import SidebarItem from './SidebarItems';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import StyleIcon from '@mui/icons-material/Style';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuthUser } from '@/context/contextStore';

export { getServerSideProps } from '@/context/contextStore';

const Sidenav = () => {
  const { queryData } = useAuthUser();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_NEXT_API}/api/logout`);
      router.push(`/login`);
    } catch (error: any) {}
  };
  return (
    <Navbar>
      <div className="container">
        <Logo />
      </div>
      <NavLinks>
        <Links>
          <SidebarItem
            icon={<DashboardIcon />}
            text="Dashboard"
            href="/account"
          />
        </Links>
        {/* <Links>
          <SidebarItem
            icon={<EmailIcon />}
            text="Inbox"
            href="/account/inbox"
          />
        </Links> */}
        {/* <Links>
          <SidebarItem
            icon={<StyleIcon />}
            text="History"
            href="/account/history"
          />
        </Links> */}
        {/* <Links>
          <SidebarItem
            icon={<AccountBalanceWalletIcon />}
            text="Payment"
            href="/account/payment"
          />
        </Links> */}
        {queryData?.details?.role === `user` ? null : (
          <Links>
            <SidebarItem
              icon={<ChromeReaderModeIcon />}
              text="My Profile"
              href="/account/profile"
            />
          </Links>
        )}
        <Links>
          <SidebarItem
            icon={<PermPhoneMsgIcon />}
            text="Support"
            href="/account/support"
          />
        </Links>
      </NavLinks>
      <NavFooter>
        <Link href="/settings">
          <div className="IconWrapper">
            <SettingsIcon />
          </div>
        </Link>
        <div className="IconWrapper" onClick={handleLogout}>
          <LoginIcon className="loginIcon" />
        </div>
      </NavFooter>
    </Navbar>
  );
};

const Navbar = styled(`nav`)(({ theme }) => ({
  width: `20%`,
  background: theme.palette.primary.main,
  padding: `2rem 0`,

  '.container': {
    padding: `0 2rem 0 2rem`,

    '@media (max-width: 1020px)': {
      padding: `0 2rem 0 1rem`,
      width: `23%`,
    },
  },

  '@media (max-width: 1020px)': {
    width: `25%`,
  },

  '@media (max-width: 900px)': {
    display: `none`,
  },
}));

const NavFooter = styled(`div`)({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  textAlign: `center`,
  marginTop: `5rem`,

  '.IconWrapper': {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    border: `solid 1px #ccc`,
    width: `40px`,
    height: `40px`,
    borderRadius: `6px`,
    margin: `0.7rem`,
    color: `#fff`,
    cursor: `pointer`,
  },

  '@media (max-width: 1020px)': {
    marginTop: `2rem`,
  },
});

const NavLinks = styled(`div`)({
  marginTop: `4rem`,
});

const Links = styled(`div`)(({ theme }) => ({
  // marginTop: `1rem`,
  padding: `1rem 2rem`,
  transition: `0.5s all ease`,

  '&:hover': {
    background: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    paddingLeft: `0.6rem`,
  },

  '@media (max-width: 1020px)': {
    marginTop: `0rem`,
    padding: `0 0.6rem`,
  },
}));

export default Sidenav;
