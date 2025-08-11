import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const gridPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: perspective(1000px) rotateX(60deg) translateZ(0px);
  }
  50% {
    opacity: 0.6;
    transform: perspective(1000px) rotateX(60deg) translateZ(20px);
  }
`;

const scanLine = keyframes`
  0% {
    transform: translateY(-100vh);
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

const energyFlow = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
`;

const CyberGridContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: -2,
  overflow: 'hidden',
  perspective: '1000px',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 20, 147, 0.1) 1px, 
        transparent 1px, 
        transparent 100%
      ),
      linear-gradient(0deg, 
        transparent 0%, 
        rgba(153, 50, 204, 0.1) 1px, 
        transparent 1px, 
        transparent 100%
      )
    `,
    backgroundSize: '50px 50px',
    animation: `${gridPulse} 4s ease-in-out infinite`,
    transform: 'perspective(1000px) rotateX(60deg)',
    transformOrigin: 'center bottom',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: `linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 20, 147, 0.8) 20%,
      rgba(153, 50, 204, 1) 50%,
      rgba(138, 43, 226, 0.8) 80%,
      transparent 100%
    )`,
    boxShadow: `
      0 0 20px rgba(255, 20, 147, 0.8),
      0 0 40px rgba(153, 50, 204, 0.6)
    `,
    animation: `${scanLine} 8s linear infinite`,
  }
}));

const GridLine = styled(Box)<{ 
  isVertical: boolean;
  delay: number;
  position: number;
}>(({ theme, isVertical, delay, position }) => ({
  position: 'absolute',
  ...(isVertical ? {
    left: `${position}%`,
    top: 0,
    width: '1px',
    height: '100%',
  } : {
    top: `${position}%`,
    left: 0,
    width: '100%',
    height: '1px',
  }),
  background: `linear-gradient(
    ${isVertical ? '0deg' : '90deg'},
    transparent 0%,
    rgba(255, 20, 147, 0.4) 20%,
    rgba(153, 50, 204, 0.6) 50%,
    rgba(138, 43, 226, 0.4) 80%,
    transparent 100%
  )`,
  backgroundSize: isVertical ? '1px 200px' : '200px 1px',
  animation: `${energyFlow} ${3 + delay}s linear infinite ${delay}s`,
  filter: 'blur(0.5px)',
}));

const EnergyNode = styled(Box)<{
  x: number;
  y: number;
  delay: number;
}>(({ x, y, delay }) => ({
  position: 'absolute',
  left: `${x}%`,
  top: `${y}%`,
  width: '4px',
  height: '4px',
  background: 'radial-gradient(circle, rgba(255, 20, 147, 1) 0%, transparent 70%)',
  borderRadius: '50%',
  boxShadow: `
    0 0 10px rgba(255, 20, 147, 0.8),
    0 0 20px rgba(153, 50, 204, 0.6)
  `,
  animation: `${gridPulse} ${2 + delay}s ease-in-out infinite ${delay}s`,
}));

export default function CyberGrid() {
  const verticalLines = Array.from({ length: 20 }, (_, i) => ({
    id: `v-${i}`,
    position: (i + 1) * 5,
    delay: Math.random() * 2,
  }));

  const horizontalLines = Array.from({ length: 15 }, (_, i) => ({
    id: `h-${i}`,
    position: (i + 1) * 6.67,
    delay: Math.random() * 2,
  }));

  const energyNodes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  return (
    <CyberGridContainer>
      {verticalLines.map((line) => (
        <GridLine
          key={line.id}
          isVertical={true}
          position={line.position}
          delay={line.delay}
        />
      ))}
      {horizontalLines.map((line) => (
        <GridLine
          key={line.id}
          isVertical={false}
          position={line.position}
          delay={line.delay}
        />
      ))}
      {energyNodes.map((node) => (
        <EnergyNode
          key={node.id}
          x={node.x}
          y={node.y}
          delay={node.delay}
        />
      ))}
    </CyberGridContainer>
  );
}