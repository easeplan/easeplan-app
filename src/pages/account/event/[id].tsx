import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { parseCookies } from '@/lib/parseCookies';
import axios from 'axios';
import { formatCurrency } from '@/utils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';
import theme from '@/styles/theme';
import AcceptOfferConfirmModal from '@/components/AcceptOfferConfirmModal';
import CustomButton from '@/components/common/CustomButton';
import Image from 'next/image';
import UserRating from '@/components/common/UserRating';
import ReviewFormFull from '@/components/ReviewFormFull';
import { dateFormater } from '@/utils';
import { Data, QueryData } from '@/lib/types';
import EventAlert from '@/components/EventAlert';

interface Props {
  token: string;
  data: Data;
  queryData: QueryData;
}

const EventDetailsPage = ({ token, data, queryData }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail] = useState(
    typeof window !== `undefined` && localStorage.getItem(`userEmail`),
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  console.log(`data =>`, data);
  console.log(`queryData =>`, queryData);

  useEffect(() => {
    localStorage.setItem(`eventID`, `${id}`);
    localStorage.setItem(`contract`, `${data}`);
  }, []);

  const userServiceObj =
    typeof window !== `undefined` && JSON?.parse(data?.package);

  const handlePayment = async () => {
    setIsSuccess(true);
    const credentials = {
      email: userEmail,
      amount: data?.budget,
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: If there is a dispute, display the dispute red card/ ab green for the completed
  // [*] DONE
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
            {queryData?.events[id as string] &&
              queryData?.events[id as string].status !== `Accepted` && (
                <EventAlert event={queryData?.events[id as string]} />
              )}
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
          </Box>
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
                disabled={data?.status === `paid` ? true : false}
                lgWidth="100%"
                loading={isSuccess}
              >
                {data?.status === `paid` ? `PAID` : `Make Payment`}
              </CustomButton>
            </Box>
            {queryData && (
              <Box>
                <Box
                  sx={{
                    width: `100%`,
                    height: {
                      xs: `120px`,
                      sm: `130px`,
                      md: `130px`,
                      lg: `150px`,
                      xl: `150px`,
                    },
                    mt: `4rem`,
                    mb: `1rem`,
                    borderRadius: `10px`,
                    position: `relative`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                    backgroundColor: `primary.main`,
                  }}
                >
                  <Box>
                    <Image
                      src={
                        queryData?.company?.image && queryData?.company?.image
                      }
                      alt="bannerImage"
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        height: `100%`,
                        borderRadius: `10px`,
                        objectFit: `cover`,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: {
                        xs: `70px`,
                        sm: `70px`,
                        md: `100px`,
                        lg: `120px`,
                        xl: `120px`,
                      },
                      height: {
                        xs: `70px`,
                        sm: `70px`,
                        md: `100px`,
                        lg: `120px`,
                        xl: `120px`,
                      },
                      position: `absolute`,
                      borderRadius: `50%`,
                      bottom: {
                        xs: `-2rem`,
                        sm: `-2rem`,
                        md: `-4rem`,
                        lg: `-4rem`,
                      },
                      boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                      backgroundColor: `#fff`,
                      border: `solid 4px #fff`,
                    }}
                  >
                    <Box>
                      <Image
                        src={queryData?.picture}
                        alt="bannerImage"
                        fill
                        style={{
                          width: `100%`,
                          borderRadius: `50%`,
                          objectFit: `cover`,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: {
                      xs: `3rem`,
                      sm: `3rem`,
                      md: `5rem`,
                      lg: `5rem`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      position: `relative`,
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      sx={{
                        fontSize: {
                          xs: `1rem`,
                          sm: `1rem`,
                          md: `1rem`,
                          lg: `1.2rem`,
                        },
                      }}
                      textTransform="capitalize"
                    >
                      {queryData?.firstName} {` `} {queryData?.lastName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      mb: `0.8rem`,
                    }}
                  >
                    <UserRating
                      rate={queryData?.rating}
                      token={token}
                      role={queryData?.role}
                      profileId={queryData?.userId}
                      size="small"
                    />
                    {/* <Typography ml={1} fontSize="0.9rem">
                      {queryData?.events.length} Events
                    </Typography> */}
                  </Box>
                  <Box
                    sx={{
                      textAlign: `center`,
                      margin: `0 auto`,

                      '.btn': {
                        border: `none`,
                        cursor: `pointer`,
                        borderRadius: `8px`,
                        boxShadow: `0px 4.82797px 6.0699px rgba(0, 0, 0, 0.1)`,
                        margin: `1rem`,
                        padding: `1rem 1.5rem`,
                      },
                      '.preview-btn': {
                        color: `secondary.main`,
                        fontWeight: `bold`,
                        backgroundColor: `primary.main`,
                        border: `solid 1px #1111`,
                      },
                    }}
                  >
                    <Link href={`/account/preview/${data?._id}`}>
                      {/* 
                        TODO: Add a cancel button once the person has been requested 
                        DONE: almost complete. Ask what this button does
                      */}
                      <Button variant="outlined" size="small">
                        View Details
                      </Button>
                    </Link>
                    <Button sx={{ marginLeft: 2 }} variant="text">Cancel</Button>
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
              </Box>
            )}
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
            {/* TODO: Design The Resolution Center */}
            <Link href="/dashboard/support">Resolution center</Link>
          </Box>
        </Box>

        <ReviewFormFull
          rating={queryData?.rating}
          token={token}
          profileId={queryData?.userId}
          role={queryData?.role}
        />
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

  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${
      data?.data?.role && data?.data?.role === `planner`
        ? `planner-profiles`
        : `provider-profiles`
    }/${data?.data?.parties.receiverId}`,
    {
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const plannerData = await resData.json();

  return {
    props: {
      token: token,
      data: data?.data,
      queryData: plannerData?.data || null,
    },
  };
}

export default EventDetailsPage;
