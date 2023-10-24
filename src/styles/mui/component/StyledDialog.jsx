import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(() => ({
  '&.MuiDialog-root': {
    '.css-4pp0nb-MuiPaper-root-MuiDialog-paper': {
      maxWidth: '900px',
    },
  },
}));

export default StyledDialog;
