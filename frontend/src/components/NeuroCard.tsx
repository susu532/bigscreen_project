import { Paper } from '@mui/material';
import type { PaperProps } from '@mui/material/Paper';
import { styled, keyframes } from '@mui/material/styles';

const neuralPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 40px rgba(255, 20, 147, 0.4),
      0 0 80px rgba(153, 50, 204, 0.3),
      0 0 120px rgba(138, 43, 226, 0.2),
      inset 0 0 40px rgba(255, 20, 147, 0.1);
  }
  25% {
    box-shadow: 
      0 0 60px rgba(153, 50, 204, 0.6),
      0 0 120px rgba(138, 43, 226, 0.4),
      0 0 180px rgba(186, 85, 211, 0.3),
      inset 0 0 60px rgba(153, 50, 204, 0.15);
  }
  50% {
    box-shadow: 
      0 0 50px rgba(138, 43, 226, 0.5),
      0 0 100px rgba(186, 85, 211, 0.35),
      0 0 150px rgba(255, 20, 147, 0.25),
      inset 0 0 50px rgba(138, 43, 226, 0.12);
  }
  75% {
    box-shadow: 
      0 0 70px rgba(186, 85, 211, 0.7),
      0 0 140px rgba(255, 20, 147, 0.5),
      0 0 210px rgba(153, 50, 204, 0.35),
      inset 0 0 70px rgba(186, 85, 211, 0.18);
  }
`;

const synapseFlow = keyframes`
  0% {
    background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0%;
  }
  25% {
    background-position: 100% 0%, 0% 100%, 100% 100%, 0% 0%;
  }
  50% {
    background-position: 100% 100%, 0% 0%, 100% 0%, 0% 100%;
  }
  75% {
    background-position: 0% 100%, 100% 0%, 0% 0%, 100% 100%;
  }
  100% {
    background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0%;
  }
`;

const quantumFlicker = keyframes`
  0%, 100% {
    opacity: 1;
    filter: hue-rotate(0deg) saturate(1);
  }
  2% {
    opacity: 0.95;
    filter: hue-rotate(90deg) saturate(1.2);
  }
  4% {
    opacity: 1;
    filter: hue-rotate(0deg) saturate(1);
  }
  96% {
    opacity: 1;
    filter: hue-rotate(0deg) saturate(1);
  }
  98% {
    opacity: 0.9;
    filter: hue-rotate(180deg) saturate(1.5);
  }
`;

const dimensionalWarp = keyframes`
  0%, 100% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1);
  }
  20% {
    transform: perspective(1000px) rotateX(3deg) rotateY(2deg) translateZ(15px) scale(1.01);
  }
  40% {
    transform: perspective(1000px) rotateX(-2deg) rotateY(-3deg) translateZ(8px) scale(0.99);
  }
  60% {
    transform: perspective(1000px) rotateX(4deg) rotateY(3deg) translateZ(20px) scale(1.02);
  }
  80% {
    transform: perspective(1000px) rotateX(-1deg) rotateY(-2deg) translateZ(5px) scale(1.01);
  }
`;

const NeuroCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: `
    linear-gradient(135deg, 
      rgba(15, 15, 25, 0.98) 0%,
      rgba(25, 15, 35, 0.95) 25%,
      rgba(20, 10, 30, 0.97) 50%,
      rgba(30, 20, 40, 0.94) 75%,
      rgba(15, 15, 25, 0.98) 100%
    )
  `,
  backdropFilter: 'blur(30px)',
  border: '2px solid transparent',
  borderRadius: '30px',
  padding: theme.spacing(4),
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `
    ${neuralPulse} 6s ease-in-out infinite,
    ${quantumFlicker} 10s ease-in-out infinite,
    ${dimensionalWarp} 15s ease-in-out infinite
  `,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-3px',
    left: '-3px',
    right: '-3px',
    bottom: '-3px',
    background: `
      linear-gradient(45deg,
        rgba(255, 20, 147, 0.8) 0%,
        rgba(153, 50, 204, 0.8) 12.5%,
        rgba(138, 43, 226, 0.8) 25%,
        rgba(186, 85, 211, 0.8) 37.5%,
        rgba(255, 20, 147, 0.8) 50%,
        rgba(153, 50, 204, 0.8) 62.5%,
        rgba(138, 43, 226, 0.8) 75%,
        rgba(186, 85, 211, 0.8) 87.5%,
        rgba(255, 20, 147, 0.8) 100%
      ),
      linear-gradient(135deg,
        rgba(255, 20, 147, 0.6) 0%,
        rgba(153, 50, 204, 0.6) 25%,
        rgba(138, 43, 226, 0.6) 50%,
        rgba(186, 85, 211, 0.6) 75%,
        rgba(255, 20, 147, 0.6) 100%
      )
    `,
    backgroundSize: '400% 400%, 200% 200%',
    borderRadius: '33px',
    zIndex: -1,
    animation: `${synapseFlow} 8s linear infinite`,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(255, 20, 147, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(153, 50, 204, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 60% 40%, rgba(138, 43, 226, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 40% 80%, rgba(186, 85, 211, 0.08) 0%, transparent 40%),
      linear-gradient(45deg, 
        transparent 30%,
        rgba(255, 255, 255, 0.03) 50%,
        transparent 70%
      )
    `,
    borderRadius: '30px',
    pointerEvents: 'none',
    animation: `${dimensionalWarp} 20s ease-in-out infinite`,
  },
  
  '&:hover': {
    transform: 'perspective(1000px) rotateX(8deg) rotateY(8deg) translateZ(40px) scale(1.03)',
    boxShadow: `
      0 40px 80px rgba(255, 20, 147, 0.5),
      0 0 120px rgba(153, 50, 204, 0.4),
      0 0 160px rgba(138, 43, 226, 0.3),
      0 0 200px rgba(186, 85, 211, 0.2),
      inset 0 0 60px rgba(255, 20, 147, 0.2)
    `,
    
    '&::before': {
      background: `
        linear-gradient(45deg,
          rgba(255, 20, 147, 1) 0%,
          rgba(153, 50, 204, 1) 12.5%,
          rgba(138, 43, 226, 1) 25%,
          rgba(186, 85, 211, 1) 37.5%,
          rgba(255, 20, 147, 1) 50%,
          rgba(153, 50, 204, 1) 62.5%,
          rgba(138, 43, 226, 1) 75%,
          rgba(186, 85, 211, 1) 87.5%,
          rgba(255, 20, 147, 1) 100%
        )
      `,
      animationDuration: '2s',
    },
    
    '&::after': {
      background: `
        radial-gradient(circle at 20% 20%, rgba(255, 20, 147, 0.25) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(153, 50, 204, 0.22) 0%, transparent 50%),
        radial-gradient(circle at 60% 40%, rgba(138, 43, 226, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(186, 85, 211, 0.18) 0%, transparent 50%),
        linear-gradient(45deg, 
          transparent 20%,
          rgba(255, 255, 255, 0.08) 50%,
          transparent 80%
        )
      `,
    }
  }
}));

export default function NeuroCard(props: PaperProps) {
  return <NeuroCard elevation={0} {...props} />;
}