import * as React from 'react';
import { ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const MuiListItem = styled(ListItem)(({ theme }) => ({
  '&.Mui-selected,&:hover ': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    '.MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default function SideBarListItem({ ...props }) {
  return <MuiListItem {...props} />;
}
