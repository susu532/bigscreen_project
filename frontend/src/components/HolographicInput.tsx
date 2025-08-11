import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import { styled, keyframes } from '@mui/material/styles';

const borderScan = keyframes`
  0% {
    border-image-source: linear-gradient(90deg, 
      rgba(255, 20, 147, 0.8) 0%, 
      transparent 50%, 
      transparent 100%);
  }
  50% {
    border-image-source: linear-gradient(90deg, 
      transparent 0%, 
      rgba(153, 50, 204, 1) 50%, 
      transparent 100%);
  }
  100% {
    border-image-source: linear-gradient(90deg, 
      transparent 0%, 
      transparent 50%, 
      rgba(255, 20, 147, 0.8) 100%);
  }
`;

const hologramGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 10px rgba(255, 20, 147, 0.3),
      inset 0 0 10px rgba(255, 20, 147, 0.1);
  }
  50% {
    box-shadow: 
      0 0 20px rgba(153, 50, 204, 0.5),
      inset 0 0 20px rgba(153, 50, 204, 0.15);
  }
`;

const HolographicInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: `
      linear-gradient(135deg, 
        rgba(20, 20, 30, 0.8) 0%,
        rgba(30, 20, 40, 0.6) 100%
      )
    `,
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: `${hologramGlow} 3s ease-in-out infinite`,
    
    '& fieldset': {
      border: '2px solid rgba(255, 20, 147, 0.3)',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
    },
    
    '&:hover fieldset': {
      border: '2px solid rgba(255, 20, 147, 0.6)',
      boxShadow: '0 0 20px rgba(255, 20, 147, 0.4)',
    },
    
    '&.Mui-focused fieldset': {
      border: '2px solid rgba(153, 50, 204, 0.8)',
      boxShadow: `
        0 0 30px rgba(153, 50, 204, 0.6),
        inset 0 0 20px rgba(153, 50, 204, 0.1)
      `,
      animation: `${borderScan} 2s ease-in-out infinite`,
    },
    
    '& input': {
      color: theme.palette.common.white,
      fontSize: '1rem',
      fontWeight: 500,
      textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
      
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)',
        opacity: 1,
      }
    },
    
    '& textarea': {
      color: theme.palette.common.white,
      fontSize: '1rem',
      fontWeight: 500,
      textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
      
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)',
        opacity: 1,
      }
    }
  },
  
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 20, 147, 0.8)',
    fontWeight: 600,
    textShadow: '0 0 10px rgba(255, 20, 147, 0.5)',
    
    '&.Mui-focused': {
      color: 'rgba(153, 50, 204, 1)',
      textShadow: '0 0 15px rgba(153, 50, 204, 0.8)',
    }
  },
  
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    marginTop: '8px',
  }
}));

export default function EnhancedHolographicInput(props: TextFieldProps) {
  return <HolographicInput {...props} />;
}