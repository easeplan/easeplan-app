import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Image from 'next/image';
import UserRating from '../common/UserRating';
import Link from 'next/link';
import { dateFormater } from '@/utils';
import BannerImg from '@/public/banner.png';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import RatingStar from '../common/RatingStar';
import { QueryData } from '@/lib/types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import { useRouter } from 'next/router';
import CreateContractModal from '../publicPageSections/CreateContract';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import IdentityVerificationModal from './UserProfile';
import { useAuth } from '@/hooks/authContext';

type Props = {
  queryData: QueryData;
  token?: string;
  searchResult?: boolean;
  data: any;
};

const Hero = ({ queryData, token, searchResult, data }: any) => {
  const router = useRouter();
  const { user } = useAuth();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = user?._id;
  const [openModal, setOpenModal] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [vendorData, setVendorData] = useState(
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('findVendorData')!)
      : null,
  );

  const [localQueryData, setLocalQueryData] = useState(queryData);

  const [open, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const queryClient = useQueryClient();

  const { mutate: handleUpdateContract, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.post('/profiles/create-offer', credentials, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('Contract send successfully');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  const openCreateHireMeModal = () => {
    if (userInfo) {
      setOpenModal(true);
    } else {
      router.push(`/login?redirect_url=user/profile/${queryData.publicId}`);
    }
  };

  const handledSendContract = async () => {
    const credentials = {
      budget: vendorData.budget,
      dateTime: vendorData.eventDate,
      profileId: queryData?._id,
      city: vendorData?.city,
      state: vendorData.state,
      service: vendorData.service,
    };
    try {
      handleUpdateContract(credentials);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/profiles/create-offer`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      router.push(`/user/events/${data?.data?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const loggedUserId = userInfo;

  return (
    <Box>
      <CreateContractModal
        isOpen={openModal}
        isClose={() => setOpenModal(false)}
        token={token}
        queryData={queryData}
        userData={data}
        handleModal={handleModal}
        setLocalQueryData={setLocalQueryData}
      />

      <Box
        sx={{
          width: '100%',
          height: {
            xs: '120px',
            sm: '130px',
            md: '200px',
            lg: '200px',
            xl: '250px',
          },
          mt: { xs: 8, sm: -3 },
          my: '1rem',
          // borderRadius: `10px`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'primary.main',
        }}
      >
        <Box>
          <IdentityVerificationModal
            open={open}
            handleClose={handleClose}
            queryData={data}
            token={token}
            setModal={setModal}
          />
          <Image
            src={
              localQueryData?.providerProfile?.company?.image
                ? localQueryData?.providerProfile?.company?.image
                : BannerImg
            }
            alt="bannerImage"
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              height: '100%',
              // borderRadius: `10px`,
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
              lg: '150px',
              xl: '150px',
            },
            height: {
              xs: '70px',
              sm: '70px',
              md: '100px',
              lg: '150px',
              xl: '150px',
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
              src={localQueryData?.profile?.picture}
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
        >
          <Typography
            fontWeight={600}
            sx={{
              fontSize: {
                xs: '1.2rem',
                sm: '1.2rem',
                md: '1.4rem',
                lg: '1.5rem',
              },
            }}
            textTransform="capitalize"
          >
            {localQueryData?.profile?.firstName}{' '}
            {localQueryData?.profile?.lastName}
          </Typography>
        </Box>
        {userInfo && userInfo === 'user' ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: '0.5rem',
            }}
          >
            <UserRating
              rate={localQueryData?.providerProfile.rating}
              token={token}
              role={localQueryData?.role}
              profileId={localQueryData?.userId}
              size="medium"
            />
            {/* <Typography ml={1} fontSize="0.9rem">{`(0 Events)`}</Typography> */}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: '0.5rem',
              mb: '1rem',
            }}
          >
            <RatingStar
              rate={localQueryData?.providerProfile.rating}
              token={token}
              role={localQueryData?.role}
              profileId={localQueryData?.userId}
              size="medium"
            />
            {/* <Typography ml={1} fontSize="0.9rem">{`(0 Events)`}</Typography> */}
          </Box>
        )}
        <Box
          sx={{
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
          {/*
            TODO: Add a condition that toggles to Chat based on localQueryData;
            the chat links to the chat section
            [*] DONE
          */}
          {localQueryData.providerProfile?.currentlyHiredBy?.includes(
            loggedUserId,
          ) ? (
            <Link href="/user/chat">
              <Button
                startIcon={<ChatIcon />}
                variant="contained"
                sx={{ color: 'secondary.main', px: 6 }}
              >
                Chat
              </Button>
            </Link>
          ) : localQueryData.providerProfile?.currentlyRequestedBy?.includes(
              loggedUserId,
            ) ? (
            <Button variant="contained" sx={{ color: 'secondary.main', px: 6 }}>
              Awaiting Vendor Response
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ color: 'secondary.main', px: 6 }}
              onClick={vendorData ? handledSendContract : openCreateHireMeModal}
            >
              {isLoading ? 'Loading...' : 'Hire Me'}
            </Button>
          )}
        </Box>
        <Container maxWidth="lg">
          <Box
            sx={{
              mt: '5rem',
              display: 'flex',
              justifyContent: 'space-between',
              gap: {
                xs: '0.7rem',
                sm: '0.7rem',
                md: '1rem',
                lg: '4rem',
                xl: '4rem',
              },
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
              },
            }}
          >
            {/* About Section */}
            <Box
              sx={{
                mb: {
                  xs: '1rem',
                  sm: '1rem',
                  nd: '2rem',
                  lg: '3rem',
                  xl: '3rem',
                },
                width: {
                  xs: 'auto',
                  sm: 'auto',
                  md: '70%',
                  lg: '70%',
                  xl: '70%',
                },
                background: '#fff',
                padding: 4,
                // boxShadow: `0px 2.82797px 6.0699px rgba(0, 0, 0, 0.1)`,
                border: 'solid 1px #3333',
                borderRadius: '6px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  fontWeight={600}
                  sx={{
                    fontSize: {
                      xs: '1.2rem',
                      sm: '1.2rem',
                      md: '1.4rem',
                      lg: '1.5rem',
                    },
                    color: 'primary.main',
                    mb: '1rem',
                  }}
                >
                  {localQueryData?.providerProfile?.company?.name}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  {localQueryData?.providerProfile?.company?.description}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                // display: `flex`,
                // alignItems: `center`,
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: '30%',
                  lg: '30%',
                  xl: '30%',
                },
              }}
            >
              <Box
                sx={{
                  background: '#fff',
                  padding: 4,
                  // boxShadow: `0px 2.82797px 6.0699px rgba(0, 0, 0, 0.1)`,
                  border: 'solid 1px #3333',
                  borderRadius: '6px',
                }}
              >
                <Box>
                  <Typography fontWeight={600} color="primary.main">
                    <LocationOnIcon sx={{ mr: 0.5, fontSize: '1.3rem' }} />
                    Location:
                  </Typography>
                  <Typography fontWeight={500} color="primary.main">
                    {localQueryData?.providerProfile?.state}{' '}
                    {localQueryData?.providerProfile?.city}
                  </Typography>
                </Box>
                <Box mt={4}>
                  <Typography fontWeight={600} color="primary.main">
                    <BadgeIcon sx={{ mr: 0.5, fontSize: '1.3rem' }} /> Member
                    Since:
                  </Typography>
                  <Typography fontWeight={500} color="primary.main">
                    {dateFormater(localQueryData?.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
