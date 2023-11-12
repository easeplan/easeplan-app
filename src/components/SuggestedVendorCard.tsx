import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import theme from '@/styles/theme';
import React from 'react';
import UserRating from './common/UserRating';
import CustomButton from './common/CustomButton';
import { Divider } from '@mui/material';

const SuggestedVendorCard = ({ data }: any) => {
  return (
    <Box
      p={3}
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'column',
          lg: 'row',
          xl: 'row',
        },
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          background: 'red',
          position: 'relative',
          height: {
            xs: '130px',
            sm: '150px',
            md: '150px',
            lg: '200px',
          },
          width: '100%',
          marginBottom: {
            xs: '1rem',
            sm: '1rem',
            lg: '1rem',
          },
        }}
      >
        <Image src={data.img} alt="coverImage" fill />
      </Box>
      <Box
        color="common.white"
        sx={{
          width: '100%',
          paddingLeft: {
            sx: '2px',
            sm: '2px',
            md: '2px',
            lg: '1rem',
          },
        }}
      >
        <Box
          mb={1}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Service: {data.service}</Typography>
          <Typography>Budget: {data.budget}</Typography>
        </Box>
        <Typography mb={1}>Location: {data.location}</Typography>
        <Typography
          mb={1}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Ratings: <UserRating size="small" /> ({data.numEvent} events)
        </Typography>
        <CustomButton bgSecondary mdWidth="100%" lgWidth="100%">
          Message
        </CustomButton>
        <Box
          mt={2}
          pt={1}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `solid 1px ${theme.palette.grey['500']}`,
            cursor: 'pointer',
          }}
        >
          <Typography color="info.main">Reject</Typography>
          <Typography color="secondary.main">Accept</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SuggestedVendorCard;
