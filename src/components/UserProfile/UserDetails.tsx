import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { styled } from '@mui/material/styles';
import EditUserDetailsModal from './EditUserDetailsModal';
import RatingStar from '../common/RatingStar';
import Link from 'next/link';
import SocialShareButton from './SocialShareButton';
import { dateFormater } from '@/utils';

const UserDetails = ({ queryData, token }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const toggleSocialIcon = () => {
    setToggleIcon(!toggleIcon);
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
            xs: '3rem',
            sm: '3rem',
            md: '5rem',
            lg: '5rem',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Typography
            fontWeight={600}
            sx={{
              fontSize: {
                xs: '1.2rem',
                sm: '1.2rem',
                md: '1.4rem',
                lg: '1.5rem',
              },
            }}
            textTransform="capitalize"
          >
            {queryData?.profile?.firstName} {queryData?.profile?.lastName}
          </Typography>
          <EditButton onClick={handleOpenModal}>
            <CreateOutlinedIcon className="icon" />
          </EditButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RatingStar rate={queryData?.providerProfile?.rating} size="small" />
          {/* <Typography ml={1} fontSize="0.9rem">{`(0 Events)`}</Typography> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            '.preview-btn': {
              color: 'secondary.main',
              fontWeight: 'bold',
              backgroundColor: 'primary.main',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              // boxShadow: `0px 4.82797px 6.0699px rgba(0, 0, 0, 0.1)`,
              padding: '0.5rem 1rem',
              width: {
                xs: 'auto',
                sm: 'auto',
                md: 'auto',
                lg: '140px',
                xl: '140px',
              },
              height: {
                xs: '40px',
                sm: '40px',
                md: '50px',
                lg: '50px',
                xl: '50px',
              },
              transition: '0.2s',
              fontSize: '0.8rem',
            },
          }}
        >
          <div className="share-button" onClick={toggleSocialIcon}>
            <SocialShareButton
              toggleIcon={toggleIcon}
              message="Exciting news! I've joined Easeplan, the platform to find professional event planners, vendors, and service providers for your events. Check out my profile and join me on Easeplan."
              url={`https://app.easeplan.io/profile/${queryData?.providerProfile?.publicId}`}
            />
            <span className="share-text">Share Profile</span>
          </div>
          <Link
            href={`/profile/${queryData?.providerProfile?.publicId}`}
            target="_blank"
          >
            <button className="preview-btn">Preview Profile</button>
          </Link>
        </Box>
        <Box
          sx={{
            mt: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box>
              <Box>
                <EditButton onClick={handleOpenModal}>
                  <CreateOutlinedIcon className="icon" />
                </EditButton>
                <Typography fontWeight={600} color="primary.main">
                  Operational States:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  {queryData?.providerProfile?.company?.operationStates.map(
                    (item: any, i: any) => (
                      <Typography key={i} ml={1} color="primary.main">
                        {item}
                      </Typography>
                    ),
                  )}
                </Box>
              </Box>
              <Box mt={2}>
                <Typography fontWeight={600} color="primary.main">
                  Operational Cities:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: {
                      xs: 'column',
                      sm: 'column',
                      md: 'column',
                      lg: 'row',
                      xl: 'row',
                    },
                  }}
                >
                  {queryData?.providerProfile?.company?.operationCities.map(
                    (item: any, i: any) => (
                      <Typography key={i} ml={1} color="primary.main">
                        {item}
                      </Typography>
                    ),
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight={600} color="primary.main">
              Member Since:
            </Typography>
            <Typography>{dateFormater(queryData?.createdAt)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const EditButton = styled('button')(({ theme }) => ({
  border: 'none',
  backgroundColor: 'transparent',
  zIndex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  textAlign: 'center',
  verticalAlign: 'middle',
  borderRadius: '50%',
  color: theme.palette.primary.main,

  '&:hover': {
    color: theme.palette.secondary.main,
  },

  '.icon': {
    fontSize: '1.2rem',
    marginLeft: '0.4rem',
    marginBottom: '0.6rem',
  },

  '@media (max-width: 900px)': {
    '.icon': {
      fontSize: '1.2rem',
    },
  },
}));

export default UserDetails;
