import React from 'react';
import { Box, Typography } from '@mui/material';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import theme from '@/styles/theme';
import Link from 'next/link';
import { dateFormaterAndTime, formatCurrency } from '@/utils';

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

  console.log(notifyData);

  return (
    <>
      <h3 className="sectionTitle">Events</h3>
      {notifyData?.length < 1 ? (
        <Box sx={{ textAlign: `center`, mt: 10, color: `grey.500` }}>
          <Typography>Your ongoing events will show here</Typography>
        </Box>
      ) : (
        notifyData?.map((data: any) => (
          <Box
            key={data?._id}
            sx={{
              bgcolor: `secondary.light`,
              py: 2,
              my: 2,
              display: `grid`,
              gridTemplateColumns: `repeat(3, 1fr)`,
              alignItems: `center`,
              textAlign: `center`,
              border: `solid 1px ${theme.palette.secondary.main}`,
            }}
          >
            <Typography>{formatCurrency(data?.budget)}</Typography>
            <Typography>
              {data?.dateTime && dateFormaterAndTime(data?.dateTime)}
            </Typography>
            <Link href={`/account/contracts/${data?._id}`}>View</Link>
          </Box>
        ))
      )}
    </>
  );
};

export default EventList;
