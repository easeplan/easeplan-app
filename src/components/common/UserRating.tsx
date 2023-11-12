/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const labels: { [index: string]: string } = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function UserRating({
  rate,
  size,
  profileId,
  role,
  token,
}: any) {
  const [value] = React.useState<number | null>(rate);
  const [hover, setHover] = React.useState(-1);

  const queryClient = useQueryClient();

  const { mutate: updateRating } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.post('/ratings', credentials, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
    },
  });

  const handleRating = async (value: any) => {
    const data = {
      stars: value,
      role: role,
      profileId: profileId,
    };
    updateRating(data);
  };

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
        name="hover-feedback"
        size={size}
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => handleRating(newValue)}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {/* {value === 0 ? null : (
        <Typography fontSize={fontSize} sx={{ ml: 1 }}>
          {value}
        </Typography>
      )} */}
    </Box>
  );
}
