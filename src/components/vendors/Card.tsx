import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import eventImg from '@/public/cakesImg.png';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatCurrency } from '@/utils';

const Card = ({ data }: any) => {
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
          height: `8rem`,
          // backgroundColor: `primary.main`,
          position: `relative`,
          overflow: `hidden`,
          borderRadius: `10px`,
        }}
      >
        <Image
          src={data?.company?.image ? data?.company?.image : eventImg}
          alt="eventImage"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          style={{
            borderRadius: `10px`,
          }}
        />
      </Box>
      <Box p={2}>
        <Typography
          fontWeight={600}
          sx={{ fontSize: `0.9rem`, textTransform: `uppercase` }}
        >
          {data?.company?.name}
        </Typography>
        <Typography sx={{ fontSize: `0.9rem`, mb: 1 }}>
          {data?.company?.services}
        </Typography>
        <Typography
          sx={{
            fontSize: `0.8rem`,
            fontWeight: `700`,
            color: `grey`,
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <LocationOnIcon sx={{ fontSize: `0.9rem` }} />
          {data?.state}
        </Typography>
        <Box sx={{ display: `flex`, justifyContent: `space-between`, mt: 2 }}>
          <Typography
            sx={{ fontSize: `0.9rem`, display: `flex`, alignItems: `center` }}
          >
            {/* {data?.rating === 0 ? (
              <StarIcon sx={{ color: `grey` }} />
            ) : (
              <StarIcon sx={{ color: `orange` }} />
            )} */}
            <StarIcon sx={{ color: `orange` }} />
            {` `}
            <strong>{data?.rating}</strong>
          </Typography>
          <Typography sx={{ fontSize: `0.9rem` }}>
            Starting {` `}
            {` `}
            <strong> ₦{formatCurrency(data?.budget?.minimum)}</strong>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
