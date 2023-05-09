import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';

const labels: { [index: string]: string } = {
  0.5: `0.5`,
  1: `1`,
  1.5: `1.5`,
  2: `2`,
  2.5: `2.5`,
  3: `3`,
  3.5: `3.5`,
  4: `3`,
  4.5: `4.5`,
  5: `5`,
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? `s` : ``}, ${labels[value]}`;
}

export default function UserRating({ rate, size, fontSize }: any) {
  const [value, setValue] = React.useState<number | null>(rate);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        textAlign: `center`,
      }}
    >
      <Rating
        name="hover-feedback"
        size={size}
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Typography fontSize={fontSize} sx={{ ml: 1 }}>
          {labels[hover !== -1 ? hover : value]}
        </Typography>
      )}
    </Box>
  );
}
