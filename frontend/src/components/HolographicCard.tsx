import { Paper } from '@mui/material';
import type { PaperProps } from '@mui/material/Paper';
import { styled, keyframes } from '@mui/material/styles';

const hologramFlicker = keyframes`
  0%, 100% {
    opacity: 1;
    filter: hue-rotate(0deg);
  }
  2% {
    opacity: 0.9;
    filter: hue-rotate(90deg);
  }
  4% {
    opacity: 1;
    filter: hue-rotate(0deg);
  }
  96% {
    opacity: 1;
    filter: hue-rotate(0deg);
  }
  98% {
    opacity: 0.95;
    filter: hue-rotate(180deg);
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

const depthShift = keyframes`
  0%, 100% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  25% {
    transform: perspective(1000px) rotateX(2deg) rotateY(1deg) translateZ(10px);
  }
  50% {
    transform: perspective(1000px) rotateX(-1deg) rotateY(-2deg) translateZ(5px);
  }
  75% {
    transform: perspective(1000px) rotateX(1deg) rotateY(2deg) translateZ(15px);
  }
`;

const energyPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 30px rgba(255, 20, 147, 0.4),
      0 0 60px rgba(153, 50, 204, 0.3),
      inset 0 0 30px rgba(255, 20, 147, 0.1);
  }
  50% {
    box-shadow: 
      0 0 50px rgba(153, 50, 204, 0.6),
      0 0 100px rgba(138, 43, 226, 0.4),
      inset 0 0 50px rgba(153, 50, 204, 0.2);
  }
`;

const HolographicCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: `
    linear-gradient(135deg, 
      rgba(20, 20, 30, 0.95) 0%,
      rgba(30, 20, 40, 0.9) 25%,
      rgba(25, 15, 35, 0.92) 50%,
      rgba(30, 20, 40, 0.9) 75%,
      rgba(20, 20, 30, 0.95) 100%
    )
  `,
  backdropFilter: 'blur(25px)',
  border: '2px solid transparent',
  borderRadius: '25px',
  padding: theme.spacing(4),
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `
    ${hologramFlicker} 8s ease-in-out infinite,
    ${borderScan} 6s linear infinite,
    ${energyPulse} 4s ease-in-out infinite
  `,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: `
      linear-gradient(45deg,
        rgba(255, 20, 147, 0.8) 0%,
        rgba(153, 50, 204, 0.8) 25%,
        rgba(138, 43, 226, 0.8) 50%,
        rgba(186, 85, 211, 0.8) 75%,
        rgba(255, 20, 147, 0.8) 100%
      )
    `,
    borderRadius: '27px',
    zIndex: -1,
    animation: `${borderScan} 3s linear infinite`,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 30%, rgba(255, 20, 147, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(153, 50, 204, 0.1) 0%, transparent 50%),
      linear-gradient(45deg, 
        transparent 30%,
        rgba(255, 255, 255, 0.02) 50%,
        transparent 70%
      )
    `,
    borderRadius: '25px',
    pointerEvents: 'none',
    animation: `${depthShift} 10s ease-in-out infinite`,
  },
  
  '&:hover': {
    transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px) scale(1.02)',
    boxShadow: `
      0 25px 50px rgba(255, 20, 147, 0.4),
      0 0 80px rgba(153, 50, 204, 0.3),
      0 0 120px rgba(138, 43, 226, 0.2),
      inset 0 0 40px rgba(255, 20, 147, 0.15)
    `,
    
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
  }
}));

export default function EnhancedHolographicCard(props: PaperProps) {
  return <HolographicCard elevation={0} {...props} />;
}