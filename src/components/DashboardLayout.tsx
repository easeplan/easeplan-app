/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import Sidenav from './Sidenav';
import NavHeader from './NavHeader';
import MobileSidenav from './MobileSidenav';
import { Container, Box } from '@mui/material';

interface ILayout {
  children: React.ReactElement | React.ReactNode;
  data?: any;
  token: any;
}

const DashboardLayout = ({ children, token }: ILayout) => {
  return (
    <Layout>
      <Sidenav />
      <Main>
        <NavHeader token={token} />
        <Container fixed>{children}</Container>
        <MobileSidenav />
      </Main>
    </Layout>
  );
};

const Layout = styled(`div`)(({}) => ({
  display: `flex`,
  height: `100vh`,
  overflow: `hidden`,
}));

const Main = styled(`main`)(({}) => ({
  width: `100%`,
  overflowY: `auto`,
  paddingBottom: `8rem`,
}));

export default DashboardLayout;
