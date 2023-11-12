import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import theme from '@/styles/theme';
import { Container } from '@mui/system';

const style = {
  position: 'absolute' as const,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '85%',
    sm: 300,
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

export default function SuccessModal({
  isOpen,
  title,
  message,
  isClose,
  children,
}: any) {
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
                textAlign: 'center',
                pt: {
                  xs: 2,
                  lg: 4,
                },
                pb: {
                  xs: 2,
                  lg: 2,
                },
              }}
            >
              <TaskAltIcon
                sx={{
                  fontSize: {
                    xs: '2.5rem',
                    sm: '2.5rem',
                    lg: '3rem',
                  },
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
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
                variant="h6"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {title}
              </Typography>
              <Typography mt={2}>{message}</Typography>
              {children}
            </Box>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
}
