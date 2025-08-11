import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const floatingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BackgroundContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  background: `
    radial-gradient(circle at 20% 80%, rgba(255, 20, 147, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(153, 50, 204, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(138, 43, 226, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, 
      rgba(10, 10, 10, 1) 0%,
      rgba(20, 10, 30, 0.95) 25%,
      rgba(30, 20, 50, 0.9) 50%,
      rgba(20, 10, 30, 0.95) 75%,
      rgba(10, 10, 10, 1) 100%
    )
  `,
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 15s ease infinite`,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(2px 2px at 20px 30px, rgba(255, 105, 180, 0.8), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(186, 85, 211, 0.6), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(147, 112, 219, 0.4), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255, 20, 147, 0.5), transparent),
      radial-gradient(2px 2px at 160px 30px, rgba(153, 50, 204, 0.7), transparent)
    `,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 100px',
    animation: `${floatingAnimation} 20s linear infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300px',
    height: '300px',
    transform: 'translate(-50%, -50%)',
    background: `radial-gradient(circle, rgba(255, 20, 147, 0.1) 0%, transparent 70%)`,
    animation: `${pulseGlow} 8s ease-in-out infinite`,
  }
}));

export default function FuturisticBackground() {
  return <BackgroundContainer />;
}