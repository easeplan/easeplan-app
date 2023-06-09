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

interface Props {
  token: string;
  data: any;
}

const ContractsPage = ({ token, data }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [confirm, setConfirm] = useState(false);
  const [declined, setDecliend] = useState(false);

  const userServiceObj =
    typeof window !== `undefined` && JSON?.parse(data?.package);

  const handleAcceptOffer = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${
          userInfo?.role === `provider`
            ? `provider-profiles/${data?._id}/accept-offer`
            : userInfo?.role === `planner`
            ? `planner-profiles/${data?._id}/accept-offer`
            : null
        }`,
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
      console.log(resData);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    }
  };

  console.log(data);

  const handleDecliendOffer = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${
          userInfo?.role === `provider`
            ? `provider-profiles/${data?._id}/decline-offer`
            : userInfo?.role === `planner`
            ? `planner-profiles/${data?._id}/decline-offer`
            : null
        }`,
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
      console.log(resData);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
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
                Decliend 😥😥😥
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
              {data.status === `Accepted` ? (
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
              ) : (
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
              )}
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
          {userInfo?.role === `provider` || userInfo?.role === `planner` ? (
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
          ) : null}
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
              mt: 4,
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
      data: data?.data,
    },
  };
}

export default ContractsPage;
