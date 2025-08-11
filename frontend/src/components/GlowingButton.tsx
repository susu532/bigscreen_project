import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import { styled, keyframes } from '@mui/material/styles';

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 20, 147, 0.5),
      0 0 40px rgba(255, 20, 147, 0.3),
      0 0 60px rgba(255, 20, 147, 0.1),
      inset 0 0 20px rgba(255, 20, 147, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 20, 147, 0.8),
      0 0 60px rgba(255, 20, 147, 0.5),
      0 0 90px rgba(255, 20, 147, 0.3),
      inset 0 0 30px rgba(255, 20, 147, 0.2);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const GlowingButton = styled(Button)(({ theme, variant }) => ({
  position: 'relative',
  background: variant === 'contained' 
    ? `linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.secondary.main} 100%)`
    : 'transparent',
  border: variant === 'outlined' 
    ? `2px solid ${theme.palette.primary.main}` 
    : 'none',
  borderRadius: '25px',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  letterSpacing: '0.5px',
  color: theme.palette.common.white,
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${glowPulse} 3s ease-in-out infinite`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    )`,
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s',
  },
  
  '&:hover': {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: `
      0 0 40px rgba(255, 20, 147, 0.8),
      0 0 80px rgba(255, 20, 147, 0.5),
      0 0 120px rgba(255, 20, 147, 0.3),
      0 10px 30px rgba(0, 0, 0, 0.3)
    `,
    
    '&::before': {
      transform: 'translateX(100%)',
      animation: `${shimmer} 0.6s ease-out`,
    }
  },
  
  '&:active': {
    transform: 'translateY(0) scale(0.98)',
  },
  
  '&:disabled': {
    opacity: 0.5,
    animation: 'none',
    transform: 'none',
    boxShadow: 'none',
  }
}));

export default function EnhancedGlowingButton(props: ButtonProps) {
  return <GlowingButton {...props} />;
}