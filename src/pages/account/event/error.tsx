import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import { Typography, Button, Box, Divider } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import axios from 'axios';
import { formatCurrency } from '@/utils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';
import theme from '@/styles/theme';
import CustomButton from '@/components/common/CustomButton';
import ErrorIcon from '@mui/icons-material/Error';
import successBanner from '@/public/successBanner.png';
import Image from 'next/image';

interface Props {
  token: string;
}

const ErrorPage = ({ token }: Props) => {
  const router = useRouter();
  const [eventID, setEventID] = useState<any>();

  useEffect(() => {
    setEventID(localStorage.getItem(`eventID`));
  }, []);

  return (
    <DashboardLayout token={token}>
      <section>
        <Box
          sx={{
            display: `grid`,
            gridTemplateColumns: `1fr`,
            gap: `2rem`,
          }}
        >
          <Box sx={{ width: `50%`, margin: `0 auto` }}>
            <Box
              sx={{
                p: 4,
                mt: 4,
                border: `solid 1px ${theme.palette.secondary.main}`,
                textAlign: `center`,
                color: `error.main`,
              }}
            >
              <ErrorIcon
                sx={{
                  width: `50px`,
                  height: `50px`,
                  margin: `0 auto`,
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
              <Link href={`/account/event/${eventID}`}>
                <Button sx={{ mt: 4 }} variant="contained">
                  Proceed with checkout
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </section>
    </DashboardLayout>
  );
};

export default ErrorPage;
