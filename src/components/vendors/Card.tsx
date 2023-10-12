import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import eventImg from '@/public/cakesImg.png';
import StarIcon from '@mui/icons-material/Star';

const Card = ({ props }: any) => {
  return (
    <Box sx={{ width: `100%`, mt: 6 }}>
      <Box
        sx={{
          width: `100%`,
          height: `14rem`,
          background: `#ccc`,
          position: `relative`,
          overflow: `hidden`,
          borderRadius: `15px`,
        }}
      >
        <Image
          src={eventImg}
          alt="eventImage"
          fill
          style={{ objectFit: `fill`, borderRadius: `10px` }}
        />
      </Box>
      <Box mt={1}>
        <Typography fontWeight={600} sx={{ fontSize: `1.2rem` }}>
          Samuel Oyinka
        </Typography>
        <Typography sx={{ fontSize: `1.1rem` }}>sammys pictures</Typography>
        <Box sx={{ display: `flex`, justifyContent: `space-between`, mt: 2 }}>
          <Typography
            sx={{ fontSize: `0.9rem`, display: `flex`, alignItems: `center` }}
          >
            <StarIcon sx={{ color: `orange` }} /> <strong>5.0</strong>
          </Typography>
          <Typography sx={{ fontSize: `0.9rem` }}>
            Starting price <strong>₦500,000</strong>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
