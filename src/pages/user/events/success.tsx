import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Typography, Box, Divider } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import theme from '@/styles/theme';
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
