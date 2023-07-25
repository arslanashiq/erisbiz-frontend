/* eslint-disable */
import { createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffff',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffff',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.selected === true && {
            backgroundColor: 'lightblue !important',
            color: '#ffff',
          }),
          '&:hover': {
            backgroundColor: 'lightblue',
            color: '#ffff',
          },
        }),
      },
    },
  },
});

export default theme;
