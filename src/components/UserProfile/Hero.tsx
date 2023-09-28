import { useState, useEffect } from 'react';
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
import CreateContractModal from '../publicPageSections/CreateContract';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';

type Props = {
  queryData: QueryData;
  token?: string;
  searchResult?: boolean;
};

const Hero = ({ queryData, token, searchResult }: Props) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [vendorData, setVendorData] = useState(
    typeof window !== `undefined`
      ? JSON.parse(localStorage.getItem(`findVendorData`)!)
      : null,
  );

  // useEffect(() => {
  //   if (typeof window !== `undefined`) {
  //     localStorage.getItem(`findVendorData`)
  //       ? setVendorData(JSON.parse(localStorage.getItem(`findVendorData`)!))
  //       : null;
  //   }
  // }, []);

  console.log(vendorData);

  const handledHireMe = () => {
    if (userInfo) {
      setOpenModal(true);
    }
  };
  const handledSendContract = async () => {
    setIsLoading(true);
    const credentials = {
      budget: vendorData.budget,
      eventDate: vendorData.eventDate,
      profileId: queryData?.userId,
      role: queryData?.role,
      city: queryData?.city,
      state: queryData.state,
    };
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/provider-profiles/create-offer`,
        credentials,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push(`/account/event/${data?.data?._id}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const loggedUserId = userInfo?._id;

  return (
    <Box>
      <CreateContractModal
        isOpen={openModal}
        isClose={() => setOpenModal(false)}
        token={token}
        queryData={queryData}
      />
      <Box
        sx={{
          width: `100%`,
          height: {
            xs: `120px`,
            sm: `130px`,
            md: `200px`,
            lg: `200px`,
            xl: `250px`,
          },
          my: `1rem`,
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
              queryData?.company?.image ? queryData?.company?.image : BannerImg
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
              lg: `150px`,
              xl: `150px`,
            },
            height: {
              xs: `70px`,
              sm: `70px`,
              md: `100px`,
              lg: `150px`,
              xl: `150px`,
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
                xs: `1.2rem`,
                sm: `1.2rem`,
                md: `1.4rem`,
                lg: `1.5rem`,
              },
            }}
            textTransform="capitalize"
          >
            {queryData?.firstName} {` `} {queryData?.lastName}
          </Typography>
        </Box>
        {userInfo && userInfo.role === `user` ? (
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              my: `0.5rem`,
            }}
          >
            <UserRating
              rate={queryData?.rating}
              token={token}
              role={queryData?.role}
              profileId={queryData?.userId}
              size="medium"
            />
            {/* <Typography ml={1} fontSize="0.9rem">{`(0 Events)`}</Typography> */}
          </Box>
        ) : (
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              mt: `0.5rem`,
              mb: `1rem`,
            }}
          >
            <RatingStar
              rate={queryData?.rating}
              token={token}
              role={queryData?.role}
              profileId={queryData?.userId}
              size="medium"
            />
            {/* <Typography ml={1} fontSize="0.9rem">{`(0 Events)`}</Typography> */}
          </Box>
        )}
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
          {/*
            TODO: Add a condition that toggles to Chat based on queryData;
            the chat links to the chat section
            [*] DONE
          */}
          {queryData.currentlyHiredBy?.includes(loggedUserId) ? (
            <Link href="/account/chats">
              <Button
                startIcon={<ChatIcon />}
                variant="contained"
                sx={{ color: `secondary.main`, px: 6 }}
              >
                Chat
              </Button>
            </Link>
          ) : queryData.currentlyRequestedBy?.includes(loggedUserId) ? (
            <Button variant="contained" sx={{ color: `secondary.main`, px: 6 }}>
              Pending Request
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ color: `secondary.main`, px: 6 }}
              onClick={searchResult ? handledSendContract : handledHireMe}
            >
              Hire Me
            </Button>
          )}
        </Box>
        <Box
          sx={{
            mt: `5rem`,
            display: `flex`,
            justifyContent: `space-between`,
            gap: {
              xs: `0.7rem`,
              sm: `0.7rem`,
              md: `1rem`,
              lg: `4rem`,
              xl: `4rem`,
            },
            flexDirection: {
              xs: `column`,
              sm: `column`,
              md: `row`,
              lg: `row`,
              xl: `row`,
            },
          }}
        >
          {/* About Section */}
          <Box
            sx={{
              mb: {
                xs: `1rem`,
                sm: `1rem`,
                nd: `2rem`,
                lg: `3rem`,
                xl: `3rem`,
              },
              width: {
                xs: `auto`,
                sm: `auto`,
                md: `70%`,
                lg: `70%`,
                xl: `70%`,
              },
              background: `#fff`,
              padding: 4,
              boxShadow: `0px 2.82797px 6.0699px rgba(0, 0, 0, 0.1)`,
              border: `solid 1px #3333`,
              borderRadius: `6px`,
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
                fontWeight={600}
                sx={{
                  fontSize: {
                    xs: `1.2rem`,
                    sm: `1.2rem`,
                    md: `1.4rem`,
                    lg: `1.5rem`,
                  },
                  color: `primary.main`,
                  mb: `1rem`,
                }}
              >
                About {queryData?.company?.name}
              </Typography>
            </Box>
            <Box>
              <Typography>{queryData?.company?.description}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              // display: `flex`,
              // alignItems: `center`,
              width: {
                xs: `100%`,
                sm: `100%`,
                md: `30%`,
                lg: `30%`,
                xl: `30%`,
              },
            }}
          >
            <Box
              sx={{
                background: `#fff`,
                padding: 4,
                boxShadow: `0px 2.82797px 6.0699px rgba(0, 0, 0, 0.1)`,
                border: `solid 1px #3333`,
                borderRadius: `6px`,
              }}
            >
              <Box>
                <Typography fontWeight={600} color="primary.main">
                  <LocationOnIcon sx={{ mr: 0.5, fontSize: `1.3rem` }} />
                  Location:
                </Typography>
                <Typography fontWeight={500} color="primary.main">
                  {queryData?.state} {queryData?.city}
                </Typography>
              </Box>
              <Box mt={4}>
                <Typography fontWeight={600} color="primary.main">
                  <BadgeIcon sx={{ mr: 0.5, fontSize: `1.3rem` }} /> Member
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
