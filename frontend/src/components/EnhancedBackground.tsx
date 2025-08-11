import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FuturisticBackground from './FuturisticBackground';
import ParticleField from './ParticleField';
import FloatingElements from './FloatingElements';
import VirtualGrid from './VirtualGrid';

const BackgroundContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  overflow: 'hidden',
}));

export default function EnhancedBackground() {
  return (
    <BackgroundContainer>
      <FuturisticBackground />
      <VirtualGrid />
      <ParticleField />
      <FloatingElements />
    </BackgroundContainer>
  );
}