/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import CustomButton from './CustomButton';

const Badge = () => {
  return (
    <BadgeWrapper>
      <div>
        <h3 className="title">Welcome to easeplan Planners</h3>
        <p>To get started lets get to know you</p>
      </div>
      <Link href="/account/profile">
        <CustomButton bgPrimary>COMPLETE YOUR PROFILE</CustomButton>
      </Link>
      {/* {data?.details?.firstname && data?.details?.picture ? (
        <Link href="/account/profile">
          <Button
            sx={{
              py: 1.1,
              width: {
                xs: 150,
                sm: 200,
                md: 200,
                lg: 200,
                xl: 200,
              },
              mt: 1,
              fontWeight: 400,
              fontSize: {
                xs: `0.7rem`,
                sm: `0.5rem`,
                md: `1rem`,
                lg: `1rem`,
              },
              backgroundColor: `${theme.palette.primary.main}`,
              color: `${theme.palette.secondary.main}`,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.light}`,
                color: `${theme.palette.secondary.main}`,
              },
            }}
            size="small"
            variant="contained"
            color="primary"
          >
            COMPLETE YOUR PROFILE
          </Button>
        </Link>
      ) : (
        <Link href="/account/profile/verify">
          <Button
            sx={{
              py: 1.1,
              width: {
                xs: 150,
                sm: 200,
                md: 200,
                lg: 250,
                xl: 250,
              },
              mt: 1,
              fontWeight: 400,
              fontSize: {
                xs: `0.7rem`,
                sm: `0.5rem`,
                md: `1rem`,
                lg: `1rem`,
              },
              backgroundColor: `${theme.palette.primary.main}`,
              color: `${theme.palette.secondary.main}`,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.light}`,
                color: `${theme.palette.secondary.main}`,
              },
            }}
            size="small"
            variant="contained"
            color="primary"
          >
            Verify Account
          </Button>
        </Link>
      )} */}
    </BadgeWrapper>
  );
};

const BadgeWrapper = styled(`div`)(({ theme }: any) => ({
  padding: `2rem`,
  background: theme.palette.secondary.light,
  color: theme.palette.primary.main,
  display: `flex`,
  alignItems: `center`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  margin: ` 3rem 0`,

  '.title': {
    marginBottom: `0.4rem`,
  },
  '.ButtonLink': {
    color: theme.palette.secondary.main,
    background: theme.palette.primary.main,
    padding: `1rem 3rem`,
    fontWeight: `600`,
  },

  '@media (max-width: 900px)': {
    flexDirection: `column`,
    textAlign: `center`,
    margin: ` 2rem 0`,

    '.ButtonLink': {
      width: `100%`,
      textAlign: `center`,
      marginTop: `1rem`,
      padding: `0.8rem 3rem`,
    },
  },

  '@media (max-width: 500px)': {
    flexDirection: `column`,
    margin: ` 2rem 0`,
    padding: `1rem`,

    '.title': {
      fontSize: `1rem`,
      marginBottom: `0.2rem`,
    },
    p: {
      fontSize: `0.8rem`,
    },

    '.ButtonLink': {
      width: `100%`,
      textAlign: `center`,
      marginTop: `1rem`,
      padding: `0.8rem 3rem`,
    },
  },
}));

export default Badge;
