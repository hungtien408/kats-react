import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';

DialogConfirm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
};

function DialogConfirm({ isOpen = false, onClose = null, onAccept = null }) {
  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };

  const handleAccept = () => {
    if (!onAccept) return;
    onAccept();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={'true'}
      maxWidth={'xs'}
      aria-labelledby="form-dialog-title"
      disableEscapeKeyDown
    >
      <DialogTitle id="form-dialog-title">Xác nhận</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">Bạn có chắc chắn?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="default">
          Hủy
        </Button>
        <Button autoFocus onClick={handleAccept} color="primary">
          Chấp nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirm;
