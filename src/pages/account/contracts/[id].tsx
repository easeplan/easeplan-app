import { useEffect, useState } from 'react';
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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { useAuth } from '@/hooks/authContext';

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
  userData: any;
}

enum EventStatus {
  REQUESTED = 'Requested',
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
  DISPUTED = 'Disputed',
  RESOLVED = 'Resolved',
  PAID = 'Paid',
}

const ContractsPage = ({ token, data, userData }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const [confirm, setConfirm] = useState(false);
  const [declined, setDecliend] = useState(false);
  const [eventData, setEventData] = useState(data);
  const { setUser } = useAuth();

  // When the component mounts, update the user data in the context
  useEffect(() => {
    if (userData) {
      setUser(userData.provider);
    }
  }, [userData, setUser]);

  const handleAcceptOffer = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/${`profiles/${data?._id}/accept-offer`}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        },
      );
      const resData = await res.json();
      setEventData(resData.data);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 3000);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    }
  };

  const handleCompleteRequest = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/${`profiles/${data?._id}/complete-offer`}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        },
      );
      const resData = await res.json();
      setEventData(resData.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        },
      );
      const resData = await res.json();
      setEventData(resData.data);
      setIsLoading(false);
      setIsSuccess(true);
      // setTimeout(() => {
      //   setIsLoading(false);
      //   setIsSuccess(true);
      //   router.push(`/account/`);
      // }, 2000);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    }
  };

  const RenderStatusUI = {
    [EventStatus.COMPLETED]: () => (
      <Typography
        sx={{
          padding: '0.3rem 1rem',
          backgroundColor: 'primary.main',
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
          padding: '0.3rem 1rem',
          backgroundColor: 'primary.main',
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
          padding: '0.3rem 1rem',
          backgroundColor: 'primary.main',
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
          padding: '0.3rem 1rem',
          backgroundColor: 'primary.main',
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
          padding: '0.3rem 1rem',
          backgroundColor: 'primary.main',
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
          padding: '0.3rem 1rem',
          backgroundColor: 'yellow',
          color: 'red',
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
          padding: '0.3rem 1rem',
          backgroundColor: 'red',
          color: 'white',
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
          padding: '0.3rem 1rem',
          backgroundColor: 'red',
          color: 'white',
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
          text="Accept Job Offer"
        >
          <Box sx={{ p: 4, textAlign: 'center' }}>
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
          <Box sx={{ p: 4, textAlign: 'center' }}>
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

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Event details</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr',
                md: '1fr 1fr',
                lg: '1fr 1fr',
                xl: '1fr 1fr',
              },
              gap: '2rem',
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: 600, md: 500, lg: 600, xl: 500 },
                mt: 4,
                border: ' solid 1px #ccc',
              }}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                      width: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <LocationOnIcon sx={{ mr: 1 }} color="action" />
                      <Typography variant="subtitle1" color="text.secondary">
                        Event Location:
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      {eventData.state}, {eventData?.city}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                      width: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <AttachMoneyIcon sx={{ mr: 1 }} color="action" />
                      <Typography variant="subtitle1" color="text.secondary">
                        Offer Amount:
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      ₦{eventData.budget && formatCurrency(eventData?.budget)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                      width: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <EventIcon sx={{ mr: 1 }} color="action" />
                      <Typography variant="subtitle1" color="text.secondary">
                        Event Data:
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      {eventData.dateTime}
                    </Typography>
                  </Box>
                  {eventData?.parties?.sender?.profile && (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 2,
                          width: '100%',
                        }}
                      >
                        <Box sx={{ display: 'flex' }}>
                          <AccountCircleIcon sx={{ mr: 1 }} color="action" />
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            User Fullname:
                          </Typography>
                        </Box>

                        <Typography variant="subtitle1" color="text.secondary">
                          {eventData?.parties?.sender?.profile?.firstName}{' '}
                          {eventData?.parties?.sender?.profile?.lastName}
                        </Typography>
                      </Box>
                      {(eventData?.parties?.sender.city ||
                        eventData?.parties?.sender.city) && (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 2,
                            width: '100%',
                          }}
                        >
                          <Box sx={{ display: 'flex' }}>
                            <LocationOnIcon sx={{ mr: 1 }} color="action" />
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                            >
                              User Location:
                            </Typography>
                          </Box>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            {eventData?.parties?.sender.city}{' '}
                            {eventData?.parties?.sender.state}
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Box>

          <>
            {eventData.status === 'Accepted' && (
              <Box
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: ' solid 1px #ccc',
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="primary.main"
                  >
                    Offer Accepted - Awaiting Payment
                  </Typography>
                  <Typography color="grey.500" mt={1}>
                    You&apos;ll commence service once the payment is received.
                    Please monitor your account for the payment confirmation.
                  </Typography>
                </Box>
              </Box>
            )}

            {eventData.status === 'Cancelled' && (
              <Box
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: 'solid 1px red', // Changed the border color to red for danger indication
                  backgroundColor: '#ffebee',
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="primary.main"
                  >
                    Event Cancellation Notice
                  </Typography>
                  <Typography color="grey.800" mt={1}>
                    Unfortunately, the event has been cancelled. Please check
                    your email or account for further details regarding the
                    cancellation policy and potential next steps.
                  </Typography>
                </Box>
              </Box>
            )}
            {eventData.status === 'Declined' && (
              <Box
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: 'solid 1px red', // Changed the border color to red for danger indication
                  backgroundColor: '#ffebee',
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="primary.main"
                  >
                    Event Declination Confirmation
                  </Typography>
                  <Typography color="grey.800" mt={1}>
                    You have declined the event offer. Details regarding this
                    decision have been sent to your email. Please review our
                    service provider policies for information on declinations
                    and manage your upcoming events in your account.
                  </Typography>
                </Box>
              </Box>
            )}
            {eventData.status === 'paid' && (
              <Box
                sx={{
                  // textAlign: `center`,
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: ' solid 1px #ccc',
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="primary.main"
                  >
                    Event Planning has started!
                  </Typography>
                  <Typography color="grey.500" mt={1}>
                    Provide quality services to get more bookings. Remember to
                    communicate regularly with the client for any updates or
                    clarifications.
                  </Typography>
                  <CustomButton
                    loading={isLoading}
                    onClick={handleCompleteRequest}
                    sx={{ mt: '1rem' }}
                    variant="outlined"
                    style={{ color: '#174E64' }}
                  >
                    Mark As Completed
                  </CustomButton>
                </Box>
              </Box>
            )}

            {eventData.status === 'Disputed' && (
              <Box
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: 'solid 1px orange', // Orange color to indicate caution
                  backgroundColor: '#fff8e1',
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="primary.main"
                  >
                    Dispute Notice
                  </Typography>
                  <Typography color="grey.500" mt={1}>
                    A dispute has been filed for this event. Please review the
                    details in your account and respond accordingly
                    <Link href="/" style={{ fontWeight: 700 }}>
                      [Dispute resolution Center]
                    </Link>
                    .
                  </Typography>
                </Box>
              </Box>
            )}
            {eventData.status === 'Completed' && (
              <Box
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: 'solid 1px green', // Green color to signify resolution
                  backgroundColor: '#e8f5e9',
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="primary.main"
                  >
                    Event Completion Confirmation
                  </Typography>
                  <Typography color="grey.800" mt={1}>
                    The event has been marked as completed. We have notified the
                    client to approve the payment. For a quicker resolution,
                    consider reaching out directly to the user through chat to
                    facilitate the approval process.
                  </Typography>
                </Box>
              </Box>
            )}
            {eventData.status === 'Resolved' && (
              <Box
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: 'solid 1px green', // Green color to signify resolution
                  backgroundColor: '#e8f5e9',
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="primary.main"
                  >
                    Dispute Resolved
                  </Typography>
                  <Typography color="grey.500" mt={1}>
                    The dispute for this event has been resolved. Please check
                    your account for updated details and further instructions.{' '}
                    <Link href="/" style={{ fontWeight: 700 }}>
                      [Dispute resolution Center]
                    </Link>
                    .
                  </Typography>
                </Box>
              </Box>
            )}

            {eventData.status === 'Approved' && (
              <Box
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: 'solid 1px #4caf50', // Green color for a positive message
                  backgroundColor: '#e8f5e9', // Light green background for emphasis
                }}
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="1.2rem"
                    color="primary.main"
                  >
                    Funds Available for Withdrawal
                  </Typography>
                  <Typography color="grey.500" mt={1}>
                    Congratulations! Your service for this event has been
                    approved. You can now withdraw your funds. Please visit your
                    account to proceed with the withdrawal.{' '}
                    <Link href="/account/wallet" style={{ fontWeight: 700 }}>
                      [Withraw Funds]
                    </Link>
                    .
                  </Typography>
                </Box>
              </Box>
            )}
            {eventData.status === 'Requested' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  // alignItems: `center`,
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  p: 4,
                  mt: 4,
                  border: ' solid 1px #ccc',
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    mt: {
                      xs: '2rem',
                      sm: '2rem',
                    },
                  }}
                >
                  <Box
                    onClick={() => setDecliend(true)}
                    sx={{
                      border: `solid 1px ${theme.palette.primary.main}`,
                      color: 'primary.main',
                      py: 1,
                      px: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                        lg: 4,
                      },
                      fontWeight: '600',
                    }}
                  >
                    Decline
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'secondary.main',
                      py: 1,
                      px: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                        lg: 4,
                      },
                      fontWeight: '600',
                      cursor: 'pointer',
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

export async function getServerSideProps(
  context: GetServerSidePropsContext & { req: NextApiRequest },
) {
  const {
    req,
    query: { id },
  } = context;

  // Convert headers to a compatible format
  const headers: Record<string, string> = {};
  const { token } = parseCookies(req);

  Object.entries(req.headers).forEach(([key, value]) => {
    if (value) {
      headers[key] = Array.isArray(value) ? value.join('; ') : value;
    }
  });

  // Add 'Content-Type' header
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = `Bearer ${token}`;

  try {
    const profileResp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      {
        headers: headers,
      },
    );

    if (profileResp.status === 401) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const dataResp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contracts/${id}/contract`,
      {
        headers: headers,
      },
    );

    if (!dataResp.ok) {
      // Handle error
      return { props: { error: 'Failed to load data' } };
    }
    const profileData = await profileResp.json();
    const data = await dataResp.json();
    return {
      props: {
        id,
        data: data?.data,
        token,
        userData: profileData?.data,
      },
    };
  } catch (error) {
    // Handle fetch errors
    return { props: { error: 'An error occurred while fetching data' } };
  }
}

export default ContractsPage;
