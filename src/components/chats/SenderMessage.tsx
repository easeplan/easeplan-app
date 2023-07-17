import React from 'react';
import { Box, Typography } from '@mui/material';
import cahtImg from '@/public/banner.png';
import Image from 'next/image';
import theme from '@/styles/theme';

const SenderMessage = () => {
  return (
    <Box
      sx={{
        display: `flex`,
        justifyContent: `space-between`,
        cursor: `pointer`,
        transition: `all 0.5s ease`,
        p: `1rem`,
        mb: `2rem`,
      }}
    >
      <Box sx={{ width: `90%`, textAlign: `right` }}>
        <Typography fontWeight="bold" fontSize="0.8rem">
          John Doe
        </Typography>
        <Typography fontSize="0.8rem">
          Gee, its been good news all day. i met someone special today. she
          really pretty.
        </Typography>
        {/*  If there is image then display image */}
        {/* <Box
          sx={{
            position: `relative`,
            mt: `1rem`,
            width: `100%`,
            height: `100px`,
            background: theme.palette.primary.main,
          }}
        >
          <Image src={cahtImg} alt="profileImg" fill />
        </Box> */}
      </Box>
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
    </Box>
  );
};

export default SenderMessage;
