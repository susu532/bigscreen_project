import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const morphGradient = keyframes`
  0%, 100% {
    background: radial-gradient(circle at 20% 30%, 
      rgba(255, 20, 147, 0.15) 0%, 
      transparent 50%),
    radial-gradient(circle at 80% 70%, 
      rgba(153, 50, 204, 0.12) 0%, 
      transparent 50%),
    radial-gradient(circle at 40% 80%, 
      rgba(138, 43, 226, 0.1) 0%, 
      transparent 50%);
  }
  25% {
    background: radial-gradient(circle at 60% 20%, 
      rgba(153, 50, 204, 0.18) 0%, 
      transparent 50%),
    radial-gradient(circle at 30% 90%, 
      rgba(138, 43, 226, 0.15) 0%, 
      transparent 50%),
    radial-gradient(circle at 90% 40%, 
      rgba(186, 85, 211, 0.12) 0%, 
      transparent 50%);
  }
  50% {
    background: radial-gradient(circle at 70% 60%, 
      rgba(138, 43, 226, 0.2) 0%, 
      transparent 50%),
    radial-gradient(circle at 10% 30%, 
      rgba(186, 85, 211, 0.17) 0%, 
      transparent 50%),
    radial-gradient(circle at 50% 10%, 
      rgba(255, 20, 147, 0.14) 0%, 
      transparent 50%);
  }
  75% {
    background: radial-gradient(circle at 30% 70%, 
      rgba(186, 85, 211, 0.16) 0%, 
      transparent 50%),
    radial-gradient(circle at 80% 20%, 
      rgba(255, 20, 147, 0.19) 0%, 
      transparent 50%),
    radial-gradient(circle at 60% 90%, 
      rgba(153, 50, 204, 0.13) 0%, 
      transparent 50%);
  }
`;

const floatingOrbs = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -20px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 40px) scale(0.9);
  }
  75% {
    transform: translate(40px, 20px) scale(1.05);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.3;
    filter: blur(20px);
  }
  50% {
    opacity: 0.6;
    filter: blur(30px);
  }
`;

const MorphingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: -1,
  overflow: 'hidden',
  animation: `${morphGradient} 20s ease-in-out infinite`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `
      conic-gradient(from 0deg at 50% 50%, 
        rgba(255, 20, 147, 0.1) 0deg,
        rgba(153, 50, 204, 0.08) 60deg,
        rgba(138, 43, 226, 0.06) 120deg,
        rgba(186, 85, 211, 0.08) 180deg,
        rgba(255, 20, 147, 0.1) 240deg,
        rgba(153, 50, 204, 0.08) 300deg,
        rgba(255, 20, 147, 0.1) 360deg
      )
    `,
    animation: `${floatingOrbs} 30s linear infinite, ${pulseGlow} 8s ease-in-out infinite`,
    borderRadius: '50%',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '20%',
    right: '10%',
    width: '300px',
    height: '300px',
    background: `radial-gradient(circle, 
      rgba(255, 20, 147, 0.15) 0%, 
      rgba(153, 50, 204, 0.1) 40%, 
      transparent 70%
    )`,
    borderRadius: '50%',
    animation: `${floatingOrbs} 25s ease-in-out infinite reverse, ${pulseGlow} 6s ease-in-out infinite`,
    filter: 'blur(40px)',
  }
}));

const FloatingOrb = styled(Box)<{ 
  size: number; 
  delay: number; 
  duration: number;
  left: number;
  top: number;
  color: string;
}>(({ size, delay, duration, left, top, color }) => ({
  position: 'absolute',
  width: `${size}px`,
  height: `${size}px`,
  left: `${left}%`,
  top: `${top}%`,
  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
  borderRadius: '50%',
  animation: `
    ${floatingOrbs} ${duration}s ease-in-out infinite ${delay}s,
    ${pulseGlow} ${duration * 0.6}s ease-in-out infinite ${delay * 0.5}s
  `,
  filter: 'blur(15px)',
}));

export default function MorphingBackground() {
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: 100 + Math.random() * 200,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    left: Math.random() * 100,
    top: Math.random() * 100,
    color: [
      'rgba(255, 20, 147, 0.12)',
      'rgba(153, 50, 204, 0.1)',
      'rgba(138, 43, 226, 0.08)',
      'rgba(186, 85, 211, 0.1)',
    ][Math.floor(Math.random() * 4)],
  }));

  return (
    <MorphingContainer>
      {orbs.map((orb) => (
        <FloatingOrb
          key={orb.id}
          size={orb.size}
          delay={orb.delay}
          duration={orb.duration}
          left={orb.left}
          top={orb.top}
          color={orb.color}
        />
      ))}
    </MorphingContainer>
  );
}