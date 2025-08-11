import { Paper } from '@mui/material';
import type { PaperProps } from '@mui/material/Paper';
import { styled, keyframes } from '@mui/material/styles';

const borderGlow = keyframes`
  0%, 100% {
    border-color: rgba(255, 20, 147, 0.5);
    box-shadow: 
      0 0 20px rgba(255, 20, 147, 0.3),
      inset 0 0 20px rgba(255, 20, 147, 0.1);
  }
  50% {
    border-color: rgba(153, 50, 204, 0.8);
    box-shadow: 
      0 0 30px rgba(153, 50, 204, 0.5),
      inset 0 0 30px rgba(153, 50, 204, 0.15);
  }
`;

const holographicShine = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const NeonCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: `
    linear-gradient(135deg, 
      rgba(20, 20, 30, 0.9) 0%,
      rgba(30, 20, 40, 0.8) 50%,
      rgba(20, 20, 30, 0.9) 100%
    )
  `,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 20, 147, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${borderGlow} 4s ease-in-out infinite`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 20, 147, 0.1),
        rgba(153, 50, 204, 0.1),
        transparent
      )
    `,
    transform: 'translateX(-100%)',
    transition: 'transform 1s ease',
    pointerEvents: 'none',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: `
      linear-gradient(
        45deg,
        rgba(255, 20, 147, 0.2),
        rgba(153, 50, 204, 0.2),
        rgba(138, 43, 226, 0.2),
        rgba(106, 13, 173, 0.2)
      )
    `,
    borderRadius: '22px',
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `
      0 20px 40px rgba(255, 20, 147, 0.3),
      0 0 60px rgba(153, 50, 204, 0.2),
      inset 0 0 30px rgba(255, 20, 147, 0.1)
    `,
    
    '&::before': {
      transform: 'translateX(100%)',
      animation: `${holographicShine} 1s ease-out`,
    },
    
    '&::after': {
      opacity: 1,
    }
  }
}));

export default function EnhancedNeonCard(props: PaperProps) {
  return <NeonCard elevation={0} {...props} />;
}