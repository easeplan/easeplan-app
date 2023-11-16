import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
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
import ChatIcon from '@mui/icons-material/Chat';

type Props = {
  queryData: QueryData;
  token?: string;
  publicId: string;
};

const Hero = ({ queryData, token, publicId }: any) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handledHireMe = () => {
    if (userInfo) {
      router.push(`/user/profile/${publicId}`);
    } else {
      router.push('/login');
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastVisitedURL', `/user/profile/${publicId}`);
      }
    }
  };

  const loggedUserId = userInfo;

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: {
            xs: '120px',
            sm: '130px',
            md: '300px',
            lg: '350px',
            xl: '350px',
          },
          my: '1rem',
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
              queryData?.providerProfile?.company?.image
                ? queryData?.providerProfile?.company?.image
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
              src={queryData?.profile?.picture}
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
          margin: '5rem auto',
          width: {
            xs: '80%',
            sm: '80%',
            md: '80%',
            lg: '80%',
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
            {queryData?.profile?.firstName} {queryData?.profile?.lastName}
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
              rate={queryData?.rating}
              token={token}
              role={queryData?.role}
              profileId={queryData?.userId}
              size="medium"
            />
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
              rate={queryData?.rating}
              token={token}
              role={queryData?.role}
              profileId={queryData?.userId}
              size="medium"
            />
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
            TODO: Add a condition that toggles to Chat based on queryData;
            the chat links to the chat section
            [*] DONE
          */}
          {queryData?.providerProfile?.currentlyHiredBy?.includes(
            loggedUserId,
          ) ? (
            <Link href="/account/chats">
              <Button
                startIcon={<ChatIcon />}
                variant="contained"
                sx={{ color: 'secondary.main', px: 6 }}
              >
                Chat
              </Button>
            </Link>
          ) : queryData?.providerProfile?.currentlyRequestedBy?.includes(
              loggedUserId,
            ) ? (
            <Button variant="contained" sx={{ color: 'secondary.main', px: 6 }}>
              Awaiting vendor response
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ color: 'secondary.main', px: 6 }}
              onClick={handledHireMe}
            >
              Hire Me
            </Button>
          )}
        </Box>
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
              boxShadow: '0px 2.82797px 6.0699px rgba(0, 0, 0, 0.1)',
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
                {queryData?.providerProfile?.company?.name}
              </Typography>
            </Box>
            <Box>
              <Typography>
                {queryData?.providerProfile?.company?.description}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
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
                boxShadow: '0px 2.82797px 6.0699px rgba(0, 0, 0, 0.1)',
                border: 'solid 1px #3333',
                borderRadius: '6px',
              }}
            >
              <Box>
                <Box>
                  <Typography fontWeight={600} color="primary.main">
                    Operational States:
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {queryData?.providerProfile?.company?.operationStates.map(
                      (item: any, i: any) => (
                        <Typography key={i} ml={1} color="primary.main">
                          {item}
                        </Typography>
                      ),
                    )}
                  </Box>
                </Box>
                <Box mt={2}>
                  <Typography fontWeight={600} color="primary.main">
                    Operational Cities:
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {queryData?.providerProfile?.company?.operationCities.map(
                      (item: any, i: any) => (
                        <Typography key={i} ml={1} color="primary.main">
                          {item}
                        </Typography>
                      ),
                    )}
                  </Box>
                </Box>
              </Box>
              <Box mt={4}>
                <Typography fontWeight={600} color="primary.main">
                  <BadgeIcon sx={{ mr: 0.5, fontSize: '1.3rem' }} /> Member
                  Since:
                </Typography>
                <Typography fontWeight={500} color="primary.main">
                  {dateFormater(queryData?.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
