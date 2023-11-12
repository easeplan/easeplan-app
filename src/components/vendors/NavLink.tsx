/* eslint-disable @typescript-eslint/no-use-before-define */
import theme from '@/styles/theme';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// import styled from 'styled-components';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

type NavProps = {
  href?: string;
  text: string;
  onClick?: () => void;
};

function NavLink({ href, text, onClick }: NavProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <>
      {onClick ? (
        <ItemWrapper onClick={onClick}>
          <Typography
            style={
              isActive
                ? {
                    fontWeight: 'bold',
                    color: `${theme.palette.primary.main}`,
                    textTransform: 'capitalize',
                  }
                : {
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    color: `${theme.palette.primary.main}`,
                  }
            }
          >
            <span className="capsize md:text-1xl">{text}</span>
          </Typography>
        </ItemWrapper>
      ) : (
        <ItemWrapper>
          <NextLink
            href={href ? href : ''}
            style={
              isActive
                ? {
                    fontWeight: 'bold',
                    color: `${theme.palette.primary.main}`,
                    textTransform: 'capitalize',
                  }
                : {
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    color: `${theme.palette.primary.main}`,
                  }
            }
          >
            <span className="capsize md:text-1xl">{text}</span>
          </NextLink>
        </ItemWrapper>
      )}
    </>
  );
}

const ItemWrapper = styled('li')({
  listStyle: 'none',
  //   marginRight: `2.5rem`,
  //   color: theme.palette.secondary.light,
  textTransform: 'uppercase',
  //   lineHeight: `16px`,
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '600',
  whiteSpace: 'nowrap',
  transition: '0.1s all ease',

  '@media (max-width: 1025px)': {
    // marginRight: `2rem`,
  },

  '@media (max-width: 1020px)': {
    // color: theme.palette.primary.main,
    // lineHeight: `3rem`,
    fontSize: '1rem',
    transition: '0.5s all ease',

    '&:hover': {
      opacity: '0.8',
      paddingLeft: '1rem',
      fontWeight: 'bold',
    },
  },
});

export default NavLink;
