import React from 'react';
import Layout from '@/components/vendors/Layout';
import { Box, Container, Stack, Typography } from '@mui/material';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import Divider from '@/components/common/Divider';
export { getServerSideProps } from '@/hooks/useFetchToken';
import StyleIcon from '@mui/icons-material/Style';
import EventDetailsDrawer from '@/components/vendors/EventDetailsDrawer';

const EventsPage = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData } = useFetch(`/profiles/${userInfo}`, token);
  return (
    <Layout data={queryData?.provider}>
      <Container sx={{ pt: 15 }} maxWidth="md">
        <Stack
          direction="row"
          sx={{
            alignItems: `center`,
            mb: {
              xs: 3,
              sm: 3,
              md: 4,
              lg: 4,
              xl: 4,
            },
          }}
        >
          <StyleIcon
            sx={{
              color: `primary.main`,
              fontSize: `1.5rem`,
              mr: 1,
            }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              color: `primary.main`,
              fontSize: `1.5rem`,
            }}
          >
            My Events
          </Typography>
        </Stack>
        <Divider />
        <Box pt={2} pb={6}>
          {/* Events Cards */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Stack
              key={i}
              direction="row"
              sx={{
                justifyContent: `space-around`,
                border: `solid 1px #ccc`,
                p: 2,
                borderRadius: `10px`,
                boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                mb: 2,
                backgroundColor: `#fff`,
                cursor: `pointer`,
              }}
            >
              <Box
                sx={{
                  position: `relative`,
                  width: `40px`,
                  height: `40px`,
                  borderRadius: `50%`,
                  backgroundColor: `primary.main`,
                }}
              ></Box>
              <Typography>John</Typography>
              <Typography>Sep 2023</Typography>
              <Typography>$34,000</Typography>
              <EventDetailsDrawer id={i} />
            </Stack>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default EventsPage;
