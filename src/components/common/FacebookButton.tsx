import React from 'react';
import Button from '@mui/material/Button';
import { BsFacebook } from 'react-icons/bs';

type Props = {
  text: string;
  onClick: () => void;
};

const FacebookButton = ({ text, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        textTransform: `inherit`,
        borderRadius: `30px`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        py: {
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
        },

        '.btnText': {
          fontWeight: `600`,
          fontSize: {
            xs: `0.8rem`,
            sm: `0.8rem`,
            md: `0.8rem`,
            lg: `0.9rem`,
            xl: `0.9rem`,
          },
        },

        '.btnIcon': {
          fontSize: {
            xs: `1.3rem`,
            sm: `1.3rem`,
            md: `1.2rem`,
            lg: `1.2rem`,
            xl: `1.5rem`,
          },
          mr: {
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
          },
        },
      }}
    >
      <BsFacebook className="btnIcon" /> <span className="btnText">{text}</span>
    </Button>
  );
};

export default FacebookButton;
