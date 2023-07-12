/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import SettingsIcon from '@mui/icons-material/Settings';
import MobileNavItems from './MobileNavItems';
import { useAuthUser } from '@/context/contextStore';
import EmailIcon from '@mui/icons-material/Email';
import StyleIcon from '@mui/icons-material/Style';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export { getServerSideProps } from '@/context/contextStore';

const MobileSidenav = () => {
  const { queryData } = useAuthUser();

  return (
    <MobileStyle>
      <FlexContainer>
        {/* <MobileNavItems
          text="Inbox"
          icon={<EmailIcon />}
          href="/account/inbox"
        /> */}
        {queryData?.details?.role != `user` ? null : (
          <MobileNavItems
            icon={<ChromeReaderModeIcon />}
            text="My Profile"
            href="/account/profile"
          />
        )}
        {queryData?.details?.role != `user` ? null : (
          <MobileNavItems
            icon={<AccountBalanceWalletIcon />}
            text="Wallet"
            href="/account/wallet"
          />
        )}
        <MobileNavItems
          icon={<StyleIcon />}
          text="History"
          href="/account/history"
        />
        <MobileNavItems
          text="Dashboard"
          icon={<DashboardIcon className="Homeicon" />}
          href="/account"
        />
        {/* <MobileNavItems
          text="Settings"
          icon={<SettingsIcon />}
          href="/account/settings"
        /> */}
        <MobileNavItems
          text="support"
          icon={<PermPhoneMsgIcon />}
          href="/account/support"
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
