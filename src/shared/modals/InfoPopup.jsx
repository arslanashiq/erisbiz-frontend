/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import { IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function AlertDialogSlide({ open, setOpen, infoTitle, infoDescription }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '0%', right: '0%' }}>
          <CloseIcon />
        </IconButton>
        <Stack
          sx={{
            minWidth: 300,
            maxWidth: 400,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: 3,
          }}
        >
          <EmojiFlagsIcon sx={{ fontSize: 40 }} />
          <DialogTitle sx={{ padding: '5px 5px 5px 5px' }}>{infoTitle}</DialogTitle>
          <DialogContent sx={{ padding: '0px 24px 0px 24px' }}>
            <DialogContentText fontSize={13} id="alert-dialog-slide-description">
              {infoDescription}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="text-capitalize">
              Ok
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
}
AlertDialogSlide.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  infoTitle: PropTypes.string,
  infoDescription: PropTypes.string,
};
AlertDialogSlide.defaultProps = {
  infoTitle: 'Attention',
  infoDescription: '',
};
export default AlertDialogSlide;
