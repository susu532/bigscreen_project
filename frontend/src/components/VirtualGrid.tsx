import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const gridPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
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

const dataFlow = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
`;

const GridContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 0,
  overflow: 'hidden',
}));

const GridLines = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `
    linear-gradient(rgba(255, 20, 147, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 20, 147, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(153, 50, 204, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(153, 50, 204, 0.05) 1px, transparent 1px)
  `,
  backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
  animation: `${gridPulse} 4s ease-in-out infinite`,
}));

const ScanLineElement = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
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
  animation: `${scanLine} 8s linear infinite`,
}));

const DataStream = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255, 20, 147, 0.05) 2px,
      rgba(255, 20, 147, 0.05) 4px
    )
  `,
  backgroundSize: '40px 40px',
  animation: `${dataFlow} 20s linear infinite`,
}));

export default function VirtualGrid() {
  return (
    <GridContainer>
      <GridLines />
      <DataStream />
      <ScanLineElement />
      <ScanLineElement sx={{ animationDelay: '4s' }} />
    </GridContainer>
  );
}