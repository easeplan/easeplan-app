/* eslint-disable @typescript-eslint/no-use-before-define */
import theme from '@/styles/theme';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// import styled from 'styled-components';
import { styled } from '@mui/material/styles';

type NavProps = {
  href: string;
  text: string;
  onClick?: () => void;
};

function NavItem({ href, text, onClick }: NavProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <ItemWrapper onClick={onClick}>
      <NextLink
        href={href}
        style={
          isActive
            ? { fontWeight: 'bold', color: `${theme.palette.secondary.main}` }
            : { fontWeight: 'normal' }
        }
      >
        <span className="capsize md:text-1xl">{text}</span>
      </NextLink>
    </ItemWrapper>
  );
}

const ItemWrapper = styled('li')({
  listStyle: 'none',
  marginRight: '2.5rem',
  color: theme.palette.secondary.light,
  textTransform: 'uppercase',
  lineHeight: '16px',
  letterSpacing: '0.0125em',
  fontSize: '0.8rem',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  transition: '0.1s all ease',

  '@media (max-width: 1025px)': {
    marginRight: '2rem',
  },

  '@media (max-width: 1020px)': {
    color: theme.palette.primary.main,
    lineHeight: '5rem',
    fontSize: '1.2rem',
    transition: '0.5s all ease',

    '&:hover': {
      opacity: '0.8',
      paddingLeft: '1rem',
      fontWeight: 'bold',
    },
  },
});

export default NavItem;
