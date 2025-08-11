import { Box, Stack } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import QuantumTypography from './QuantumTypography';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const underlineSweep = keyframes`
  0% { transform: scaleX(0); opacity: 0.6; }
  50% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(0); opacity: 0.6; }
`;

const Subtitle = styled('div')(({ theme }) => ({
  display: 'inline-block',
  position: 'relative',
  color: theme.palette.text.secondary,
  letterSpacing: '0.5px',
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  opacity: 0.9,
  animation: `${shimmer} 4s ease-in-out infinite`,
  backgroundSize: '400% 400%',
  paddingBottom: 4,
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    borderRadius: 2,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transformOrigin: 'left center',
    animation: `${underlineSweep} 3s ease-in-out infinite`,
    filter: 'drop-shadow(0 0 6px rgba(255,20,147,0.7))',
  }
}));

type AnimatedTitleProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  variant?: 'h2' | 'h3' | 'h4' | 'h5';
};

export default function AnimatedTitle({ title, subtitle, align = 'left', variant = 'h4' }: AnimatedTitleProps) {
  return (
    <Box sx={{ textAlign: align, position: 'relative', mb: 2 }}>
      <QuantumTypography
        variant={variant}
        glow="rainbow"
        intensity="high"
        quantum
        sx={{ display: 'inline-block' }}
      >
        {title}
      </QuantumTypography>
      {subtitle && (
        <Stack spacing={0.5}>
          <Subtitle>{subtitle}</Subtitle>
        </Stack>
      )}
    </Box>
  );
}


