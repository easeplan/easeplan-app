import { useEffect, useState } from 'react';
import Layout from '@/components/vendors/Layout';
import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import Divider from '@/components/common/Divider';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import StyleIcon from '@mui/icons-material/Style';
import EventDetailsDrawer from '@/components/vendors/EventDetailsDrawer';
import { setNotifyData } from '@/features/notificationsSlice';
import { dateFormater, formatCurrency } from '@/utils';

const EventsPage = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData } = useFetch(`/profiles/${userInfo}`, token);
  const dispatch = useDispatch();
  const [contracts, setContracts] = useState<any>();

  const fetchContracts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contracts/${userInfo}`,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();
      setContracts(json?.data);
      dispatch(setNotifyData(json?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);
  return (
    <Layout data={queryData?.provider}>
      <Container sx={{ pt: 4 }} maxWidth="md">
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
          {contracts?.map((contract: any) => (
            <Stack
              key={contract._id}
              direction="row"
              sx={{
                justifyContent: `space-around`,
                alignItems: `center`,
                border: `solid 1px #ccc`,
                p: 2,
                borderRadius: `10px`,
                boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                mb: 2,
                backgroundColor: `#fff`,
                cursor: `pointer`,
              }}
            >
              <Box>
                <Box
                  sx={{
                    margin: `0 auto`,
                    textAlign: `center`,
                  }}
                >
                  <Avatar
                    alt={contract?.parties?.receiver?.profile?.firstName}
                    src={contract?.parties?.receiver?.profile?.picture}
                    sx={{
                      width: 56,
                      height: 56,
                      mt: 2,
                      mb: 2,
                      backgroundColor: `primary.main`,
                    }}
                  />
                </Box>
                <Typography mt={1}>{contract?.service}</Typography>
                <Typography fontWeight="bold" color="primary.main">
                  <small>₦</small>
                  {formatCurrency(contract?.budget)}
                </Typography>
              </Box>
              <Typography>{dateFormater(contract?.createdAt)}</Typography>
              <EventDetailsDrawer data={contract} id={contract?._id} />
            </Stack>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default EventsPage;
