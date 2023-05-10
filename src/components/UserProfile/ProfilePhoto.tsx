import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import UpdateProfileModal from './ProfileImageModal';
import useFetch from '@/hooks/useFetch';

const ProfilePhoto = ({ token }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const { queryData, error, isLoading } = useFetch(
    `/providers/profile`,
    `${token}`,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error:</p>;
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box
      sx={{
        width: {
          xs: `70px`,
          sm: `70px`,
          md: `100px`,
          lg: `150px`,
          xl: `150px`,
        },
        height: {
          xs: `70px`,
          sm: `70px`,
          md: `100px`,
          lg: `150px`,
          xl: `150px`,
        },
        position: `absolute`,
        borderRadius: `50%`,
        bottom: {
          xs: `-2rem`,
          sm: `-2rem`,
          md: `-4rem`,
          lg: `-4rem`,
        },
        boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
      }}
    >
      <Box>
        <UpdateProfileModal
          token={token}
          queryData={queryData}
          isOpen={openModal}
          isClose={() => setOpenModal(false)}
        />
        <ChangeCoverImg>
          <AddAPhotoOutlinedIcon onClick={handleOpenModal} className="icon" />
        </ChangeCoverImg>
        <Image
          src={queryData?.picture}
          alt="bannerImage"
          fill
          style={{
            width: `100%`,
            borderRadius: `50%`,
            objectFit: `cover`,
          }}
        />
      </Box>
    </Box>
  );
};

const ChangeCoverImg = styled(`div`)(({ theme }) => ({
  position: `absolute`,
  bottom: `0.2rem`,
  right: `-1.4rem`,
  zIndex: `1`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  cursor: `pointer`,
  fontSize: `1.7rem`,
  textAlign: `center`,
  verticalAlign: `middle`,
  width: `50px`,
  height: `50px`,
  background: `#fff`,
  borderRadius: `50%`,
  color: theme.palette.primary.main,
  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },

  '@media (max-width: 900px)': {
    width: `40px`,
    height: `40px`,

    '.icon': {
      fontSize: `1.2rem`,
    },
  },
}));

export default ProfilePhoto;
