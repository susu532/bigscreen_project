import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import { styled, keyframes } from '@mui/material/styles';

const quantumFlux = keyframes`
  0%, 100% {
    background-position: 0% 50%;
    box-shadow: 
      0 0 30px rgba(255, 20, 147, 0.6),
      0 0 60px rgba(255, 20, 147, 0.4),
      0 0 90px rgba(255, 20, 147, 0.2),
      inset 0 0 30px rgba(255, 20, 147, 0.1);
  }
  25% {
    background-position: 100% 0%;
    box-shadow: 
      0 0 40px rgba(153, 50, 204, 0.8),
      0 0 80px rgba(153, 50, 204, 0.5),
      0 0 120px rgba(153, 50, 204, 0.3),
      inset 0 0 40px rgba(153, 50, 204, 0.15);
  }
  50% {
    background-position: 0% 100%;
    box-shadow: 
      0 0 35px rgba(138, 43, 226, 0.7),
      0 0 70px rgba(138, 43, 226, 0.45),
      0 0 105px rgba(138, 43, 226, 0.25),
      inset 0 0 35px rgba(138, 43, 226, 0.12);
  }
  75% {
    background-position: 100% 100%;
    box-shadow: 
      0 0 45px rgba(186, 85, 211, 0.9),
      0 0 90px rgba(186, 85, 211, 0.6),
      0 0 135px rgba(186, 85, 211, 0.35),
      inset 0 0 45px rgba(186, 85, 211, 0.18);
  }
`;

const energyRipple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const dimensionalShift = keyframes`
  0%, 100% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  50% {
    transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(10px);
  }
`;

const QuantumButton = styled(Button)(({ theme, variant }) => ({
  position: 'relative',
  background: variant === 'contained' 
    ? `linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.secondary.main} 25%,
        ${theme.palette.primary.light} 50%,
        ${theme.palette.secondary.light} 75%,
        ${theme.palette.primary.main} 100%)`
    : 'transparent',
  backgroundSize: '400% 400%',
  border: variant === 'outlined' 
    ? `3px solid ${theme.palette.primary.main}` 
    : 'none',
  borderRadius: '30px',
  padding: '16px 40px',
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  letterSpacing: '1px',
  color: theme.palette.common.white,
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${quantumFlux} 4s ease-in-out infinite, ${dimensionalShift} 6s ease-in-out infinite`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.6s ease',
    pointerEvents: 'none',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 70%
      )
    `,
    transform: 'translateX(-100%)',
    transition: 'transform 0.8s ease',
    pointerEvents: 'none',
  },
  
  '&:hover': {
    transform: 'perspective(1000px) rotateX(10deg) rotateY(10deg) translateZ(20px) scale(1.05)',
    boxShadow: `
      0 0 60px rgba(255, 20, 147, 0.8),
      0 0 120px rgba(153, 50, 204, 0.6),
      0 0 180px rgba(138, 43, 226, 0.4),
      0 20px 40px rgba(0, 0, 0, 0.3),
      inset 0 0 60px rgba(255, 20, 147, 0.2)
    `,
    
    '&::before': {
      width: '300px',
      height: '300px',
      animation: `${energyRipple} 0.6s ease-out`,
    },
    
    '&::after': {
      transform: 'translateX(100%)',
    }
  },
  
  '&:active': {
    transform: 'perspective(1000px) rotateX(15deg) rotateY(15deg) translateZ(5px) scale(0.98)',
    
    '&::before': {
      width: '400px',
      height: '400px',
      animation: `${energyRipple} 0.4s ease-out`,
    }
  },
  
  '&:disabled': {
    opacity: 0.5,
    animation: 'none',
    transform: 'none',
    boxShadow: 'none',
  }
}));

export default function EnhancedQuantumButton(props: ButtonProps) {
  return <QuantumButton {...props} />;
}