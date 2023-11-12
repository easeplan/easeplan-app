import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SettingsForm from '@/components/vendors/SettingsForm';

const IdentityVerificationModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Avatar sx={{ m: 'auto', bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
      </DialogTitle>
      <DialogContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          Help us verify your identity by providing more info.
        </Typography>
        <SettingsForm />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{ m: 'auto', mb: 2 }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IdentityVerificationModal;
