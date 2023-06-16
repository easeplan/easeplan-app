import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import useFetch from '@/hooks/useFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Typography, Box } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import axios from 'axios';
import { formatCurrency } from '@/utils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';

interface Props {
  token: string;
}

const NotificationPage = ({ token }: Props) => {
  const router = useRouter();
  const { notifyData } = useSelector((state: RootState) => state.notifications);
  const { id } = router.query;

  console.log(notifyData?.data[43].package);

  return (
    <DashboardLayout token={token}>
      <section>
        {notifyData?.data.map((data: any) =>
          data?._id === id ? (
            <Box key={data?._id}>
              <Box
                sx={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  alignItems: `center`,
                  p: 4,
                  mt: 4,
                  backgroundColor: `secondary.light`,
                }}
              >
                <Typography
                  fontWeight="600"
                  fontSize="1rem"
                  color="primary.main"
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                  }}
                >
                  <LocationOnIcon /> {data.state}, {data?.city}
                </Typography>
                <Typography
                  fontWeight="600"
                  fontSize="1.5rem"
                  color="primary.main"
                >
                  {data.budget && formatCurrency(data?.budget)}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: `secondary.light`,
                }}
              >
                <Typography
                  fontWeight="600"
                  fontSize="1rem"
                  color="primary.main"
                >
                  Basic
                </Typography>
                <Typography
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    color: `primary.main`,
                    mt: 1,
                  }}
                >
                  <CheckIcon sx={{ color: `secondary.main`, mr: 1 }} /> Basic
                </Typography>
                <Typography
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    color: `primary.main`,
                    mt: 1,
                  }}
                >
                  <CheckIcon sx={{ color: `secondary.main`, mr: 1 }} /> Basic
                </Typography>
                <Typography
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    color: `primary.main`,
                    mt: 1,
                  }}
                >
                  <CheckIcon sx={{ color: `secondary.main`, mr: 1 }} /> Basic
                </Typography>
              </Box>
              {/* Support CTA */}
              <Box
                sx={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  alignItems: `center`,
                  p: 4,
                  mt: 4,
                  backgroundColor: `primary.main`,
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="secondary.main"
                  >
                    Are you having challenge or need support?
                  </Typography>
                  <Typography color="#ccc">
                    Please click to visit the resolution center
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: `secondary.main`,
                    color: `primary.main`,
                    py: 1,
                    px: 2,
                    fontWeight: `600`,
                  }}
                >
                  <Link href="/dashboard/support">Resolution center</Link>
                </Box>
              </Box>
            </Box>
          ) : null,
        )}
      </section>
    </DashboardLayout>
  );
};

export default NotificationPage;
