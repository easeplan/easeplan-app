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

interface Props {
  open: boolean;
  handleClose: any;
  queryData: any;
  token: string;
  setModal: any;
}
const IdentityVerificationModal = ({
  open,
  handleClose,
  queryData,
  token,
  setModal,
}: Props) => {
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
        <SettingsForm
          fromProfile={true}
          queryData={queryData}
          token={token}
          handleClose={handleClose}
          setModal={setModal}
        />
      </DialogContent>
    </Dialog>
  );
};

export default IdentityVerificationModal;
