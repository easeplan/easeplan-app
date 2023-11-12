import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';

export default function RatingStar({ rate, size, fontSize }: any) {
  const [value, setValue] = React.useState<number | null>(rate);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Rating
        size={size}
        value={value}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        readOnly
      />
      {/* {value !== null && (
        <Typography fontSize={fontSize} sx={{ ml: 1 }}>
          {value}
        </Typography>
      )} */}
    </Box>
  );
}
