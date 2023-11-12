import Button from '@mui/material/Button';
import React, { Fragment } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

type Props = {
  text: string;
  onClick?: () => void;
  href?: any;
};

const GoogleButton = ({ text, onClick, href }: Props) => {
  return (
    <Fragment>
      {href ? (
        <Link href={href}>
          <Button
            onClick={onClick}
            variant="outlined"
            sx={{
              width: '100%',
              textTransform: 'inherit',
              mb: 2,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: {
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 2,
              },

              '.btnText': {
                fontWeight: '600',
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.8rem',
                  md: '0.8rem',
                  lg: '0.9rem',
                  xl: '0.9rem',
                },
              },

              '.btnIcon': {
                fontSize: {
                  xs: '1.3rem',
                  sm: '1.3rem',
                  md: '1.2rem',
                  lg: '1.2rem',
                  xl: '1.5rem',
                },
                mr: {
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                },
              },
            }}
          >
            <FcGoogle className="btnIcon" />
            <span className="btnText">{text}</span>
          </Button>
        </Link>
      ) : (
        <Button
          onClick={onClick}
          variant="outlined"
          sx={{
            textTransform: 'inherit',
            mb: 2,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: {
              xs: 2,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 2,
            },

            '.btnText': {
              fontWeight: '600',
              fontSize: {
                xs: '0.8rem',
                sm: '0.8rem',
                md: '0.8rem',
                lg: '0.9rem',
                xl: '0.9rem',
              },
            },

            '.btnIcon': {
              fontSize: {
                xs: '1.3rem',
                sm: '1.3rem',
                md: '1.2rem',
                lg: '1.2rem',
                xl: '1.5rem',
              },
              mr: {
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
              },
            },
          }}
        >
          <FcGoogle className="btnIcon" />
          <span className="btnText">{text}</span>
        </Button>
      )}
    </Fragment>
  );
};

export default GoogleButton;
