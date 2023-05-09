import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { styled } from '@mui/material/styles';

type LayoutProps = {
  description: string;
  title: string;
  children: React.ReactNode | React.ReactElement;
  keyword: string;
};

const Layout = ({ description, children, title, keyword }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keyword" content={keyword} />
      </Head>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

const Main = styled(`div`)(({ theme }) => ({
  // background: theme.palette.background.default,
}));

export default Layout;
