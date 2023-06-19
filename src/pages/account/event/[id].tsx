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
import theme from '@/styles/theme';

interface Props {
  token: string;
}

const EventDetailsPage = ({ token }: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { id } = router.query;

  return (
    <DashboardLayout token={token}>
      <section>
        <Box>
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
              <LocationOnIcon /> Lagos, Ajah
              {/* <LocationOnIcon /> {data.state}, {data?.city} */}
            </Typography>
            <Typography fontWeight="600" fontSize="1.5rem" color="primary.main">
              NGN 34,000.00
              {/* {data.budget && formatCurrency(data?.budget)} */}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 4,
              mt: 4,
              backgroundColor: `secondary.light`,
            }}
          >
            <Box
              sx={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
              }}
            >
              <Typography fontWeight="600" fontSize="1rem" color="primary.main">
                Basic
              </Typography>
              <Typography
                sx={{ padding: `0.3rem 1rem`, backgroundColor: `primary.main` }}
                fontWeight="600"
                fontSize="1rem"
                color="secondary.main"
              >
                Pending
              </Typography>
            </Box>
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
          {userInfo?.role === `provider` || userInfo?.role === `planner` ? (
            <Box
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
                  <Link href="/dashboard/support">Declined</Link>
                </Box>
                <Box
                  sx={{
                    backgroundColor: `primary.main`,
                    color: `secondary.main`,
                    py: 1,
                    px: 6,
                    fontWeight: `600`,
                    cursor: `pointer`,
                  }}
                >
                  Accept
                </Box>
              </Box>
            </Box>
          ) : null}
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
      </section>
    </DashboardLayout>
  );
};

export default EventDetailsPage;
