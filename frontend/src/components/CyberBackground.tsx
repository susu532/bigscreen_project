import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import MorphingBackground from './animations/MorphingBackground';
import ParticleField from './ParticleField';
import FloatingElements from './FloatingElements';
import VirtualGrid from './VirtualGrid';

const cyberPulse = keyframes`
  0%, 100% {
    background: 
      radial-gradient(circle at 10% 20%, rgba(255, 20, 147, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(153, 50, 204, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.08) 0%, transparent 50%);
  }
  25% {
    background: 
      radial-gradient(circle at 30% 70%, rgba(153, 50, 204, 0.18) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(186, 85, 211, 0.12) 0%, transparent 50%);
  }
  50% {
    background: 
      radial-gradient(circle at 80% 60%, rgba(138, 43, 226, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 20% 40%, rgba(186, 85, 211, 0.17) 0%, transparent 50%),
      radial-gradient(circle at 60% 20%, rgba(255, 20, 147, 0.14) 0%, transparent 50%);
  }
  75% {
    background: 
      radial-gradient(circle at 40% 90%, rgba(186, 85, 211, 0.16) 0%, transparent 50%),
      radial-gradient(circle at 60% 10%, rgba(255, 20, 147, 0.19) 0%, transparent 50%),
      radial-gradient(circle at 90% 50%, rgba(153, 50, 204, 0.13) 0%, transparent 50%);
  }
`;

const matrixRain = keyframes`
  0% {
    transform: translateY(-100vh);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

const energyWave = keyframes`
  0% {
    transform: translateX(-100%) skewX(-15deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100vw) skewX(-15deg);
    opacity: 0;
  }
`;

const BackgroundContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -2,
  overflow: 'hidden',
  background: `
    linear-gradient(135deg, 
      #0a0a0a 0%, 
      #1a0a1a 25%, 
      #0f0a1f 50%, 
      #1a0f2a 75%, 
      #0a0a0a 100%
    )
  `,
}));

const CyberLayer = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  animation: `${cyberPulse} 25s ease-in-out infinite`,
  pointerEvents: 'none',
}));

const MatrixColumn = styled(Box)<{ 
  delay: number; 
  duration: number;
  left: number;
  fontSize: number;
}>(({ delay, duration, left, fontSize }) => ({
  position: 'absolute',
  left: `${left}%`,
  top: 0,
  width: '2px',
  height: '100vh',
  fontSize: `${fontSize}px`,
  color: 'rgba(255, 20, 147, 0.6)',
  fontFamily: 'monospace',
  fontWeight: 'bold',
  textShadow: '0 0 10px rgba(255, 20, 147, 0.8)',
  animation: `${matrixRain} ${duration}s linear infinite ${delay}s`,
  overflow: 'hidden',
  
  '&::before': {
    content: '"01010101010101010101010101010101010101010101"',
    position: 'absolute',
    top: 0,
    left: 0,
    whiteSpace: 'nowrap',
    transform: 'rotate(90deg)',
    transformOrigin: 'left top',
  }
}));

const EnergyWave = styled(Box)<{ delay: number }>(({ delay }) => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  width: '200px',
  height: '2px',
  background: `linear-gradient(90deg, 
    transparent 0%,
    rgba(255, 20, 147, 0.8) 20%,
    rgba(153, 50, 204, 1) 50%,
    rgba(255, 20, 147, 0.8) 80%,
    transparent 100%
  )`,
  boxShadow: `
    0 0 20px rgba(255, 20, 147, 0.8),
    0 0 40px rgba(153, 50, 204, 0.6)
  `,
  animation: `${energyWave} 8s linear infinite ${delay}s`,
}));

export default function CyberBackground() {
  const matrixColumns = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    left: (i / 30) * 100,
    fontSize: 8 + Math.random() * 4,
  }));

  const energyWaves = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 2,
  }));

  return (
    <BackgroundContainer>
      <CyberLayer />
      <MorphingBackground />
      <VirtualGrid />
      
      {matrixColumns.map((column) => (
        <MatrixColumn
          key={column.id}
          delay={column.delay}
          duration={column.duration}
          left={column.left}
          fontSize={column.fontSize}
        />
      ))}
      
      {energyWaves.map((wave) => (
        <EnergyWave
          key={wave.id}
          delay={wave.delay}
        />
      ))}
      
      <ParticleField />
      <FloatingElements />
    </BackgroundContainer>
  );
}