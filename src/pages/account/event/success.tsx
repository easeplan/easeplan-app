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
import successBanner from '@/public/successBanner.png';
import Image from 'next/image';

interface Props {
  token: string;
}

const SuccessPage = ({ token }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { notifyData } = useSelector((state: RootState) => state.notifications);
  const [confirm, setConfirm] = useState(false);
  const [userEmail] = useState(
    typeof window !== `undefined` && localStorage.getItem(`userEmail`),
  );
  const router = useRouter();

  const handleAcceptOffer = async () => {
    const res = await fetch(
      `/${
        userInfo?.role === `provider`
          ? `provider-profiles/${userInfo?._id}/accept-offer`
          : userInfo?.role === `planner`
          ? `planner-profiles/${userInfo?._id}/accept-offer`
          : null
      }/`,
      {
        method: `GET`,
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
  };

  return (
    <DashboardLayout token={token}>
      <section>
        <Box
          sx={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `2rem`,
          }}
        >
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
                  fontSize: {
                    xs: `0.8rem`,
                    sm: `0.8rem`,
                    md: `1rem`,
                    lg: `1rem`,
                    lx: `1rem`,
                  },
                }}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: {
                      xs: `0.9rem`,
                      sm: `0.9rem`,
                      md: `1rem`,
                      lg: `1rem`,
                      lx: `1rem`,
                    },
                  }}
                />
                State
              </Typography>
              <Typography
                fontWeight="600"
                sx={{
                  fontSize: {
                    xs: `1rem`,
                    sm: `1rem`,
                    md: `1.3rem`,
                    lg: `1.5rem`,
                    lx: `1.5rem`,
                  },
                }}
                color="primary.main"
              >
                56000
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
                <Typography
                  fontWeight="600"
                  fontSize="1rem"
                  color="primary.main"
                >
                  Basic
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
                    gap: `1rem`,
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
                      px: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                        lg: 4,
                      },
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
                      px: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                        lg: 4,
                      },
                      fontWeight: `600`,
                      cursor: `pointer`,
                    }}
                    onClick={() => setConfirm(true)}
                  >
                    Accept
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
          <Box>
            <Box
              sx={{
                p: 4,
                mt: 4,
                border: `solid 1px ${theme.palette.secondary.main}`,
              }}
            >
              <Box
                sx={{
                  width: `50px`,
                  height: `50px`,
                  backgroundColor: `primary.main`,
                  margin: `0 auto`,
                }}
              ></Box>
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
                We`ve sent a receipt to{` `}
                <Typography ml={1} color="secondary.main">
                  {userEmail}
                </Typography>
              </Typography>
              <Divider />
              <Box
                sx={{ width: `100%`, height: `100px`, position: `relative` }}
              >
                <Image src={successBanner} alt="Success Banner" fill />
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Support CTA */}
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
            mt: 10,
            backgroundColor: `primary.main`,
          }}
        >
          <Box
            sx={{
              mb: {
                xs: `2rem`,
                sm: `2rem`,
              },
            }}
          >
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
      </section>
    </DashboardLayout>
  );
};

export default SuccessPage;
