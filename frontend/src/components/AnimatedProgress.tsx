import { LinearProgress, Box } from '@mui/material';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import { styled, keyframes } from '@mui/material/styles';

const progressGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 10px rgba(255, 20, 147, 0.6),
      0 0 20px rgba(255, 20, 147, 0.4);
  }
  50% {
    box-shadow: 
      0 0 20px rgba(153, 50, 204, 0.8),
      0 0 40px rgba(153, 50, 204, 0.6);
  }
`;

const energyFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const AnimatedProgress = styled(LinearProgress)(({ theme }) => ({
  height: '12px',
  borderRadius: '999px',
  backgroundColor: 'rgba(255, 20, 147, 0.1)',
  overflow: 'hidden',
  position: 'relative',
  animation: `${progressGlow} 2.4s ease-in-out infinite`,

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '999px',
    backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 12px)',
    pointerEvents: 'none',
    mixBlendMode: 'overlay',
  },

  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg,
      ${theme.palette.primary.main} 0%,
      ${theme.palette.secondary.main} 50%,
      ${theme.palette.primary.light} 100%
    )`,
    backgroundSize: '200% 100%',
    animation: `${energyFlow} 2s linear infinite`,
    borderRadius: '999px',
    position: 'relative',
    filter: 'drop-shadow(0 0 12px rgba(255,20,147,0.5)) drop-shadow(0 0 20px rgba(153,50,204,0.35))',
    
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
      animation: `${energyFlow} 1.5s linear infinite`,
    }
  },

  '&.MuiLinearProgress-determinate': {
    '& .MuiLinearProgress-bar': {
      transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }
}));

interface AnimatedProgressProps extends LinearProgressProps {
  showPercentage?: boolean;
}

export default function EnhancedAnimatedProgress({ 
  showPercentage = true, 
  value, 
  ...props 
}: AnimatedProgressProps) {
  const pct = typeof value === 'number' ? Math.max(0, Math.min(100, value)) : 0;

  return (
    <Box sx={{ position: 'relative', width: '100%', py: 1 }}>
      <AnimatedProgress 
        variant={value !== undefined ? 'determinate' : 'indeterminate'}
        value={value}
        {...props} 
      />

      {value !== undefined && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: '50%',
            left: `calc(${pct}% - 8px)`,
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 40%, transparent 70%)',
            boxShadow: '0 0 20px rgba(255,20,147,0.8), 0 0 40px rgba(153,50,204,0.6)',
            pointerEvents: 'none',
            transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      )}

      {showPercentage && value !== undefined && (
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: '-26px',
            px: 1,
            py: '2px',
            borderRadius: '10px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'primary.contrastText',
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: '0 0 12px rgba(255,20,147,0.5)',
          }}
        >
          {Math.round(pct)}%
        </Box>
      )}
    </Box>
  );
}