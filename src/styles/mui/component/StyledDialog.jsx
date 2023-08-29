import React from 'react';
import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

const MuiDialog = styled(Dialog)(() => ({
  '&.MuiDialog-root': {
    '.css-4pp0nb-MuiPaper-root-MuiDialog-paper': {
      minWidth: '900px',
      maxWidth: '900px',
    },
  },
}));

export default function StyledDialog({ ...props }) {
  return <MuiDialog {...props} />;
}
