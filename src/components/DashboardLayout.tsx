/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import Sidenav from './Sidenav';
import NavHeader from './NavHeader';
import MobileSidenav from './MobileSidenav';
import { Container } from '@mui/material';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';

interface ILayout {
  children: React.ReactElement | React.ReactNode;
  data?: any;
  token?: any;
}

const DashboardLayout = ({ children, token }: ILayout) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData, error, isLoading } = useFetch(
    `/profiles/${userInfo}`,
    token,
  );

  return (
    <Layout>
      <Sidenav data={queryData?.provider} />
      <Main>
        <NavHeader token={token} />
        <Container fixed>{children}</Container>
        <MobileSidenav data={queryData?.provider} />
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
