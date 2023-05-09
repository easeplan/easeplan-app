/* eslint-disable @typescript-eslint/no-use-before-define */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: `absolute` as const,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: `50%`,
  borderRadius: `1rem`,
  padding: `2rem`,
  background: `#fff`,
  boxShadow: 24,

  '@media (max-width: 1020px)': {
    width: `90%`,
    padding: `2rem`,
  },
};

interface IModal {
  isOpen: boolean;
  isClose: any;
  title: string;
}

export default function CustomModal({ isOpen, title, isClose }: IModal) {
  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <Box sx={style}>
        <ModalBody>
          <CloseIcon className="closeIcon" onClick={() => isClose(false)} />
          <h1>{title}</h1>
        </ModalBody>
      </Box>
    </Modal>
  );
}

const ModalBody = styled(`div`)(({ theme }) => ({
  position: `relative`,
  padding: `2rem`,

  '.closeIcon': {
    position: `absolute`,
    color: theme.palette.grey[700],
    top: `-1rem`,
    right: `-1rem`,
    cursor: `pointer`,
  },
}));
