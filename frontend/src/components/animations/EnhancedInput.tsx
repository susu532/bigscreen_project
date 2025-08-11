import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import { styled, keyframes } from '@mui/material/styles';

const inputGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 20, 147, 0.3),
      inset 0 0 20px rgba(255, 20, 147, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(153, 50, 204, 0.5),
      inset 0 0 30px rgba(153, 50, 204, 0.15);
  }
`;

const borderScan = keyframes`
  0% {
    border-image-source: linear-gradient(90deg, 
      rgba(255, 20, 147, 0.8) 0%, 
      transparent 50%, 
      transparent 100%);
  }
  25% {
    border-image-source: linear-gradient(180deg, 
      transparent 0%, 
      rgba(153, 50, 204, 1) 50%, 
      transparent 100%);
  }
  50% {
    border-image-source: linear-gradient(270deg, 
      transparent 0%, 
      rgba(138, 43, 226, 0.9) 50%, 
      transparent 100%);
  }
  75% {
    border-image-source: linear-gradient(360deg, 
      transparent 0%, 
      rgba(186, 85, 211, 0.8) 50%, 
      transparent 100%);
  }
  100% {
    border-image-source: linear-gradient(90deg, 
      rgba(255, 20, 147, 0.8) 0%, 
      transparent 50%, 
      transparent 100%);
  }
`;

const dataFlow = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    position: 'relative',
    background: 'rgba(20, 20, 30, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '2px solid transparent',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: `${inputGlow} 3s ease-in-out infinite`,
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      background: `linear-gradient(
        45deg,
        rgba(255, 20, 147, 0.6) 0%,
        rgba(153, 50, 204, 0.6) 25%,
        rgba(138, 43, 226, 0.6) 50%,
        rgba(186, 85, 211, 0.6) 75%,
        rgba(255, 20, 147, 0.6) 100%
      )`,
      borderRadius: '22px',
      zIndex: -1,
      animation: `${borderScan} 4s linear infinite`,
    },
    
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      )`,
      transform: 'translateX(-100%)',
      transition: 'transform 0.6s ease',
      pointerEvents: 'none',
    },
    
    '&:hover': {
      transform: 'perspective(1000px) translateY(-2px) translateZ(10px) rotateX(2deg)',
      boxShadow: `
        0 10px 30px rgba(255, 20, 147, 0.4),
        0 0 50px rgba(153, 50, 204, 0.3),
        inset 0 0 30px rgba(255, 20, 147, 0.15)
      `,
      
      '&::after': {
        transform: 'translateX(100%)',
        animation: `${dataFlow} 0.6s ease-out`,
      }
    },
    
    '&.Mui-focused': {
      transform: 'perspective(1000px) translateY(-4px) translateZ(15px) rotateX(3deg) scale(1.02)',
      boxShadow: `
        0 15px 40px rgba(255, 20, 147, 0.5),
        0 0 60px rgba(153, 50, 204, 0.4),
        inset 0 0 40px rgba(255, 20, 147, 0.2)
      `,
      
      '&::before': {
        background: `linear-gradient(
          45deg,
          rgba(255, 20, 147, 1) 0%,
          rgba(153, 50, 204, 1) 25%,
          rgba(138, 43, 226, 1) 50%,
          rgba(186, 85, 211, 1) 75%,
          rgba(255, 20, 147, 1) 100%
        )`,
      }
    },
    
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    
    '& input': {
      color: theme.palette.text.primary,
      fontSize: '1rem',
      fontWeight: 500,
      textShadow: '0 0 10px rgba(255, 20, 147, 0.3)',
      
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1,
      }
    }
  },
  
  '& .MuiInputLabel-root': {
    color: theme.palette.primary.light,
    fontWeight: 600,
    textShadow: '0 0 10px rgba(255, 20, 147, 0.5)',
    
    '&.Mui-focused': {
      color: theme.palette.primary.main,
      textShadow: '0 0 15px rgba(255, 20, 147, 0.8)',
    }
  },
  
  '& .MuiFormHelperText-root': {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    textShadow: '0 0 5px rgba(153, 50, 204, 0.3)',
  }
}));

export default function EnhancedInput(props: TextFieldProps) {
  return <StyledTextField {...props} />;
}