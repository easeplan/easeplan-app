import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import CustomButton from './common/CustomButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: `absolute` as const,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: {
    xs: `85%`,
    sm: `45%`,
    md: `40%`,
    lg: `30%`,
    xl: `30%`,
  },
  height: `auto`,
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  borderRadius: `1rem`,
};

const AcceptOfferConfirmModal = ({ isOpen, isClose, children }: any) => {
  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="sm">
        <Box sx={style}>
          <Box
            sx={{
              p: 2,
              backgroundColor: `primary.main`,
              borderTopRightRadius: `1rem`,
              borderTopLeftRadius: `1rem`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
            }}
          >
            <Typography color="secondary.main" fontWeight={600}>
              Accept Job Offer
            </Typography>
            <Typography
              sx={{
                cursor: `pointer`,
                textAlign: `center`,
                color: `secondary.light`,
              }}
            >
              <CloseIcon onClick={isClose} />
            </Typography>
          </Box>
          {children}
        </Box>
      </Container>
    </Modal>
  );
};

export default AcceptOfferConfirmModal;
