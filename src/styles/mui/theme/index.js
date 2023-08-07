import { createTheme } from '@mui/material';
import palette from './palette';

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

  palette,

  components: {
    // AppBar
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.contrastText,
        },
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
            backgroundColor: palette.primary.backgroundColor,
          },
        }),
      },
    },

    // Button
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
      },
    },
    // TableContainer
    MuiTableContainer: {
      styleOverrides: {
        root: {
          height: '64vh',
        },
      },
    },
  },
});

export default theme;
