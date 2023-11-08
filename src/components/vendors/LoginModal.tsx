import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import theme from '@/styles/theme';
import { Container } from '@mui/system';
import LoginForm from '../LoginForm';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import SignupForm from '../SignupForm';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const style = {
  position: `absolute` as const,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: {
    xs: `85%`,
    sm: `60%`,
    md: `80%`,
    lg: `50%`,
    xl: `50%`,
  },
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  padding: `1rem`,
  textAlign: `center`,
  borderRadius: `8px`,
};

export default function LoginModal({ isOpen, isClose }: any) {
  const { isLogin } = useSelector((state: RootState) => state.onboarding);
  return (
    <Container fixed>
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="lg">
          <Box sx={style}>
            <Box sx={{ position: `relative` }}>
              <Button
                sx={{
                  position: `absolute`,
                  right: `1rem`,
                  top: `1rem`,
                  zIndex: 9,
                }}
              >
                <CloseIcon sx={{ color: `primary.main` }} onClick={isClose} />
              </Button>
              {isLogin ? <LoginForm modal /> : <SignupForm modal />}
            </Box>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
}
