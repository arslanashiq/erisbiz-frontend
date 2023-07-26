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

  palette: {
    primary: {
      main: '#29547d',
    },
  },

  components: {
    // AppBar
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffff',
        },
      },
    },

    // List
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffff',
        },
      },
    },

    // ListItem
    MuiListItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.selected === true && {
            backgroundColor: '#29547d !important',
            color: '#ffff',
          }),
          '&:hover': {
            backgroundColor: '#29547d',
            color: '#ffff',
          },
        }),
      },
    },

    // IconButton
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.selected === true &&
            {
              // code here
            }),
          '&:hover': {
            backgroundColor: '#f2f4f7',
          },
        }),
      },
    },
  },
});

export default theme;
