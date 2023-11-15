/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StyleIcon from '@mui/icons-material/Style';
import SettingsIcon from '@mui/icons-material/Settings';
import MobileNavItems from './MobileNavItems';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SearchIcon from '@mui/icons-material/Search';

export { getServerSideProps } from '@/context/contextStore';

const MobileSidenav = ({ data }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <MobileStyle>
      <FlexContainer>
        <MobileNavItems
          icon={<SearchIcon />}
          text="Find vendors"
          href="/user/findvendors"
        />
        {/* {data?.providerProfile ? (
          <MobileNavItems
            icon={<AccountBalanceWalletIcon />}
            text="Wallet"
            href="/account/wallet"
          />
        ) : null} */}
        <MobileNavItems
          icon={<StyleIcon />}
          text="Events"
          href="/account/history"
        />

        {data?.providerProfile ? (
          <MobileNavItems
            text="Dashboard"
            icon={<DashboardIcon className="Homeicon" />}
            href="/account"
          />
        ) : null}

        <MobileNavItems
          text="Chat"
          icon={<InsertCommentIcon />}
          href="/account/chats"
        />

        {data?.providerProfile ? null : (
          <MobileNavItems
            text="Dashboard"
            icon={<DashboardIcon className="Homeicon" />}
            href="/account"
          />
        )}

        {data?.providerProfile ? (
          <MobileNavItems
            text="Profile"
            icon={<ChromeReaderModeIcon />}
            href="/account/profile"
          />
        ) : (
          <MobileNavItems
            text="Settings"
            icon={<SettingsIcon />}
            href="/account/settings"
          />
        )}
      </FlexContainer>
    </MobileStyle>
  );
};

const MobileStyle = styled('nav')(({ theme }) => ({
  background: theme.palette.primary.main,
  position: 'fixed',
  bottom: '0',
  width: '100%',
  // height: `13vh`,
  // borderTopLeftRadius: `1.5rem`,
  // borderTopRightRadius: `1.5rem`,
  display: 'none',
  padding: '0.2rem 0',
  zIndex: '9',

  '@media (max-width: 900px)': {
    display: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const FlexContainer = styled('nav')(({ theme }) => ({
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  width: '90%',

  '.Homeicon': {
    fontSize: '2rem',
  },
}));

export default MobileSidenav;
