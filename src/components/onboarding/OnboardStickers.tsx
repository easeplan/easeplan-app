import { Box } from '@mui/material';
import React from 'react';

interface PropsTypes {
  bgColor?: string;
  text: string;
  top?: string;
  right?: string;
  left?: string;
  down?: string;
}

const OnboardStickers = ({
  bgColor,
  text,
  top,
  right,
  left,
  down,
}: PropsTypes) => {
  return (
    <Box
      sx={{
        backgroundColor: bgColor ? bgColor : `secondary.main`,
        position: `absolute`,
        top: top,
        left: left,
        right: right,
        bottom: down,
        borderTopLeftRadius: `20px`,
        borderTopRightRadius: `20px`,
        borderBottomRightRadius: `20px`,
        border: `solid 2px #000`,
        fontWeight: `600`,
        color: `#333`,
      }}
      px={2}
      py={1}
    >
      <p>{text}</p>
    </Box>
  );
};

export default OnboardStickers;
