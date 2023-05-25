import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Reviews = ({ queryData }: any) => {
  return (
    <Box
      mt={6}
      sx={{
        borderBottom: `solid 1px #ccc`,
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
            xs: `1.2rem`,
            sm: `1.2rem`,
            md: `1.4rem`,
            lg: `1.5rem`,
          },
        }}
      >
        Reviews
      </Typography>
      <Box
        sx={{ display: `grid`, gridTemplateColumns: `1fr 1fr`, gap: `8rem` }}
      >
        <Box>
          <Box
            sx={{
              display: `flex`,
              flexDirection: `row`,
              alignItem: `center`,
              justifyContent: `space-between`,
              gap: `1rem`,
              mt: `3rem`,
              mb: `1rem`,
            }}
          >
            <Typography fontWeight={600}>John Deo</Typography>
            <Typography textAlign="right" mt={1}>
              2 days ago
            </Typography>
          </Box>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
            consequuntur, id hic eum fugiat animi eligendi ducimus corporis
            sapiente sed?
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: `flex`,
              flexDirection: `row`,
              alignItem: `center`,
              justifyContent: `space-between`,
              gap: `1rem`,
              mt: `3rem`,
              mb: `1rem`,
            }}
          >
            <Typography fontWeight={600}>John Deo</Typography>
            <Typography textAlign="right" mt={1}>
              2 days ago
            </Typography>
          </Box>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
            consequuntur, id hic eum fugiat animi eligendi ducimus corporis
            sapiente sed?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Reviews;
