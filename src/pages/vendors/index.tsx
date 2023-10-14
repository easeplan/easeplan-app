import CardList from '@/components/vendors/CardList';
import Layout from '@/components/vendors/Layout';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const services = [
  {
    id: 1,
    title: `Catering`,
  },
  {
    id: 2,
    title: `Photographers`,
  },
  {
    id: 3,
    title: `MC`,
  },
  {
    id: 4,
    title: `DJ's`,
  },
  {
    id: 5,
    title: `Make-up Artists`,
  },
  {
    id: 6,
    title: `Venue Manager`,
  },
  {
    id: 7,
    title: `MC`,
  },
  {
    id: 8,
    title: `DJ's`,
  },
  {
    id: 9,
    title: `Make-up Artists`,
  },
  {
    id: 10,
    title: `Venue Manager`,
  },
  {
    id: 11,
    title: `Make-up Artists`,
  },
  {
    id: 12,
    title: `Venue Manager`,
  },
  {
    id: 13,
    title: `Make-up Artists`,
  },
  {
    id: 14,
    title: `Venue Manager`,
  },
];

const VendorPage = () => {
  return (
    <Layout>
      <Box sx={{ mt: 4 }}>
        {/* <Box>
          <Swiper
            slidesPerView={3}
            spaceBetween={4}
            breakpoints={{
              640: {
                spaceBetween: 30,
                slidesPerView: 8.8,
              },
              768: {
                spaceBetween: 2,
                slidesPerView: 8.6,
              },
              1024: {
                spaceBetween: 2,
                slidesPerView: 10,
              },
            }}
            className="mySwiper"
          >
            {services.map((service) => (
              <SwiperSlide key={service?.id}>
                <Box>{service.title}</Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box> */}
        <Box sx={{ display: `flex`, gap: `2rem`, overflow: `hidden` }}>
          {services.map((service) => (
            <Box key={service?.id}>
              <Button
                variant="text"
                sx={{
                  textWrap: `nowrap`,
                  fontWeight: `900`,
                  cursor: `pointer`,
                  color: `primary.main`,
                }}
              >
                {service.title}
              </Button>
            </Box>
          ))}
        </Box>
        <CardList />
      </Box>
    </Layout>
  );
};

export default VendorPage;
