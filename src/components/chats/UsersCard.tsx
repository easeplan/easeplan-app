import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import cahtImg from '@/public/avatar.png';
import theme from '@/styles/theme';

const UsersCard = () => {
  return (
    <Box
      sx={{
        display: `flex`,
        justifyContent: `space-between`,
        cursor: `pointer`,
        transition: `all 0.5s ease`,
        borderBottom: `solid 1px #ccc`,
        '&:hover': {
          background: theme.palette.secondary.light,
          // boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
        },
        p: `1rem`,
      }}
    >
      <Box
        sx={{
          position: `relative`,
          width: `40px`,
          height: `40px`,
          borderRadius: `50%`,
          background: `red`,
        }}
      >
        <Image
          src={cahtImg}
          alt="profileImg"
          fill
          style={{
            borderRadius: `50%`,
          }}
        />
      </Box>
      <Box sx={{ width: `82%` }}>
        <Typography fontWeight="bold" fontSize="0.8rem">
          John Doe
        </Typography>
        <Typography fontSize="0.8rem">
          Gee, its been good news all day. i met someone special today. she
          really pretty.
        </Typography>
      </Box>
    </Box>
  );
};

export default UsersCard;
