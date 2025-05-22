import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// Create base theme
let theme = createTheme({
  palette: {
    primary: {
      light: '#4dabf5',
      main: '#1976d2',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
      subtle: '#f0f7ff',
      highlight: alpha('#1976d2', 0.05),
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    info: {
      main: '#03a9f4',
      light: '#4fc3f7',
      dark: '#0288d1',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: '0.00714em',
    },
    body1: {
      letterSpacing: '0.00938em',
      lineHeight: 1.6,
    },
    body2: {
      letterSpacing: '0.01071em',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.03), 0px 1px 2px rgba(0,0,0,0.06)',
    '0px 4px 8px rgba(0,0,0,0.04), 0px 2px 4px rgba(0,0,0,0.08)',
    '0px 6px 12px rgba(0,0,0,0.05), 0px 3px 6px rgba(0,0,0,0.10)',
    '0px 8px 16px rgba(0,0,0,0.06), 0px 4px 8px rgba(0,0,0,0.12)',
    ...Array(20).fill('none'),
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          scrollBehavior: 'smooth',
        },
        body: {
          minHeight: '100vh',
          position: 'relative',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#a8a8a8',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            maxWidth: '1200px',
          },
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.09)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          padding: '8px 20px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #f50057 30%, #ff4081 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #c51162 30%, #f50057 90%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.15)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          position: 'relative',
          textDecoration: 'none',
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            '&::after': {
              width: '100%',
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '0',
            height: '1px',
            bottom: '-2px',
            left: '0',
            backgroundColor: 'currentColor',
            transition: 'width 0.3s ease-in-out',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: alpha('#1976d2', 0.08),
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
