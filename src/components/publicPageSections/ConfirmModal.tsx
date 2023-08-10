import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Container } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: `absolute` as const,
  bottom: `-1%`,
  left: {
    xs: `0%`,
    sm: `0%`,
    md: `10%`,
    lg: `10%`,
    xl: `10%`,
  },
  // transform: `translate(-50%, -50%)`,
  width: {
    xs: `100%`,
    sm: `100%`,
    md: `40%`,
    lg: `35%`,
    xl: `35%`,
  },
  height: `auto`,
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  borderTopRightRadius: `1rem`,
  borderTopLeftRadius: `1rem`,
};

const ConfirmModal = ({ isOpen, isClose, children }: any) => {
  return (
    <Container fixed>
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
                Confirm Or Cancel Event
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
    </Container>
  );
};

export default ConfirmModal;
