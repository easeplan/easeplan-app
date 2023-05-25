import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { styled } from '@mui/material/styles';
import EditUserDetailsModal from './EditUserDetailsModal';
import UserRating from '../common/UserRating';

const UserDetails = ({ queryData, token }: any) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box>
      <EditUserDetailsModal
        isOpen={openModal}
        isClose={() => setOpenModal(false)}
        token={token}
        queryData={queryData}
      />
      <Box
        sx={{
          mt: {
            xs: `3rem`,
            sm: `3rem`,
            md: `5rem`,
            lg: `5rem`,
          },
        }}
      >
        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            position: `relative`,
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
            textTransform="capitalize"
          >
            {queryData?.firstName} {` `} {queryData?.lastName}
          </Typography>
          <EditButton onClick={handleOpenModal}>
            <CreateOutlinedIcon className="icon" />
          </EditButton>
        </Box>
        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <UserRating rate={queryData?.rating} size="small" />
          <Typography ml={1} fontSize="0.9rem">{`(0 Events)`}</Typography>
        </Box>
        <Box
          sx={{
            mt: `5rem`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`,
          }}
        >
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <Box>
              <Typography fontWeight={600}>Location:</Typography>
              <Typography>
                {queryData?.state} {queryData?.city}
              </Typography>
            </Box>
            <EditButton onClick={handleOpenModal}>
              <CreateOutlinedIcon className="icon" />
            </EditButton>
          </Box>
          <Box>
            <Typography fontWeight={600}>Member Since:</Typography>
            <Typography>Sep, 2022</Typography>
          </Box>
        </Box>
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
    fontSize: `1.2rem`,
    marginLeft: `0.4rem`,
    marginBottom: `0.6rem`,
  },

  '@media (max-width: 900px)': {
    '.icon': {
      fontSize: `1.2rem`,
    },
  },
}));

export default UserDetails;
