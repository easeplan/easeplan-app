import { useEffect, useState } from 'react';
import Layout from '@/components/vendors/Layout';
import {
  Avatar,
  Box,
  CardActions,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import Divider from '@/components/common/Divider';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import StyleIcon from '@mui/icons-material/Style';
import EventDetailsDrawer from '@/components/vendors/EventDetailsDrawer';
import { setNotifyData } from '@/features/notificationsSlice';
import { dateFormater, formatCurrency } from '@/utils';
import { Card, CardContent, Chip, Button } from '@mui/material';
import { useAuth } from '@/hooks/authContext';

const EventsPage = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // const { queryData } = useFetch(`/profiles/${userInfo}`, token);
  const dispatch = useDispatch();
  const [contracts, setContracts] = useState<any>();
  const { user } = useAuth();

  const fetchContracts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contracts/${user?.provider._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
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
  const cardData = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Event Planner',
      location: 'Rivers State',
      offerAmount: '2,000000',
      eventDate: '10-10-2023',
    },
    {
      id: 1,
      name: 'John Doe',
      role: 'Event Planner',
      location: 'Rivers State',
      offerAmount: '2,000000',
      eventDate: '10-10-2023',
    },
    // ... other card data objects
  ];

  const ContractCard = ({ contract }: any) => {
    return (
      <Card
        key={contract._id}
        sx={{
          borderRadius: '16px',
          padding: '8px',
          boxShadow: 3,
          width: 345,
          position: 'relative',
          border: '1px solid black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
          }}
        >
          <Avatar
            sx={{ width: 56, height: 56, marginRight: '16px' }}
            alt={contract?.parties?.receiver?.profile?.firstName}
            src={contract?.parties?.receiver?.profile?.picture}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">
              {contract?.parties?.receiver?.profile?.firstName +
                ' ' +
                contract?.parties?.receiver?.profile?.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {contract?.service}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {contract?.state}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={contract.status}
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor:
              contract.status === 'Accepted' ? 'secondary.main' : '#ffebee',
          }}
        />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="body2" component="p">
                <span style={{ fontWeight: '500' }}> Offer Amount:</span>{' '}
                {formatCurrency(contract?.budget)}
              </Typography>
              <Typography variant="body2" component="p">
                <span style={{ fontWeight: '500' }}>Event Date:</span>{' '}
                {contract?.dateTime}
              </Typography>
            </Box>
            <CardActions>
              <Button
                href={`/user/events/${contract._id}`}
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '8px',
                }}
              >
                View
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout data={user?.provider}>
      <Container sx={{ pt: 4 }} maxWidth="md">
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            mb: {
              xs: 3,
              sm: 3,
              md: 4,
              lg: 4,
              xl: 4,
            },
            // mt: {
            //   xs: 5,
            //   sm: 5,
            //   md: 4,
            //   lg: 10,
            //   xl: 10,
            // },
          }}
        >
          <StyleIcon
            sx={{
              color: 'primary.main',
              fontSize: '1.5rem',
              mr: 1,
            }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              color: 'primary.main',
              fontSize: '1.5rem',
            }}
          >
            My Events
          </Typography>
        </Stack>
        <Divider />
        <Grid container spacing={1} pt={2} pb={6}>
          {contracts?.map((contract: any) => (
            <>
              <Grid item key={contract._id} xs={12} sm={6} md={6} lg={4}>
                <ContractCard contract={contract} />
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default EventsPage;
