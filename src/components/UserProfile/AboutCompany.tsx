import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { styled } from '@mui/material/styles';
import EditCompanyModal from './EditCompanyModal';

const AboutCompany = ({ queryData, token }: any) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <Box
      sx={{
        mb: `3rem`,
      }}
    >
      <EditCompanyModal
        isOpen={openModal}
        isClose={() => setOpenModal(false)}
        token={token}
        queryData={queryData}
      />
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
          {queryData?.providerProfile?.company?.name}
        </Typography>
        <EditButton onClick={handleOpenModal}>
          <CreateOutlinedIcon className="icon" />
        </EditButton>
      </Box>
      <Box>
        <Typography>
          {queryData?.providerProfile?.company?.description}
        </Typography>
      </Box>
    </Box>
  );
};

const EditButton = styled(`button`)(({ theme }) => ({
  border: `none`,
  backgroundColor: `transparent`,
  zIndex: `1`,
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
