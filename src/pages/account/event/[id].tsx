import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { parseCookies } from '@/lib/parseCookies';
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
  data: any;
}

const EventDetailsPage = ({ token, data }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail] = useState(
    typeof window !== `undefined` && localStorage.getItem(`userEmail`),
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { notifyData } = useSelector((state: RootState) => state.notifications);
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const queryParams = (arr: any) => {
    let userData: any = {};
    arr?.map((ids: any) => {
      if (ids?._id === id) {
        return (userData = ids);
      }
    });

    return userData;
  };
  const userServices = queryParams(notifyData);

  const userServiceObj =
    typeof window !== `undefined` && JSON?.parse(userServices?.package);

  const handlePayment = async () => {
    setIsSuccess(true);
    const credentials = {
      email: userEmail,
      amount: userServices?.budget,
      contractId: id,
      role: userInfo?.role,
    };
    console.log(credentials);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create`,
        credentials,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data?.data?.status === true) {
        router.push(data?.data?.data?.authorization_url);
        console.log(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Box
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
            {notifyData?.map((data: any) =>
              data?._id === id ? (
                <Box
                  key={data?._id}
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
                    {data?.state}, {data?.city}
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
                    {data?.budget && formatCurrency(data?.budget)}
                  </Typography>
                </Box>
              ) : null,
            )}
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
                  fontSize="1.3rem"
                  mb={4}
                  color="primary.main"
                  textTransform="capitalize"
                >
                  {userServiceObj?.type}
                </Typography>
              </Box>
              {userServiceObj?.service?.map((list: any) => (
                <Typography
                  key={list}
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    color: `primary.main`,
                    mt: 1,
                  }}
                >
                  <CheckIcon sx={{ color: `secondary.main`, mr: 1 }} />
                  {list}
                </Typography>
              ))}
            </Box>
            {/* {userInfo?.role === `provider` ||
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
                ) : null} */}
          </Box>
          {notifyData?.map((data: any) =>
            data?._id === id ? (
              <Box key={data?._id}>
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
                    loading={isSuccess}
                  >
                    Make Payment
                  </CustomButton>
                </Box>
              </Box>
            ) : null,
          )}
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

export async function getServerSideProps({ req, params }: any) {
  const { id } = params;
  const { token } = parseCookies(req);

  console.log(token);

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
      data: data,
    },
  };
}

export default EventDetailsPage;
