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
      my={10}
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
        fontWeight={600}
        sx={{
          fontSize: {
            xs: `1.5rem`,
            sm: `1.5rem`,
            md: `1.5rem`,
            lg: `2rem`,
          },
          textAlign: `center`,
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
              slidesPerView: 1.2,
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            1024: {
              spaceBetween: 30,
              slidesPerView: 1.2,
            },
          }}
        >
          <SwiperSlide>
            <Box
              sx={{
                margin: `0 auto`,
                textAlign: `center`,
                backgroundColor: `primary.main`,
                borderRadius: `10px`,
                padding: {
                  xs: `1.5rem`,
                  sm: `1.5rem`,
                  md: `3rem`,
                  lg: `4rem 3rem`,
                },
                color: `#fff`,
                boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                borderBottom: `solid 1rem ${theme.palette.secondary.main}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: `1.2rem`,
                    sm: `1.2rem`,
                    md: `1.5rem`,
                    lg: `1.5rem`,
                  },
                }}
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
                consequuntur, id hic eum fugiat animi eligendi ducimus corporis
                sapiente sed?
              </Typography>
              <Box
                sx={{
                  textAlign: `center`,
                }}
              >
                <Box mt={3}>
                  <Image
                    src={avatarImg}
                    alt="profileImg"
                    width={80}
                    height={80}
                    style={{
                      borderRadius: `50%`,
                      boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                    }}
                  />
                  <Typography fontSize="1.1rem" fontWeight={600}>
                    Mark Kachi
                  </Typography>
                </Box>
                <Typography mt={1}>CEO of FANTACY</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default ClientReviews;
