import React, { useState, SyntheticEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { AlertProps } from '@material-ui/lab/Alert';
import { StyledAlert } from './styles';

const Alert = (props: AlertProps) => {
  return <StyledAlert elevation={6} variant="filled" {...props} />;
};

interface IToast {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  duration?: number;
}

const Toast: React.FC<IToast> = ({ type, message, duration = 6000 }: IToast) => {
  const [open, setOpen] = useState<boolean>(message ? true : false);

  const handleClose = (_?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
