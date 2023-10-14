import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import Image from 'next/image';

const Reviews = ({ queryData }: any) => {
  return (
    <Box mt={10}>
      <Divider />
      <Typography
        fontWeight={600}
        sx={{
          mt: 3,
          fontSize: {
            xs: `1.2rem`,
            sm: `1.2rem`,
            md: `1.4rem`,
            lg: `1.5rem`,
          },
          color: `primary.main`,
        }}
      >
        Reviews
      </Typography>
      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: {
            xs: `1fr`,
            sm: `1fr`,
            md: `1fr 1fr`,
            lg: `1fr 1fr 1fr`,
          },
          gap: `4rem`,
          mt: `4rem`,
        }}
      >
        {queryData?.providerProfile?.ratings?.map((reviews: any) => (
          <Box
            key={reviews?.id}
            sx={{
              borderBottom: `solid 1px #ccc`,
              paddingBottom: {
                xs: `1rem`,
                sm: `1rem`,
                md: `2rem`,
                lg: `2rem`,
                xl: `2rem`,
              },
            }}
          >
            <Box
              sx={{
                display: `flex`,
                flexDirection: `row`,
                alignItem: `center`,
                justifyContent: `space-between`,
                gap: `1rem`,
                mb: `1rem`,
              }}
            >
              <Typography>
                <ForumIcon sx={{ color: `secondary.main` }} />
              </Typography>
            </Box>
            <Typography>{reviews?.review}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
