import React from 'react';
import { Box, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { styled } from '@mui/material/styles';

const AboutCompany = ({ queryData, token }: any) => {
  return (
    <Box
      sx={{
        mb: `3rem`,
      }}
    >
      <Box
        sx={{
          mt: `5rem`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
        }}
      >
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
          About {queryData?.company?.name}
        </Typography>
        <EditButton>
          <CreateOutlinedIcon className="icon" />
        </EditButton>
      </Box>
      <Box>
        <Typography>{queryData?.company?.description}</Typography>
      </Box>
    </Box>
  );
};

const EditButton = styled(`button`)(({ theme }) => ({
  border: `none`,
  backgroundColor: `transparent`,
  zIndex: `9`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  cursor: `pointer`,
  textAlign: `center`,
  verticalAlign: `middle`,
  borderRadius: `50%`,
  color: theme.palette.primary.main,

  '&:hover': {
    color: theme.palette.secondary.main,
  },

  '.icon': {
    fontSize: `2rem`,
    marginLeft: `0.4rem`,
    marginBottom: `0.6rem`,
  },

  '@media (max-width: 900px)': {
    '.icon': {
      fontSize: `1.2rem`,
    },
  },
}));

export default AboutCompany;
