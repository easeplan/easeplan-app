import React from 'react';
import { GetServerSidePropsContext } from 'next';
import type { NextApiRequest } from 'next';
import { parseCookies } from '@/lib/parseCookies';
import Link from 'next/link';
import theme from '@/styles/theme';
import AcceptOfferConfirmModal from '@/components/AcceptOfferConfirmModal';
import CustomButton from '@/components/common/CustomButton';
import Image from 'next/image';
import UserRating from '@/components/common/UserRating';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { formatCurrency } from '@/utils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Data, QueryData } from '@/lib/types';
import Layout from '@/components/vendors/Layout';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorPage from '@/components/ErrorPage';
import CloseIcon from '@mui/icons-material/Close';
import ReviewForm from '@/components/ReviewForm';
import ReviewFormFull from '@/components/ReviewFormFull';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import successBanner from '@/public/successBanner.png';
import { useAuth } from '@/hooks/authContext';

const ViewEvent = ({ id, data, token }: any) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [eventData, setEventData] = useState(data);

  const [userEmail] = useState(
    typeof window !== 'undefined' && localStorage.getItem('userEmail'),
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [confirm, setConfirm] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmDispute, setConfirmDispute] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // State to manage the opening and closing of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle the submission of the new offer
  // This should be implemented based on your application logic
  const handleSubmitNewOffer = () => {
    // Placeholder for submitting the new offer logic
    console.log('Submitting new offer...');
    // Close the modal after submitting the offer
    handleCloseModal();
  };

  const handleOfferAmountChange = (event: any) => {
    setOfferAmount(event.target.value);
  };
  //   console.log(id);

  useEffect(() => {
    localStorage.setItem('eventID', `${id}`);
    localStorage.setItem('contract', `${data}`);
  }, []);

  // const userServiceObj =
  //   typeof window !== `undefined` && JSON?.parse(data?.package);

  const handlePayment = async () => {
    setIsSuccess(true);
    const credentials = {
      email: userEmail,
      amount: data?.budget,
      contractId: id,
    };
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      if (data?.data?.status === true) {
        router.push(data?.data?.data?.authorization_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancleRequest = async () => {
    try {
      setIsLoadingData(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/profiles/${eventData._id}/cancel-offer`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data?.status === 'success') {
        setEventData(data?.data);
        setIsLoadingData(false);
        setConfirmCancel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [disputeValue, setDisputeValue] = useState('');
  const [disputeTypeValue, setDisputeTypeValue] = useState('');

  const handleDisputeChange = (event: any) => {
    setDisputeValue(event.target.value);
  };

  const handleDisputeTypeChange = (event: any) => {
    setDisputeTypeValue(event.target.value);
  };
  const disputes = [
    'Service not provided',
    'Service not as described',
    'Overcharging',
    'Late service delivery',
    'Cancellation without notice',
    'Property damage',
    'No show',
    'Unprofessional behavior',
    'Other',
  ];
  const disputeEvent = async () => {
    try {
      setIsLoadingData(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/disputes`,
        {
          description: disputeValue,
          disputeType: disputeTypeValue,
          providerId: eventData?.parties?.receiver?._id,
          contract: eventData?._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data?.status === 'success') {
        setEventData(data?.data);
        setIsLoadingData(false);
        setConfirmCancel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async (credentials: any) => {
    console.log(credentials);
    try {
      setIsLoadingData(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ratings`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data?.status === 'success') {
        setEventData(data?.data);
        setIsLoadingData(false);
        setConfirmCancel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprovePayment = async () => {
    try {
      setIsLoadingData(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/profiles/${eventData._id}/approved-payment
        `,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data?.status === 'success') {
        setEventData(data?.data);
        setIsLoadingData(false);
        setConfirmCancel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { queryData, error, isLoading } = useFetch(
    `/profiles/${user?.provider._id}`,
    token,
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Layout data={queryData?.provider}>
      <Container maxWidth="lg">
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
            pb: 5,
          }}
        >
          <Box
            sx={{
              mt: {
                xs: 4,
                sm: 4,
                md: 4,
                lg: 4,
                xl: 5,
              },
            }}
          >
            <Box
              key={eventData?._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 4,
                backgroundColor: 'secondary.light',
              }}
            >
              <Typography
                fontWeight="600"
                fontSize="1rem"
                color="primary.main"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.8rem',
                    md: '1rem',
                    lg: '1rem',
                    lx: '1rem',
                  },
                  mt: {
                    sm: '1rem',
                  },
                }}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: {
                      xs: '0.9rem',
                      sm: '0.9rem',
                      md: '1rem',
                      lg: '1rem',
                      lx: '1rem',
                    },
                  }}
                />
                {eventData?.state}, {eventData?.city}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 4,
                mt: 4,
                border: `solid 1px ${theme.palette.secondary.main}`,
              }}
            >
              <Typography
                fontSize="1rem"
                color="primary.main"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.8rem',
                    md: '1rem',
                    lg: '1rem',
                    lx: '1rem',
                  },
                }}
              >
                Package payment
              </Typography>
              <Typography
                fontWeight="600"
                sx={{
                  fontSize: {
                    xs: '1rem',
                    sm: '1rem',
                    md: '1.3rem',
                    lg: '1.5rem',
                    lx: '1.5rem',
                  },
                }}
                color="primary.main"
              >
                ₦ {eventData.budget && formatCurrency(eventData?.budget)}
              </Typography>
            </Box>
            {eventData.status === 'Requested' && (
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: 'secondary.light',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontWeight: '700', color: 'primary.main' }}>
                  We&apos;ve contacted the vendor, they will respond shortly.
                </Typography>
              </Box>
            )}

            {eventData.status === 'Accepted' && (
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: 'secondary.light',
                  textAlign: 'center',
                }}
              >
                <CustomButton
                  onClick={handlePayment}
                  bgPrimary
                  disabled={eventData.status.toLowerCase() === 'paid'}
                  lgWidth="100%"
                  loading={isSuccess}
                >
                  {eventData.status.toLowerCase() === 'paid'
                    ? 'PAID'
                    : 'Make Payment'}
                </CustomButton>
              </Box>
            )}
            {eventData.status === 'paid' && (
              <Box>
                <section>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '2rem',
                    }}
                  >
                    <Box sx={{ width: '100%', margin: '0 auto' }}>
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
                          sx={{
                            width: '100%',
                            height: '100px',
                            position: 'relative',
                          }}
                        >
                          <Image
                            src={successBanner}
                            alt="Success Banner"
                            fill
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </section>
                {/* <Typography sx={{ fontWeight: `500`, color: `primary.main` }}>
                  Payment was successful. Proceed to chat with vendor{` `}
                  <Link href="/user/chat" style={{ fontWeight: 700 }}>
                    [Chat]
                  </Link>
                </Typography> */}
              </Box>
            )}

            {eventData.status === 'Disputed' && (
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: '#fff8e1',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontWeight: '500', color: 'primary.main' }}>
                  A ticket has been created for your dispute. Please follow up
                  on the resolution{' '}
                  <Link href="/user/dispute" style={{ fontWeight: 700 }}>
                    {' '}
                    [Dispute Center].
                  </Link>
                </Typography>
              </Box>
            )}
            {eventData.status === 'Resolved' && (
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: 'secondary.light',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontWeight: '500', color: 'primary.main' }}>
                  The dispute has been resolved. Thank you for your patience.
                  Please check the resolution details{' '}
                  <Link
                    href="/user/dispute-resolution"
                    style={{ fontWeight: 700 }}
                  >
                    [Resolution Center]
                  </Link>
                  . If you have any further questions or require assistance,
                  feel free to
                  <Link
                    href="/user/contact-support"
                    style={{ fontWeight: 700 }}
                  >
                    [Contact Support]
                  </Link>
                  .
                </Typography>
              </Box>
            )}
            {eventData.status === 'Completed' && (
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: '#fff3e0',
                }}
              >
                <Typography fontWeight="600" fontSize="1.2rem" color="#d32f2f">
                  Urgent: Confirm Payment Approval
                </Typography>
                <Typography sx={{ color: '#555' }} mt={1}>
                  The service for your event has been marked as complete. Please
                  proceed to approve the payment or issue a dispute if you
                  encountered any problems with the service. You have 24 hours
                  to respond before the system automatically processes the
                  payment to the vendor. Timely action is appreciated to ensure
                  a smooth transaction for both parties.
                </Typography>
              </Box>
            )}

            {(eventData.status === 'Approved' ||
              eventData.status === 'Rated') && (
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: 'secondary.light',
                }}
              >
                <Typography sx={{ fontWeight: '500', color: 'primary.main' }}>
                  Your event has been successfully completed! We hope it was a
                  great experience. We would love to hear your feedback below
                  and don&apos;t forget to rate vendor.
                </Typography>
              </Box>
            )}
            {eventData.status === 'Cancelled' && (
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: '#ffebee',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontWeight: '500', color: 'primary.main' }}>
                  Your event request has been successfully canceled. If you have
                  any concerns or need assistance, please contact us. We&apos;re
                  here to help!
                </Typography>
              </Box>
            )}

            {eventData.status === 'Declined' && (
              <Box
                sx={{
                  p: 4,
                  mt: 4,
                  backgroundColor: '#ffebee',
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{ fontWeight: '500', color: 'primary.main', mb: 2 }}
                >
                  Unfortunately, the vendor has declined your offer. You can
                  choose to make a new offer or browse other vendors.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() => setConfirm(true)}
                >
                  Make New Offer
                </Button>
                <Button variant="outlined" color="primary">
                  Find Vendors
                </Button>
                <AcceptOfferConfirmModal
                  isOpen={confirm}
                  isClose={() => setConfirm(false)}
                  text="Make New Offer"
                >
                  <Box
                    sx={{ p: 4, textAlign: 'center' }}
                    style={{ minHeight: '100%' }}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="offer-amount"
                      label="Offer Amount"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={offerAmount}
                      onChange={handleOfferAmountChange}
                      sx={{ mb: 3 }}
                    />

                    <CustomButton
                      //loading={isLoading}
                      onClick={handleSubmitNewOffer}
                      bgPrimary
                    >
                      Submit Offer
                    </CustomButton>
                  </Box>
                </AcceptOfferConfirmModal>
              </Box>
            )}
          </Box>

          <Box>
            {queryData && (
              <Box>
                <Box
                  sx={{
                    width: '100%',
                    height: {
                      xs: '120px',
                      sm: '130px',
                      md: '130px',
                      lg: '150px',
                      xl: '150px',
                    },
                    mt: {
                      xs: 4,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 5,
                    },
                    mb: '1rem',
                    borderRadius: '10px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'primary.main',
                  }}
                >
                  <Box>
                    <Image
                      src={
                        eventData?.parties?.receiver?.providerProfile.company
                          ?.image &&
                        eventData?.parties?.receiver?.providerProfile.company
                          ?.image
                      }
                      alt="bannerImage"
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        height: '100%',
                        borderRadius: '10px',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: {
                        xs: '70px',
                        sm: '70px',
                        md: '100px',
                        lg: '120px',
                        xl: '120px',
                      },
                      height: {
                        xs: '70px',
                        sm: '70px',
                        md: '100px',
                        lg: '120px',
                        xl: '120px',
                      },
                      position: 'absolute',
                      borderRadius: '50%',
                      bottom: {
                        xs: '-2rem',
                        sm: '-2rem',
                        md: '-4rem',
                        lg: '-4rem',
                      },
                      boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#fff',
                      border: 'solid 4px #fff',
                    }}
                  >
                    <Box>
                      <Image
                        src={eventData?.parties?.receiver?.profile?.picture}
                        alt="bannerImage"
                        fill
                        style={{
                          width: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: {
                      xs: '3rem',
                      sm: '3rem',
                      md: '5rem',
                      lg: '5rem',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  ></Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      textAlign: 'center',
                      margin: '0 auto',

                      '.btn': {
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        boxShadow: '0px 4.82797px 6.0699px rgba(0, 0, 0, 0.1)',
                        margin: '1rem',
                        padding: '1rem 1.5rem',
                      },
                      '.preview-btn': {
                        color: 'secondary.main',
                        fontWeight: 'bold',
                        backgroundColor: 'primary.main',
                        border: 'solid 1px #1111',
                      },
                    }}
                  >
                    {eventData.status === 'Completed' && (
                      <CustomButton
                        loading={isLoadingData}
                        onClick={handleApprovePayment}
                        sx={{ mr: '1rem' }}
                        variant="outlined"
                        style={{ color: '#174E64' }}
                      >
                        Approve Payment
                      </CustomButton>
                    )}
                    {(eventData.status === 'Requested' ||
                      eventData.status === 'Accepted') && (
                      <>
                        <Button
                          variant="outlined"
                          sx={{
                            textTransform: 'capitalize',
                            mr: 2,
                            border: '1px solid red',
                            color: 'red',
                          }}
                          onClick={() => setConfirmCancel(true)}
                        >
                          Cancel Request
                        </Button>
                        <AcceptOfferConfirmModal
                          isOpen={confirmCancel}
                          isClose={() => setConfirmCancel(false)}
                          text="Confirm Request Cancellation"
                        >
                          <Box
                            sx={{ p: 4, textAlign: 'center' }}
                            style={{ minHeight: '100%' }}
                          >
                            <Typography mb={4} variant="h5">
                              Are you sure you want to cancel request, Vendor
                              might accept in few more minutes.
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <CustomButton
                                //loading={isLoading}
                                onClick={() => setConfirmCancel(false)}
                                bgPrimary
                              >
                                No
                              </CustomButton>
                              <CustomButton
                                loading={isLoadingData}
                                onClick={handleCancleRequest}
                                bgPrimary
                              >
                                Yes
                              </CustomButton>
                            </Box>
                          </Box>
                        </AcceptOfferConfirmModal>
                      </>
                    )}
                    {(eventData.status === 'paid' ||
                      eventData.status === 'Completed') && (
                      <>
                        <Button
                          sx={{
                            textTransform: 'capitalize',
                            border: 'solid 1px orange',
                            color: 'orange',
                            backgroundColor: 'white',
                          }}
                          onClick={() => setConfirmDispute(true)}
                        >
                          Dispute Service
                        </Button>
                        <AcceptOfferConfirmModal
                          isOpen={confirmDispute}
                          isClose={() => setConfirmDispute(false)}
                          text="Dispute Resolution Form"
                        >
                          <Box
                            sx={{ p: 4, textAlign: 'center' }}
                            style={{ minHeight: '100%' }}
                          >
                            <FormControl fullWidth>
                              <InputLabel id="dispute-select-label">
                                Dispute Reason
                              </InputLabel>
                              <Select
                                labelId="dispute-select-label"
                                id="dispute-select"
                                value={disputeTypeValue}
                                label="Dispute Reason"
                                onChange={handleDisputeTypeChange}
                              >
                                {disputes.map((reason, index) => (
                                  <MenuItem key={index} value={reason}>
                                    {reason}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <TextField
                              id="outlined-basic"
                              label="We love to hear from you"
                              variant="outlined"
                              multiline
                              minRows={10}
                              sx={{
                                width: '100%',
                                mb: '2rem',
                                mt: '1rem',
                              }}
                              value={disputeValue}
                              onChange={handleDisputeChange}
                            />
                            <CustomButton
                              loading={isLoadingData}
                              onClick={disputeEvent}
                              bgPrimary
                            >
                              Submit Dispute
                            </CustomButton>
                          </Box>
                        </AcceptOfferConfirmModal>
                      </>
                    )}
                  </Box>

                  {/* <Box
                    sx={{
                      mt: `2rem`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <Box
                      sx={{
                        display: `flex`,
                        alignItems: `center`,
                      }}
                    >
                      <Box>
                        <Typography fontWeight={600}>Location:</Typography>
                        <Typography>
                          {queryData?.state} {queryData?.city}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography fontWeight={600}>Member Since:</Typography>
                      <Typography>
                        {dateFormater(queryData?.createdAt)}
                      </Typography>
                    </Box>
                  </Box> */}
                </Box>
                {/* Review Form */}
                {/* <ReviewForm
                  token={token}
                  role={queryData?.role}
                  rating={queryData?.rating}
                  profileId={queryData?.userId}
                /> */}
                {(eventData.status === 'Approved' ||
                  eventData.status === 'Resolved') && (
                  <ReviewFormFull
                    isLoadingData={isLoadingData}
                    submitReview={submitReview}
                    token={token}
                    userId={eventData?.parties?.receiver?._id}
                    contractId={eventData?._id}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

// export async function getServerSideProps(context: { req: { headers: any } }) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
//     headers: context.req.headers, // Forward the headers
//   });

//   if (res.status === 401) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   // Fetch data based on the dynamicParam
//   const resp = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/contracts/${id}/contract`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   const data = await resp.json();

//   return {
//     props: {
//       id,
//       data: data?.data,
//       token,
//     },
//   };
// }
export async function getServerSideProps(
  context: GetServerSidePropsContext & { req: NextApiRequest },
) {
  const {
    req,
    query: { id },
  } = context;

  // Convert headers to a compatible format
  const headers: Record<string, string> = {};

  Object.entries(req.headers).forEach(([key, value]) => {
    if (value) {
      headers[key] = Array.isArray(value) ? value.join('; ') : value;
    }
  });

  // Add 'Content-Type' header
  headers['Content-Type'] = 'application/json';

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

    const data = await dataResp.json();
    return {
      props: {
        id,
        data: data?.data,
      },
    };
  } catch (error) {
    // Handle fetch errors
    return { props: { error: 'An error occurred while fetching data' } };
  }
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '85%',
    sm: '45%',
    md: '40%',
    lg: '30%',
    xl: '30%',
  },
  height: 'auto',
  bgcolor: '#fff',
  border: 'none',
  boxShadow: 24,
  borderRadius: '1rem',
};

export default ViewEvent;
