import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff1493',
      light: '#ff69b4',
      dark: '#c2185b',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#d633ff',
      light: '#e066ff',
      dark: '#a600ff',
      contrastText: '#ffffff'
    },
    background: {
      default: '#0a0610',
      paper: 'rgba(20, 12, 28, 0.82)'
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0'
    },
    error: {
      main: '#ff4444',
      light: '#ff6666',
      dark: '#cc0000'
    },
    warning: {
      main: '#ffaa00',
      light: '#ffcc44',
      dark: '#cc8800'
    },
    info: {
      main: '#00aaff',
      light: '#44ccff',
      dark: '#0088cc'
    },
    success: {
      main: '#00ff88',
      light: '#44ffaa',
      dark: '#00cc66'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", "Roboto", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 600,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    }
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(255, 20, 147, 0.15)',
    '0px 4px 16px rgba(255, 20, 147, 0.2)',
    '0px 6px 24px rgba(255, 20, 147, 0.25)',
    '0px 8px 32px rgba(255, 20, 147, 0.3)',
    '0px 12px 40px rgba(153, 50, 204, 0.35)',
    '0px 16px 48px rgba(153, 50, 204, 0.4)',
    '0px 20px 56px rgba(138, 43, 226, 0.45)',
    '0px 24px 64px rgba(138, 43, 226, 0.5)',
    '0px 28px 72px rgba(106, 13, 173, 0.55)',
    '0px 32px 80px rgba(106, 13, 173, 0.6)',
    '0px 36px 88px rgba(75, 0, 130, 0.65)',
    '0px 40px 96px rgba(75, 0, 130, 0.7)',
    '0px 44px 104px rgba(75, 0, 130, 0.75)',
    '0px 48px 112px rgba(75, 0, 130, 0.8)',
    '0px 52px 120px rgba(75, 0, 130, 0.85)',
    '0px 56px 128px rgba(75, 0, 130, 0.9)',
    '0px 60px 136px rgba(75, 0, 130, 0.95)',
    '0px 64px 144px rgba(75, 0, 130, 1)',
    '0px 68px 152px rgba(75, 0, 130, 1)',
    '0px 72px 160px rgba(75, 0, 130, 1)',
    '0px 76px 168px rgba(75, 0, 130, 1)',
    '0px 80px 176px rgba(75, 0, 130, 1)',
    '0px 84px 184px rgba(75, 0, 130, 1)',
    '0px 88px 192px rgba(75, 0, 130, 1)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          letterSpacing: '0.5px',
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          boxShadow: `
            0 0 20px rgba(255, 20, 147, 0.3), 
            0 8px 24px rgba(0,0,0,0.3),
            0 4px 12px rgba(255, 20, 147, 0.2)
          `,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.6s ease',
          },
          
          ':hover': {
            transform: 'perspective(1000px) translateY(-4px) translateZ(20px) rotateX(5deg) scale(1.02)',
            boxShadow: `
              0 0 40px rgba(255, 20, 147, 0.6), 
              0 16px 32px rgba(0,0,0,0.4),
              0 8px 24px rgba(255, 20, 147, 0.4),
              inset 0 0 20px rgba(255, 20, 147, 0.1)
            `,
            
            '&::before': {
              transform: 'translateX(100%)',
            }
          },
          
          ':active': {
            transform: 'perspective(1000px) translateY(-2px) translateZ(10px) rotateX(2deg) scale(0.98)',
          }
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #ff1493 0%, #9932cc 50%, #8a2be2 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 4s ease-in-out infinite',
          
          '@keyframes gradientShift': {
            '0%, 100%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
          }
        },
        outlinedPrimary: {
          borderWidth: 2,
          background: 'rgba(20, 20, 30, 0.6)',
          backdropFilter: 'blur(10px)',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(20,20,30,0.8)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 30% 30%, rgba(255, 20, 147, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(153, 50, 204, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          },
          
          '&:hover': {
            transform: 'perspective(1000px) translateY(-2px) translateZ(10px) rotateX(2deg)',
            boxShadow: `
              0 10px 30px rgba(255, 20, 147, 0.2),
              0 0 50px rgba(153, 50, 204, 0.15),
              inset 0 0 30px rgba(255, 20, 147, 0.05)
            `,
            border: '1px solid rgba(255, 20, 147, 0.3)',
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: 'rgba(255,255,255,0.04)',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ff69b4'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ff1493',
            boxShadow: '0 0 20px rgba(255, 20, 147, 0.5)'
          }
        },
        notchedOutline: {
          borderColor: 'rgba(255,255,255,0.18)'
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#ba55d3',
          '&.Mui-checked': { color: '#ff1493' },
          filter: 'drop-shadow(0 0 6px rgba(255,20,147,0.4))'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 8, height: 8 },
        bar: { borderRadius: 8 }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(255,20,147,0.3), rgba(153,50,204,0.3))',
          backdropFilter: 'blur(10px)'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, rgba(20,20,30,0.9), rgba(30,20,50,0.9))',
          borderRight: '1px solid rgba(255,255,255,0.08)'
        }
      }
    }
  }
});

export default theme;