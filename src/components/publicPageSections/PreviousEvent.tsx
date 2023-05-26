import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '@/styles/theme';

const PreviousEvent = ({ queryData }: any) => {
  return (
    <Box mt={10}>
      <Typography
        fontWeight={600}
        sx={{
          fontSize: {
            xs: `1.2rem`,
            sm: `1.2rem`,
            md: `1.5rem`,
            lg: `2rem`,
          },
        }}
      >
        Previous Events
      </Typography>
      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: {
            xs: `1fr`,
            sm: `1fr`,
            md: `1fr 1fr`,
            lg: `1fr 2fr`,
          },
          alignItem: `center`,
          gap: `1rem`,
          mt: `3rem`,
          boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
          borderRadius: `10px`,
          padding: `1rem`,
          borderLeft: `solid 1rem ${theme.palette.secondary.main}`,
        }}
      >
        <Box
          sx={{
            width: `100%`,
            p: {
              xs: `1rem`,
              sm: `1rem`,
              md: `2rem`,
              lg: `2rem`,
              xl: `2rem`,
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Event Title
          </Typography>
          <Typography mt={2}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
            consequuntur, id hic eum fugiat animi eligendi ducimus corporis
            sapiente sed?
          </Typography>
          <Typography textAlign="right" mt={3}>
            2 days ago
          </Typography>
        </Box>
        <Box
          sx={{
            width: `100%`,
            height: `auto`,
            borderRadius: `10px`,
            position: `relative`,
          }}
        >
          <Image
            src={queryData?.company?.image}
            alt="eventname"
            fill
            quality={100}
            style={{
              borderRadius: `10px`,
              boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
              objectFit: `cover`,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: {
            xs: `1fr`,
            sm: `1fr`,
            md: `1fr 1fr`,
            lg: `2fr 1fr`,
          },
          alignItem: `center`,
          gap: `1rem`,
          mt: `3rem`,
          boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
          borderRadius: `10px`,
          padding: `1rem`,
          borderRight: `solid 1rem ${theme.palette.secondary.main}`,
        }}
      >
        <Box
          sx={{
            width: `100%`,
            height: `auto`,
            borderRadius: `10px`,
            position: `relative`,
          }}
        >
          <Image
            src={queryData?.company?.image}
            alt="eventname"
            fill
            quality={100}
            style={{
              borderRadius: `10px`,
              boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
              objectFit: `cover`,
            }}
          />
        </Box>
        <Box
          sx={{
            width: `100%`,
            p: {
              xs: `1rem`,
              sm: `1rem`,
              md: `2rem`,
              lg: `2rem`,
              xl: `2rem`,
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Event Title
          </Typography>
          <Typography mt={2}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
            consequuntur, id hic eum fugiat animi eligendi ducimus corporis
            sapiente sed?
          </Typography>
          <Typography textAlign="right" mt={3}>
            2 days ago
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviousEvent;
