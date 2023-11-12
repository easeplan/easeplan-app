import Image from 'next/image';
import avatarImg from '@/public/avatar.png';
import React from 'react';
import {
  Box,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { FreeMode, Mousewheel } from 'swiper';

// Swiper modules initialization
SwiperCore.use([FreeMode, Mousewheel]);

const reviews = [];

const ReviewSlider = ({ queryData }: any) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const reviewCards = queryData?.providerProfile?.ratings.map(
    (review, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'start',
          p: 3,
          mb: { xs: 4, md: 0 }, // Margin bottom only on xs screens
          border: { xs: 'solid 1px #ccc', md: 'none' }, // Borders only on xs screens
          borderRadius: '10px',
          maxWidth: { xs: '100%', md: 500 }, // Full width on xs screens, max width on larger screens
          boxShadow: { sm: 'none', md: 3 }, // Shadow on md screens and larger
          // Other styles here...
          height: '100%',
        }}
      >
        {' '}
        {/* Review card content */}
        <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
          <Rating
            name="read-only"
            value={review.stars}
            readOnly
            precision={0.1}
            sx={{ fontSize: 20 }}
          />
          <Typography>{review.date}</Typography>
        </Box>
        <Typography>{review.review}</Typography>
        <Box sx={{ display: 'flex', mt: 2, alignItems: 'center' }}>
          <Image
            src={
              review?.ratedBy?.profile?.picture
                ? review?.ratedBy?.profile?.picture
                : avatarImg
            }
            alt="profile"
            style={{
              marginRight: 16,
              borderRadius: '50%',
              width: 40,
              height: 40,
            }}
          />
          <Box>
            <Typography>
              {review?.ratedBy?.profile?.firstName + 'John'}
            </Typography>
            <Typography>{review?.ratedBy?.profile?.state + 'Delta'}</Typography>
          </Box>
        </Box>
      </Box>
    ),
  );

  const reviewCount = queryData?.providerProfile?.ratings?.length || 0;
  const reviewsNumb = `${reviewCount} review${reviewCount === 1 ? '' : 's'}`;
  // Determine the layout based on the screen width
  if (isLgUp) {
    // Grid layout for lg and xl screens
    return (
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {reviewsNumb}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1 vcdfrem',
          }}
        >
          {reviewCards}
        </Box>
      </Box>
    );
  } else if (isMdUp) {
    // Grid layout for md screens
    return (
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {reviewsNumb}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
          }}
        >
          {reviewCards}
        </Box>
      </Box>
    );
  } else {
    // Swiper for xs and sm screens
    return (
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {reviewsNumb}
        </Typography>

        <Swiper
          spaceBetween={16}
          slidesPerView={1.1} // Show 2 cards and part of the next
          centeredSlides={false} // Align slides to the start of the swiper container
          freeMode={true}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
        >
          {reviewCards.map((card, index) => (
            <SwiperSlide key={index} style={{ width: 'auto', height: 'auto' }}>
              {card}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    );
  }
};

export default ReviewSlider;
