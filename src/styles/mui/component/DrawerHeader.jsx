import { styled } from '@mui/material/styles';
import { DRAWER_WIDTH } from 'utilities/constants';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  width: DRAWER_WIDTH,
  ...theme.mixins.toolbar,
}));

export default DrawerHeader;
