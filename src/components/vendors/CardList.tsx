import React from 'react';
import Card from './Card';
import { Box } from '@mui/material';
import Link from 'next/link';

const CardList = ({ data }: any) => {
  return (
    <Box
      sx={{
        display: `grid`,
        gridTemplateColumns: {
          xs: `1fr`,
          sm: `1fr`,
          md: `1fr 1fr 1fr`,
          lg: `1fr 1fr 1fr 1fr`,
          xl: `1fr 1fr 1fr 1fr`,
        },
        gap: `2rem`,
      }}
    >
      {data?.map((data: any) => (
        <Link href={`/profile/${data?.publicId}`} key={data?.id}>
          <Card data={data} />
        </Link>
      ))}
    </Box>
  );
};

export default CardList;
