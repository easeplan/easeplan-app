import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Container } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

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

const ErrorModal = ({ isOpen, isClose }: any) => {
  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="sm">
        <Box sx={style}>
          <>
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
            <Box sx={{ px: `1rem`, py: `3rem`, textAlign: `center` }}>
              <TaskAltIcon sx={{ fontSize: `5rem`, color: `secondary.main` }} />
              <Typography
                sx={{
                  cursor: `pointer`,
                  textAlign: `center`,
                  color: `primary.main`,
                }}
              >
                Payment Successful
              </Typography>
            </Box>
          </>
        </Box>
      </Container>
    </Modal>
  );
};

export default ErrorModal;
