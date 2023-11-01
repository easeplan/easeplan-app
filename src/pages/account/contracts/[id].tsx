import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { formatCurrency } from '@/utils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';
import theme from '@/styles/theme';
import { parseCookies } from '@/lib/parseCookies';
import AcceptOfferConfirmModal from '@/components/AcceptOfferConfirmModal';
import DeclienedOfferConfirmModal from '@/components/DeclienedOfferConfirmModal';
import CustomButton from '@/components/common/CustomButton';
import DangerButton from '@/components/common/DangerButton';
import customFetch from '@/utils/customFetch';

/* TODO:
 *
 * Accepted == Awaiting Payment
 * Paid == Work in progress
 * Declined == Declined (make red)
 * Disputed == Disputed (Red)
 */
interface Props {
  token: string;
  data: any;
}

enum EventStatus {
  REQUESTED = `Requested`,
  ACCEPTED = `Accepted`,
  DECLINED = `Declined`,
  CANCELLED = `Cancelled`,
  COMPLETED = `Completed`,
  DISPUTED = `Disputed`,
  RESOLVED = `Resolved`,
  PAID = `Paid`,
}

const ContractsPage = ({ token, data }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [confirm, setConfirm] = useState(false);
  const [declined, setDecliend] = useState(false);

  const handleAcceptOffer = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/${`profiles/${data?._id}/accept-offer`}`,
        {
          method: `PUT`,
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const resData = await res.json();
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 3000);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    }
  };

  const handleDecliendOffer = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/${`profiles/${data?._id}/decline-offer`}`,
        {
          method: `PUT`,
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const resData = await res.json();
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        router.push(`/account/`);
      }, 2000);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    }
  };

  const RenderStatusUI = {
    [EventStatus.COMPLETED]: () => (
      <Typography
        sx={{
          padding: `0.3rem 1rem`,
          backgroundColor: `primary.main`,
        }}
        fontWeight="600"
        fontSize="1rem"
        color="secondary.main"
      >
        Event Completed
      </Typography>
    ),
    [EventStatus.ACCEPTED]: () => (
      <Typography
        sx={{
          padding: `0.3rem 1rem`,
          backgroundColor: `primary.main`,
        }}
        fontWeight="600"
        fontSize="1rem"
        color="secondary.main"
      >
        Awaiting Payment
      </Typography>
    ),
    [EventStatus.RESOLVED]: () => (
      <Typography
        sx={{
          padding: `0.3rem 1rem`,
          backgroundColor: `primary.main`,
        }}
        fontWeight="600"
        fontSize="1rem"
        color="secondary.main"
      >
        Dispute Resolved
      </Typography>
    ),
    [EventStatus.REQUESTED]: () => (
      <Typography
        sx={{
          padding: `0.3rem 1rem`,
          backgroundColor: `primary.main`,
        }}
        fontWeight="600"
        fontSize="1rem"
        color="secondary.main"
      >
        Pending
      </Typography>
    ),
    [EventStatus.PAID]: () => (
      <Typography
        sx={{
          padding: `0.3rem 1rem`,
          backgroundColor: `primary.main`,
        }}
        fontWeight="600"
        fontSize="1rem"
        color="secondary.main"
      >
        Work in Progress
      </Typography>
    ),
    [EventStatus.CANCELLED]: () => (
      <Typography
        sx={{
          padding: `0.3rem 1rem`,
          backgroundColor: `yellow`,
          color: `red`,
        }}
        fontWeight="600"
        fontSize="1rem"
        color="secondary.main"
      >
        Cancelled
      </Typography>
    ),
    [EventStatus.DECLINED]: () => (
      <Typography
        sx={{
          padding: `0.3rem 1rem`,
          backgroundColor: `red`,
          color: `white`,
        }}
        fontWeight="600"
        fontSize="1rem"
        color="secondary.main"
      >
        Declined
      </Typography>
    ),
    [EventStatus.DISPUTED]: () => (
      <Typography
        sx={{
          padding: `0.3rem 1rem`,
          backgroundColor: `red`,
          color: `white`,
        }}
        fontWeight="600"
        fontSize="1rem"
        color="secondary.main"
      >
        Disputed
      </Typography>
    ),
  };

  // data.status = EventStatus.CANCELLED;

  return (
    <DashboardLayout token={token}>
      <section>
        <AcceptOfferConfirmModal
          isOpen={confirm}
          isClose={() => setConfirm(false)}
        >
          <Box sx={{ p: 4, textAlign: `center` }}>
            {isSuccess ? (
              <Typography mb={4} variant="h6">
                Offer Accepted ✨🎉⭐🤝
              </Typography>
            ) : (
              <Typography mb={4} variant="h5">
                Yes I want to accept this Job offer
              </Typography>
            )}

            {isSuccess ? (
              <Link href="/account/wallet">
                <CustomButton
                  loading={isLoading}
                  onClick={handleAcceptOffer}
                  bgPrimary
                >
                  Check for payment status
                </CustomButton>
              </Link>
            ) : (
              <CustomButton
                loading={isLoading}
                onClick={handleAcceptOffer}
                bgPrimary
              >
                Accept Offer
              </CustomButton>
            )}
          </Box>
        </AcceptOfferConfirmModal>

        <DeclienedOfferConfirmModal
          isOpen={declined}
          isClose={() => setDecliend(false)}
        >
          <Box sx={{ p: 4, textAlign: `center` }}>
            {isSuccess ? (
              <Typography mb={4} variant="h6">
                Declined 😥😥😥
              </Typography>
            ) : (
              <Typography mb={4} variant="h6">
                Yes I want to decliend this Job offer 😥
              </Typography>
            )}

            <DangerButton
              loading={isLoading}
              onClick={handleDecliendOffer}
              bgPrimary
            >
              Decliend Offer
            </DangerButton>
          </Box>
        </DeclienedOfferConfirmModal>

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
              {data.state}, {data?.city}
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
              {data.budget && formatCurrency(data?.budget)}
            </Typography>
          </Box>
          <>
            {data.status === `Accepted` ? (
              <Box
                sx={{
                  textAlign: `center`,
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
                    Event Planning has started
                  </Typography>
                  <Typography color="grey.500" mt={1}>
                    The countdown is now ticking
                  </Typography>
                </Box>
              </Box>
            ) : (
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
                    onClick={() => setDecliend(true)}
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
                    Declined
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
            )}
          </>
        </Box>
      </section>
    </DashboardLayout>
  );
};

export async function getServerSideProps({ req, params }: any) {
  const { id } = params;
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  // Fetch data based on the dynamicParam
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contracts/${id}/contract`,
    {
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return {
    props: {
      token: token,
      data: data?.data,
    },
  };
}

export default ContractsPage;
