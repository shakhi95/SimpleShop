import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { clearAppAlert, useAppDispatch, useAppValues } from 'src/contexts/app';

const SnakeBar = () => {
  //
  const appDispatch = useAppDispatch();
  const { alert } = useAppValues();

  const handleClose = (e: any, reason?: string) => {
    if (reason === 'clickaway') return;
    appDispatch(clearAppAlert());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={alert.isShown}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alert.mode} sx={{ width: '400px' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default SnakeBar;
