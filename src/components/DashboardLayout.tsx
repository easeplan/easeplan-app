/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import Sidenav from './Sidenav';
import NavHeader from './NavHeader';
import MobileSidenav from './MobileSidenav';
import { Box, Container } from '@mui/material';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import { useState } from 'react';

interface ILayout {
  children: React.ReactElement | React.ReactNode;
  data?: any;
  token?: any;
  sx?: any;
  inchat?: boolean;
}

const CustomContainer = ({ sx, children }: any) => {
  return (
    <Container fixed sx={sx}>
      {children}
    </Container>
  );
};

const DashboardLayout = ({ children, token, sx, inchat }: ILayout) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData, error, isLoading } = useFetch(
    `/profiles/${userInfo}`,
    token,
  );

  return (
    <Layout>
      <Sidenav data={queryData?.provider} />
      <Main sx={sx}>
        {!inchat && <NavHeader token={token} />}
        <CustomContainer fixed sx={sx}>
          {children}
        </CustomContainer>
        {!inchat && <MobileSidenav data={queryData?.provider} />}
      </Main>
    </Layout>
  );
};

const Layout = styled('div')(({}) => ({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
}));

const Main = styled('main')(({}) => ({
  width: '100%',
  overflowY: 'auto',
  paddingBottom: '4rem',
  '@media (max-width: 600px)': {
    //marginTop: '4rem',
  },
}));

export default DashboardLayout;
