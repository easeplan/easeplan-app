import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const PreviousEvent = ({ queryData }: any) => {
  console.log(queryData);
  return (
    <Box mt={10}>
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
        Activities
      </Typography>
      <Box
        sx={{
          display: `flex`,
          flexDirection: {
            xs: `column`,
            sm: `column`,
            md: `row`,
            lg: `row`,
            xl: `row`,
          },
          alignItem: `center`,
          gap: `1rem`,
          mt: `3rem`,
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
        <Box
          sx={{
            width: `350px`,
            height: `200px`,
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
          <Typography variant="h4">Event Title</Typography>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
            consequuntur, id hic eum fugiat animi eligendi ducimus corporis
            sapiente sed?
          </p>
          <Typography textAlign="right" mt={3}>
            2 days ago
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: `flex`,
          flexDirection: {
            xs: `column`,
            sm: `column`,
            md: `row`,
            lg: `row`,
            xl: `row`,
          },
          alignItem: `center`,
          gap: `1rem`,
          mt: `3rem`,
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
        <Box
          sx={{
            width: `350px`,
            height: `200px`,
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
          <Typography variant="h4">Event Title</Typography>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
            consequuntur, id hic eum fugiat animi eligendi ducimus corporis
            sapiente sed?
          </p>
          <Typography textAlign="right" mt={3}>
            2 days ago
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviousEvent;
