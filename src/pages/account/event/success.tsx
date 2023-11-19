import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import useFetch from '@/hooks/useFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Typography, Box, Divider } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import axios from 'axios';
import { formatCurrency } from '@/utils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';
import theme from '@/styles/theme';
import CustomButton from '@/components/common/CustomButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import successBanner from '@/public/successBanner.png';
import Image from 'next/image';
import { useAuth } from '@/hooks/authContext';

interface Props {
  token: string;
}

const SuccessPage = ({ token }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = user?.provider?._id;
  const { notifyData } = useSelector((state: RootState) => state.notifications);
  const [confirm, setConfirm] = useState(false);
  const [userEmail] = useState(
    typeof window !== 'undefined' && localStorage.getItem('userEmail'),
  );
  const router = useRouter();

  const handleAcceptOffer = async () => {
    const res = await fetch(
      `/${
        userInfo === 'provider'
          ? `provider-profiles/${userInfo}/accept-offer`
          : userInfo === 'planner'
          ? `planner-profiles/${userInfo}/accept-offer`
          : null
      }/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      },
    );
    const data = await res.json();
  };

  return (
    <DashboardLayout token={token}>
      <section>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
          }}
        >
          <Box sx={{ width: '50%', margin: '0 auto' }}>
            <Box
              sx={{
                p: 4,
                mt: 4,
                border: `solid 1px ${theme.palette.secondary.main}`,
                textAlign: 'center',
                color: 'secondary.main',
              }}
            >
              <DoneAllIcon
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
                Your payment is successful
              </Typography>
              <Typography
                color="primary.main"
                textAlign="center"
                mt={2}
                mb={4}
                display="flex"
                justifyContent="center"
              >
                We`ve sent a receipt to{' '}
                <Typography ml={1} color="secondary.main">
                  {userEmail}
                </Typography>
              </Typography>
              <Divider />
              <Box
                sx={{ width: '100%', height: '100px', position: 'relative' }}
              >
                <Image src={successBanner} alt="Success Banner" fill />
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </DashboardLayout>
  );
};

export default SuccessPage;
