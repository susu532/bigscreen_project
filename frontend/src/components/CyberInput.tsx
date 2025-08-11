import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import { styled, keyframes } from '@mui/material/styles';

const dataScan = keyframes`
  0% {
    border-image-source: linear-gradient(90deg, 
      rgba(255, 20, 147, 0.9) 0%, 
      transparent 30%, 
      transparent 70%,
      rgba(255, 20, 147, 0.9) 100%);
  }
  25% {
    border-image-source: linear-gradient(180deg, 
      transparent 0%, 
      rgba(153, 50, 204, 1) 30%, 
      rgba(153, 50, 204, 1) 70%,
      transparent 100%);
  }
  50% {
    border-image-source: linear-gradient(270deg, 
      rgba(138, 43, 226, 0.9) 0%, 
      transparent 30%, 
      transparent 70%,
      rgba(138, 43, 226, 0.9) 100%);
  }
  75% {
    border-image-source: linear-gradient(360deg, 
      transparent 0%, 
      rgba(186, 85, 211, 1) 30%, 
      rgba(186, 85, 211, 1) 70%,
      transparent 100%);
  }
  100% {
    border-image-source: linear-gradient(90deg, 
      rgba(255, 20, 147, 0.9) 0%, 
      transparent 30%, 
      transparent 70%,
      rgba(255, 20, 147, 0.9) 100%);
  }
`;

const cyberGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 20, 147, 0.4),
      inset 0 0 20px rgba(255, 20, 147, 0.1),
      0 0 40px rgba(255, 20, 147, 0.2);
  }
  33% {
    box-shadow: 
      0 0 30px rgba(153, 50, 204, 0.6),
      inset 0 0 30px rgba(153, 50, 204, 0.15),
      0 0 60px rgba(153, 50, 204, 0.3);
  }
  66% {
    box-shadow: 
      0 0 25px rgba(138, 43, 226, 0.5),
      inset 0 0 25px rgba(138, 43, 226, 0.12),
      0 0 50px rgba(138, 43, 226, 0.25);
  }
`;

const textFlicker = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px rgba(255, 255, 255, 0.8),
      0 0 10px rgba(255, 20, 147, 0.6),
      0 0 15px rgba(255, 20, 147, 0.4);
  }
  50% {
    text-shadow: 
      0 0 8px rgba(255, 255, 255, 1),
      0 0 16px rgba(153, 50, 204, 0.8),
      0 0 24px rgba(153, 50, 204, 0.6);
  }
`;

const CyberInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    position: 'relative',
    background: `
      linear-gradient(135deg, 
        rgba(15, 15, 25, 0.95) 0%,
        rgba(25, 15, 35, 0.9) 50%,
        rgba(15, 15, 25, 0.95) 100%
      )
    `,
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: `${cyberGlow} 3s ease-in-out infinite`,
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      right: '-1px',
      bottom: '-1px',
      background: `
        linear-gradient(45deg,
          rgba(255, 20, 147, 0.6) 0%,
          rgba(153, 50, 204, 0.6) 25%,
          rgba(138, 43, 226, 0.6) 50%,
          rgba(186, 85, 211, 0.6) 75%,
          rgba(255, 20, 147, 0.6) 100%
        )
      `,
      borderRadius: '21px',
      zIndex: -1,
      animation: `${dataScan} 4s linear infinite`,
    },
    
    '& fieldset': {
      border: '2px solid rgba(255, 20, 147, 0.4)',
      borderRadius: '20px',
      transition: 'all 0.4s ease',
    },
    
    '&:hover': {
      transform: 'translateY(-2px) scale(1.02)',
      
      '& fieldset': {
        border: '2px solid rgba(255, 20, 147, 0.7)',
        boxShadow: '0 0 30px rgba(255, 20, 147, 0.5)',
      }
    },
    
    '&.Mui-focused': {
      transform: 'translateY(-4px) scale(1.03)',
      boxShadow: `
        0 0 40px rgba(153, 50, 204, 0.7),
        inset 0 0 30px rgba(153, 50, 204, 0.15),
        0 10px 30px rgba(0, 0, 0, 0.3)
      `,
      
      '& fieldset': {
        border: '3px solid rgba(153, 50, 204, 0.9)',
        boxShadow: `
          0 0 50px rgba(153, 50, 204, 0.8),
          inset 0 0 20px rgba(153, 50, 204, 0.2)
        `,
      },
      
      '&::before': {
        background: `
          linear-gradient(45deg,
            rgba(255, 20, 147, 1) 0%,
            rgba(153, 50, 204, 1) 25%,
            rgba(138, 43, 226, 1) 50%,
            rgba(186, 85, 211, 1) 75%,
            rgba(255, 20, 147, 1) 100%
          )
        `,
      }
    },
    
    '& input': {
      color: theme.palette.common.white,
      fontSize: '1.1rem',
      fontWeight: 600,
      padding: '18px 20px',
      animation: `${textFlicker} 4s ease-in-out infinite`,
      
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)',
        opacity: 1,
        animation: `${textFlicker} 4s ease-in-out infinite`,
      }
    },
    
    '& textarea': {
      color: theme.palette.common.white,
      fontSize: '1.1rem',
      fontWeight: 600,
      animation: `${textFlicker} 4s ease-in-out infinite`,
      
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)',
        opacity: 1,
        animation: `${textFlicker} 4s ease-in-out infinite`,
      }
    }
  },
  
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 20, 147, 0.9)',
    fontWeight: 700,
    fontSize: '1rem',
    textShadow: '0 0 15px rgba(255, 20, 147, 0.6)',
    animation: `${textFlicker} 4s ease-in-out infinite`,
    
    '&.Mui-focused': {
      color: 'rgba(153, 50, 204, 1)',
      textShadow: '0 0 20px rgba(153, 50, 204, 0.9)',
      transform: 'translate(14px, -9px) scale(0.85)',
    }
  },
  
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginTop: '10px',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  }
}));

export default function EnhancedCyberInput(props: TextFieldProps) {
  return <CyberInput {...props} />;
}