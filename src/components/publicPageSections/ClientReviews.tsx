import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import avatarImg from '@/public/avatar.png';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import theme from '@/styles/theme';

const ClientReviews = ({ queryData }: any) => {
  return (
    <Box
      mt={8}
      mb={13}
      sx={{
        paddingBottom: {
          xs: `1rem`,
          sm: `1rem`,
          md: `2rem`,
          lg: `3rem`,
          xl: `3rem`,
        },
      }}
    >
      <Typography
        fontWeight={800}
        sx={{
          fontSize: {
            xs: `1.5rem`,
            sm: `1.5rem`,
            md: `1.5rem`,
            lg: `2rem`,
          },
          textAlign: `center`,
          color: `primary.main`,
        }}
      >
        My Customer Reviews
      </Typography>
      <Box
        sx={{
          mt: `3rem`,
        }}
      >
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation]}
          navigation={true}
          slidesPerView={1}
          spaceBetween={40}
          breakpoints={{
            640: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            1024: {
              spaceBetween: 30,
              slidesPerView: 2,
            },
          }}
        >
          {queryData?.ratings.map((reviews: any) => (
            <SwiperSlide key={reviews.id}>
              <Box
                sx={{
                  margin: `0 auto`,
                  // height: `200px`,
                  textAlign: `center`,
                  backgroundColor: `#fff`,
                  borderRadius: `10px`,
                  padding: {
                    xs: `1.5rem`,
                    sm: `1.5rem`,
                    md: `2rem`,
                    lg: `2rem 1rem`,
                  },
                  color: `primary.main`,
                  // color: `#fff`,
                  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                  borderBottom: `solid 1rem ${theme.palette.primary.main}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: `1rem`,
                      sm: `1rem`,
                      md: `1.2rem`,
                      lg: `1.2rem`,
                    },
                  }}
                >
                  {reviews?.review}
                </Typography>
                <Box
                  sx={{
                    textAlign: `center`,
                  }}
                >
                  <Box mt={3}>
                    <Image
                      src={reviews?.ratedBy?.picture}
                      alt="profileImg"
                      width={60}
                      height={60}
                      style={{
                        borderRadius: `50%`,
                        boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                      }}
                    />
                    <Typography fontSize="1.1rem" mt={1}>
                      {reviews?.ratedBy?.firstName} {` `}
                      {reviews?.ratedBy?.lastName}
                    </Typography>
                  </Box>
                  {/* <Typography mt={1}>CEO of FANTACY</Typography> */}
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ClientReviews;
