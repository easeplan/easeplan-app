/* eslint-disable @typescript-eslint/no-use-before-define */
import theme from '@/styles/theme';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// import styled from 'styled-components';
import { styled } from '@mui/material/styles';

type NavProps = {
  href: string;
  text?: string;
  icon: React.ReactElement;
};

function SidebarItem({ href, text, icon }: NavProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <ItemWrapper>
      <NextLink href={href}>
        <Flex>
          <span
            className="icon"
            style={
              isActive
                ? {
                    fontWeight: 'bold',
                    color: `${theme.palette.secondary.main}`,
                  }
                : { fontWeight: 'normal' }
            }
          >
            {icon}
          </span>
          {text && (
            <span
              className="text"
              style={
                isActive
                  ? {
                      fontWeight: 'bold',
                      color: `${theme.palette.secondary.main}`,
                    }
                  : { fontWeight: 'normal' }
              }
            >
              {text}
            </span>
          )}
        </Flex>
      </NextLink>
    </ItemWrapper>
  );
}

const ItemWrapper = styled('li')({
  listStyle: 'none',
  marginRight: '2.5rem',
  color: theme.palette.secondary.contrastText,
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

  '@media (max-width: 900px)': {
    marginRight: '0',
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

const Flex = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textTransform: 'capitalize',
  fontSize: '1rem',
  color: theme.palette.common.white,

  '.icon': {
    marginRight: '1rem',

    '@media (max-width: 900px)': {
      marginRight: '0',
    },
  },
}));

export default SidebarItem;
