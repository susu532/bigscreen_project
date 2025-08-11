import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const floatParticle = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) translateX(-15px) rotate(180deg);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-30px) translateX(5px) rotate(270deg);
    opacity: 0.9;
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 10px rgba(255, 20, 147, 0.6),
      0 0 20px rgba(255, 20, 147, 0.4),
      0 0 30px rgba(255, 20, 147, 0.2);
  }
  50% {
    box-shadow: 
      0 0 20px rgba(153, 50, 204, 0.8),
      0 0 40px rgba(153, 50, 204, 0.6),
      0 0 60px rgba(153, 50, 204, 0.4);
  }
`;

const ParticleContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 0,
  overflow: 'hidden',
}));

const Particle = styled(Box)<{ delay: number; size: number; color: string }>(({ delay, size, color }) => ({
  position: 'absolute',
  width: `${size}px`,
  height: `${size}px`,
  background: `radial-gradient(circle, ${color}, transparent)`,
  borderRadius: '50%',
  animation: `${floatParticle} ${8 + Math.random() * 4}s ease-in-out infinite ${delay}s, ${pulseGlow} ${3 + Math.random() * 2}s ease-in-out infinite ${delay}s`,
}));

export default function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    size: 2 + Math.random() * 6,
    color: [
      'rgba(255, 20, 147, 0.8)',
      'rgba(153, 50, 204, 0.8)',
      'rgba(138, 43, 226, 0.8)',
      'rgba(186, 85, 211, 0.8)',
      'rgba(255, 105, 180, 0.8)'
    ][Math.floor(Math.random() * 5)]
  }));

  return (
    <ParticleContainer>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          delay={particle.delay}
          size={particle.size}
          color={particle.color}
          sx={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
        />
      ))}
    </ParticleContainer>
  );
}