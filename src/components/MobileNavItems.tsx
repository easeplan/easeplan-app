/* eslint-disable @typescript-eslint/no-use-before-define */
import theme from '@/styles/theme';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// import styled from 'styled-components';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

type NavProps = {
  href: string;
  text?: string;
  icon: React.ReactElement;
};

function MobileNavItems({ href, text, icon }: NavProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <ItemWrapper>
      <NextLink href={href}>
        <Box sx={{ textAlign: 'center' }}>
          <div
            style={
              isActive
                ? {
                    fontWeight: 'bold',
                    color: `${theme.palette.secondary.main}`,
                  }
                : {
                    fontWeight: 'normal',
                    color: `${theme.palette.secondary.light}`,
                  }
            }
          >
            {icon}
          </div>
          {text && (
            <p
              style={
                isActive
                  ? {
                      fontSize: '0.7rem',
                      margin: '0',
                      color: `${theme.palette.secondary.main}`,
                    }
                  : {
                      fontWeight: 'normal',
                      margin: '0',
                      color: `${theme.palette.secondary.light}`,
                      fontSize: '0.7rem',
                    }
              }
            >
              {text}
            </p>
          )}
        </Box>
      </NextLink>
    </ItemWrapper>
  );
}

const ItemWrapper = styled('div')({
  color: theme.palette.secondary.contrastText,
  transition: '0.1s all ease',
  margin: '0',

  button: {
    border: 'none',
    background: 'none',
    outline: 'none',
    margin: '0',
  },

  '@media (max-width: 1020px)': {
    color: theme.palette.primary.main,
    transition: '0.5s all ease',
  },
});
export default MobileNavItems;
