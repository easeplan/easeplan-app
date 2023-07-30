import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setNotifyData } from '@/features/notificationsSlice';
import { Box, Typography, Divider } from '@mui/material';
import Link from 'next/link';
import theme from '@/styles/theme';

const EventPage = ({ token }: any) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [contracts, setContracts] = useState<any>();

  const fetchContracts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contracts/${userInfo?._id}`,
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
    <DashboardLayout token={token}>
      <Typography variant="h5" mt={4} mb={3} color="primary.main">
        Events
      </Typography>
      <Divider />

      <>
        {contracts?.map((list: any) => (
          <Box
            key={list?._id}
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: `center`,
              flexDirection: {
                xs: `column`,
                sm: `column`,
                md: `row`,
                lg: `row`,
                xl: `row`,
              },
              p: 4,
              mt: 4,
              border: ` solid 1px #ccc`,
            }}
          >
            <Box>
              <Box>
                <Typography
                  fontWeight="600"
                  fontSize="1.2rem"
                  color="primary.main"
                >
                  Are you available for this gig?
                </Typography>
                <Typography color="grey.500" mt={1}>
                  If you are please accept the event or decline if you are not
                  available
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
                gap: `2rem`,
                mt: {
                  xs: `2rem`,
                  sm: `2rem`,
                },
              }}
            >
              <Box
                sx={{
                  border: `solid 1px ${theme.palette.primary.main}`,
                  color: `primary.main`,
                  py: 1,
                  px: 4,
                  fontWeight: `600`,
                }}
              >
                <Link href="/dashboard/support">
                  <Typography fontSize="0.9rem">Declined</Typography>
                </Link>
              </Box>
              <Box
                sx={{
                  backgroundColor: `primary.main`,
                  color: `secondary.main`,
                  py: 1,
                  px: 4,
                  fontWeight: `600`,
                }}
              >
                <Link href={`/account/contracts/${list?._id}`}>
                  <Typography fontSize="0.9rem">View Event</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </>
    </DashboardLayout>
  );
};

export default EventPage;
