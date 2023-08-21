/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import MobileNavItems from './MobileNavItems';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

export { getServerSideProps } from '@/context/contextStore';

const MobileSidenav = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <MobileStyle>
      <FlexContainer>
        {userInfo?.role === `user` ? null : (
          <MobileNavItems
            icon={<AccountBalanceWalletIcon />}
            text="Wallet"
            href="/account/wallet"
          />
        )}

        {userInfo?.role === `user` ? null : (
          <MobileNavItems
            text="Dashboard"
            icon={<DashboardIcon className="Homeicon" />}
            href="/account"
          />
        )}

        <MobileNavItems
          text="Chat"
          icon={<InsertCommentIcon />}
          href="/account/chats"
        />

        {userInfo?.role === `user` ? (
          <MobileNavItems
            text="Dashboard"
            icon={<DashboardIcon className="Homeicon" />}
            href="/account"
          />
        ) : null}
        <MobileNavItems
          text="Settings"
          icon={<SettingsIcon />}
          href="/account/settings"
        />
      </FlexContainer>
    </MobileStyle>
  );
};

const MobileStyle = styled(`nav`)(({ theme }) => ({
  background: theme.palette.primary.main,
  position: `fixed`,
  bottom: `0`,
  width: `100%`,
  // height: `13vh`,
  // borderTopLeftRadius: `1.5rem`,
  // borderTopRightRadius: `1.5rem`,
  display: `none`,
  padding: `1rem 0`,
  zIndex: `9`,

  '@media (max-width: 900px)': {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
}));

const FlexContainer = styled(`nav`)(({ theme }) => ({
  color: theme.palette.common.white,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  textAlign: `center`,
  width: `90%`,

  '.Homeicon': {
    fontSize: `2rem`,
  },
}));

export default MobileSidenav;
