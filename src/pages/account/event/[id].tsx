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
import AcceptOfferConfirmModal from '@/components/AcceptOfferConfirmModal';
import CustomButton from '@/components/common/CustomButton';
import customFetch from '@/utils/customFetch';

interface Props {
  token: string;
}

const EventDetailsPage = ({ token }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { notifyData } = useSelector((state: RootState) => state.notifications);
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  function convertToObject(str: any) {
    try {
      const parsedPackage = JSON.parse(str);
      return parsedPackage;
    } catch (error) {
      console.error(`Invalid package format:`, error);
      return null;
    }
  }

  const queryParams = (arr: any) => {
    let userData: any = {};
    arr?.map((ids: any) => {
      if (ids?._id === id) {
        return (userData = ids);
      }
    });

    return userData;
  };
  const queryID = queryParams(notifyData);

  console.log(queryID?.package);

  const newPack = convertToObject(
    `{"service":["dkddk","djjdjd"],"type":"basic"}`,
  );

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

  const { queryData, error, isLoading } = useFetch(
    `/${
      userInfo?.role === `provider`
        ? `provider-profiles`
        : userInfo?.role === `planner`
        ? `planner-profiles`
        : userInfo?.role === `user`
        ? `users`
        : `users`
    }/${userInfo?._id}`,
    token,
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>Error:</p>;
  }

  const handlePayment = async () => {
    const data = {
      email: `email@mail`,
      amount: queryID?.budget,
      contractId: id,
      role: userInfo?.role,
    };
    console.log(data);
    try {
    } catch (error) {}
  };

  // console.log(`Contract:`, notifyData);
  // console.log(`UserInfo:`, queryData);

  return (
    <DashboardLayout token={token}>
      <section>
        <AcceptOfferConfirmModal
          isOpen={confirm}
          isClose={() => setConfirm(false)}
        >
          <Box sx={{ p: 4, textAlign: `center` }}>
            <Typography mb={4} variant="h5">
              Yes I want to accept this Job offer
            </Typography>
            <CustomButton bgPrimary>Accept Offer</CustomButton>
          </Box>
        </AcceptOfferConfirmModal>
        {notifyData?.map((data: any) =>
          data?._id === id ? (
            <Box
              key={data?._id}
              sx={{
                display: `grid`,
                gridTemplateColumns: {
                  xs: `1fr`,
                  sm: `1fr`,
                  md: `1fr 1fr`,
                  lg: `1fr 1fr`,
                  xl: `1fr 1fr`,
                },
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
                {userInfo?.role === `provider` ||
                userInfo?.role === `planner` ? (
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
                        If you are please accept the event or decline if you are
                        not available
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
                  <Typography
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
                    Package payment
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
                <Box
                  sx={{
                    p: 4,
                    mt: 4,
                    backgroundColor: `secondary.light`,
                  }}
                >
                  <CustomButton
                    onClick={handlePayment}
                    bgPrimary
                    lgWidth="100%"
                  >
                    Make Payment
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          ) : null,
        )}
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

export default EventDetailsPage;
