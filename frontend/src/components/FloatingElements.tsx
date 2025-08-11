import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const float3D = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotateX(0deg) rotateY(0deg) scale(1);
  }
  25% {
    transform: translateY(-30px) translateX(20px) rotateX(15deg) rotateY(15deg) scale(1.1);
  }
  50% {
    transform: translateY(-15px) translateX(-25px) rotateX(-10deg) rotateY(25deg) scale(0.9);
  }
  75% {
    transform: translateY(-40px) translateX(10px) rotateX(20deg) rotateY(-15deg) scale(1.05);
  }
`;

const morphShape = keyframes`
  0%, 100% {
    border-radius: 50% 30% 70% 40%;
  }
  25% {
    border-radius: 30% 70% 40% 60%;
  }
  50% {
    border-radius: 70% 40% 60% 30%;
  }
  75% {
    border-radius: 40% 60% 30% 70%;
  }
`;

const holographicShift = keyframes`
  0%, 100% {
    background: linear-gradient(45deg, 
      rgba(255, 20, 147, 0.3) 0%,
      rgba(153, 50, 204, 0.3) 50%,
      rgba(138, 43, 226, 0.3) 100%);
  }
  33% {
    background: linear-gradient(45deg, 
      rgba(153, 50, 204, 0.3) 0%,
      rgba(138, 43, 226, 0.3) 50%,
      rgba(186, 85, 211, 0.3) 100%);
  }
  66% {
    background: linear-gradient(45deg, 
      rgba(138, 43, 226, 0.3) 0%,
      rgba(186, 85, 211, 0.3) 50%,
      rgba(255, 20, 147, 0.3) 100%);
  }
`;

const FloatingContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 0,
  overflow: 'hidden',
  perspective: '1000px',
}));

const FloatingElement = styled(Box)<{ 
  size: number; 
  delay: number; 
  duration: number;
  left: number;
  top: number;
}>(({ size, delay, duration, left, top }) => ({
  position: 'absolute',
  width: `${size}px`,
  height: `${size}px`,
  left: `${left}%`,
  top: `${top}%`,
  background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.2), rgba(153, 50, 204, 0.2))',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 20, 147, 0.3)',
  animation: `
    ${float3D} ${duration}s ease-in-out infinite ${delay}s,
    ${morphShape} ${duration * 0.7}s ease-in-out infinite ${delay * 0.5}s,
    ${holographicShift} ${duration * 1.2}s ease-in-out infinite ${delay * 0.3}s
  `,
  transformStyle: 'preserve-3d',
  boxShadow: `
    0 0 20px rgba(255, 20, 147, 0.4),
    inset 0 0 20px rgba(153, 50, 204, 0.2)
  `,
}));

export default function FloatingElements() {
  const elements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 40 + Math.random() * 80,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 8,
    left: Math.random() * 90,
    top: Math.random() * 90,
  }));

  return (
    <FloatingContainer>
      {elements.map((element) => (
        <FloatingElement
          key={element.id}
          size={element.size}
          delay={element.delay}
          duration={element.duration}
          left={element.left}
          top={element.top}
        />
      ))}
    </FloatingContainer>
  );
}