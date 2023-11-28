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
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
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
    MuiIcon: {
      defaultProps: {
        color: 'primary',
      },
    },

    // IconButton
    MuiIconButton: {
      defaultProps: {
        color: 'primary',
      },
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
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
    // TableContainer
    MuiTableContainer: {
      styleOverrides: {
        root: {
          maxHeight: '63vh',
        },
      },
    },
  },
});

export default theme;
