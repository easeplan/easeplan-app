import { useState, useEffect } from 'react';
import { Typography, Button, Box, Divider } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import Layout from '@/components/vendors/Layout';
import Link from 'next/link';
import ErrorIcon from '@mui/icons-material/Error';

interface Props {
  token: string;
  userData: any;
}

const ErrorPage = ({ userData }: Props) => {
  const [eventID, setEventID] = useState<any>();

  useEffect(() => {
    setEventID(localStorage.getItem('eventID'));
  }, []);

  return (
    <Layout data={userData?.provider}>
      <section>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
          }}
        >
          <Box sx={{ width: { xs: '100%' }, margin: '0 auto' }}>
            <Box
              sx={{
                p: 4,
                mt: 4,
                //border: `solid 1px ${theme.palette.secondary.main}`,
                textAlign: 'center',
                color: 'error.main',
              }}
            >
              <ErrorIcon
                sx={{
                  width: '50px',
                  height: '50px',
                  margin: '0 auto',
                }}
              />
              <Typography
                variant="h6"
                color="primary.main"
                textAlign="center"
                mt={2}
              >
                Your payment Failed 😥
              </Typography>
              <Typography
                color="primary.main"
                textAlign="center"
                mt={2}
                mb={4}
                display="flex"
                justifyContent="center"
              >
                Please try again or contact us for help!
              </Typography>
              <Divider />
              <Link href={`/user/events/${eventID}`}>
                <Button sx={{ mt: 4 }} variant="contained">
                  Proceed with checkout
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </section>
    </Layout>
  );
};

export default ErrorPage;
