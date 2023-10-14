import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import eventImg from '@/public/cakesImg.png';
import StarIcon from '@mui/icons-material/Star';

const Card = ({ props }: any) => {
  return (
    <Box
      sx={{
        width: `100%`,
        boxShadow: `0px 4.82797px 6.0699px rgba(0, 0, 0, 0.1)`,
        borderRadius: `10px`,
      }}
    >
      <Box
        sx={{
          width: `100%`,
          height: `10rem`,
          backgroundColor: `primary.main`,
          position: `relative`,
          overflow: `hidden`,
          borderRadius: `10px`,
        }}
      >
        <Image
          src={eventImg}
          alt="eventImage"
          fill
          style={{ borderRadius: `10px` }}
        />
      </Box>
      <Box p={2}>
        <Typography fontWeight={600} sx={{ fontSize: `1rem` }}>
          Samuel Oyinka
        </Typography>
        <Typography sx={{ fontSize: `0.9rem` }}>Make-up Artist</Typography>
        <Box sx={{ display: `flex`, justifyContent: `space-between`, mt: 2 }}>
          <Typography
            sx={{ fontSize: `0.9rem`, display: `flex`, alignItems: `center` }}
          >
            <StarIcon sx={{ color: `orange` }} /> <strong>5.0</strong>
          </Typography>
          <Button
            variant="outlined"
            sx={{ textTransform: `inherit`, color: `primary.main` }}
          >
            View my profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
