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

    allVariants: {
      fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),

      fontWeight: 400,
    },

    h1: {
      fontSize: '52px',
      fontWeight: '500',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '45px',
      },

      '@media (max-width: 768px) and (min-width: 575px)': {
        fontSize: '38px',
      },

      '@media (max-width: 575px)': {
        fontSize: '34px',
      },
    },

    h2: {
      fontSize: '42px',
      fontWeight: '500',
      textTransform: 'capitalize',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '38px',
      },

      '@media (max-width: 768px) and (min-width: 575px)': {
        fontSize: '32px',
      },

      '@media (max-width: 575px)': {
        fontSize: '30px',
      },
    },

    h3: {
      fontSize: '38px',
      fontWeight: '500',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '32px',
      },

      '@media (max-width: 768px) and (min-width: 575px)': {
        fontSize: '28px',
      },

      '@media (max-width: 575px)': {
        fontSize: '24px',
      },
    },

    h4: {
      fontSize: '34px',
      fontWeight: '500',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '28px',
      },

      '@media (max-width: 768px) and (min-width: 575px)': {
        fontSize: '24px',
      },

      '@media (max-width: 575px)': {
        fontSize: '20px',
      },
    },

    h5: {
      fontSize: '24px',
      fontWeight: '500',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '23px',
      },

      '@media (max-width: 768px) and (min-width: 575px)': {
        fontSize: '22px',
      },

      '@media (max-width: 575px)': {
        fontSize: '20px',
      },
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
