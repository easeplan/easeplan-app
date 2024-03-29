import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import theme from '@/styles/theme';
import Link from 'next/link';
import { dateFormaterAndTime, formatCurrency } from '@/utils';
import StyleIcon from '@mui/icons-material/Style';

const EventList = () => {
  const { notifyData } = useSelector((state: RootState) => state.notifications);

  function getLastFiveElements(array: any) {
    if (array?.length <= 5) {
      return array;
    } else {
      return array?.slice(-5);
    }
  }

  const resultData = getLastFiveElements(notifyData);

  console.log(resultData);

  return (
    <>
      <Typography sx={{ fontSize: `2rem` }}>Events</Typography>
      <Divider />
      {notifyData?.length < 1 ? (
        <Box sx={{ textAlign: `center`, mt: 10, color: `grey.500` }}>
          <StyleIcon sx={{ fontSize: `3rem` }} />
          <Typography sx={{ fontSize: `1.1rem` }}>
            Your ongoing events will show here
          </Typography>
        </Box>
      ) : (
        resultData?.map((data: any) => (
          <Box
            key={data?._id}
            sx={{
              // bgcolor: `secondary.light`,
              px: 2,
              py: 1,
              my: 2,
              display: `grid`,
              borderRadius: `10px`,
              gridTemplateColumns: `repeat(3, 1fr)`,
              alignItems: `center`,
              textAlign: `center`,
              border: `solid 1px ${theme.palette.primary.main}`,
            }}
          >
            <Typography>{formatCurrency(data?.budget)}</Typography>
            <Typography>
              {data?.createdAt && dateFormaterAndTime(data?.createdAt)}
            </Typography>
            <Link href={`/account/event/${data?._id}`}>
              <Button variant="outlined" size="small">
                View
              </Button>
            </Link>
          </Box>
        ))
      )}
    </>
  );
};

export default EventList;
