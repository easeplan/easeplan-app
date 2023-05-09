import React from 'react';
import { Box, Typography } from '@mui/material';
import BannerImg from '@/public/blog/banner-illus.svg';
import Image from 'next/image';

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundColor: `secondary.light`,
        paddingBottom: `2rem`,
      }}
    >
      <Box
        sx={{
          height: `100%`,
          width: `80%`,
          margin: `0 auto`,
          paddingTop: {
            xs: `6rem`,
            sm: `6rem`,
            md: `6rem`,
            lg: `8rem`,
            xl: `8rem`,
          },
          display: `grid`,
          alignItems: `center`,
          gridTemplateColumns: {
            xs: `1fr`,
            sm: `1fr`,
            md: `1.5fr 1fr`,
            lg: `1.5fr 1fr`,
            xl: `1.5fr 1fr`,
          },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: `1.2rem`,
                sm: `1.5rem`,
                md: `1.6rem`,
                lg: `2rem`,
              },
            }}
            fontWeight={300}
          >
            Our Insights
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `1.5rem`,
                sm: `1.5rem`,
                md: `1.6rem`,
                lg: `2.5rem`,
              },
              my: {
                xs: `1rem`,
                sm: `1rem`,
                md: `2rem`,
                lg: `2rem`,
              },
            }}
            fontWeight={300}
          >
            Get game-changing insights on technology, the future of work, and
            management.
          </Typography>
        </Box>
        <Box
          sx={{
            position: `relative`,
            height: {
              xs: `200px`,
              sm: `200px`,
              md: `300px`,
              lg: `350px`,
              xl: `350px`,
            },
          }}
        >
          <Image src={BannerImg} alt="blog-banner-image" fill />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
