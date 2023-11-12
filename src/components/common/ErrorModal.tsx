import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import theme from '@/styles/theme';
import { Container } from '@mui/system';

const style = {
  position: 'absolute' as const,
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '80%',
    sm: '60%',
    md: '50%',
    lg: '30%',
    xl: '30%',
  },
  bgcolor: '#fff',
  border: 'none',
  boxShadow: 24,
  textAlign: 'center',
  borderRadius: '8px',
};

export default function ErrorModal({
  isOpen,
  title,
  message,
  isClose,
  children,
}: any) {
  return (
    <Container>
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm">
          <Box sx={style}>
            <ErrorOutlineIcon
              sx={{
                fontSize: {
                  xs: '2.5rem',
                  sm: '2.5rem',
                  lg: '3rem',
                },
                paddingTop: '0.6rem',
                color: theme.palette.error.main,
              }}
            />
            <Box
              sx={{
                textAlign: 'center',
                marginBottom: '0.5rem',
                px: 6,
                pb: 2,
                // color: theme.palette.primary.main,
              }}
            >
              <Typography
                color="primary.main"
                mt={2}
                variant="h6"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {title}
              </Typography>
              <Typography mb={2}>{message}</Typography>
              {children}
            </Box>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
}
