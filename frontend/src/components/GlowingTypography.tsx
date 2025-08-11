import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';

const textGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 10px rgba(255, 20, 147, 0.8),
      0 0 20px rgba(255, 20, 147, 0.6),
      0 0 30px rgba(255, 20, 147, 0.4);
  }
  50% {
    text-shadow: 
      0 0 20px rgba(153, 50, 204, 0.9),
      0 0 40px rgba(153, 50, 204, 0.7),
      0 0 60px rgba(153, 50, 204, 0.5);
  }
`;

const hologramFlicker = keyframes`
  0%, 100% { opacity: 1; }
  98% { opacity: 1; }
  99% { opacity: 0.8; }
  99.5% { opacity: 1; }
`;

interface GlowingTypographyProps extends TypographyProps {
  glow?: 'primary' | 'secondary' | 'accent' | 'none';
  intensity?: 'low' | 'medium' | 'high';
}

const GlowingTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'glow' && prop !== 'intensity'
})<GlowingTypographyProps>(({ theme, glow = 'primary', intensity = 'medium' }) => {
  const getGlowColor = () => {
    switch (glow) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'accent':
        return '#00ffff';
      default:
        return 'transparent';
    }
  };

  const getIntensity = () => {
    switch (intensity) {
      case 'low':
        return '0.4';
      case 'high':
        return '1';
      default:
        return '0.7';
    }
  };

  const glowColor = getGlowColor();
  const intensityValue = getIntensity();

  return {
    background: glow !== 'none' ? `linear-gradient(135deg, 
      ${theme.palette.common.white} 0%,
      ${glowColor} 50%,
      ${theme.palette.common.white} 100%
    )` : 'none',
    backgroundClip: glow !== 'none' ? 'text' : 'unset',
    WebkitBackgroundClip: glow !== 'none' ? 'text' : 'unset',
    WebkitTextFillColor: glow !== 'none' ? 'transparent' : 'inherit',
    textShadow: glow !== 'none' ? `
      0 0 10px ${glowColor}${Math.round(parseFloat(intensityValue) * 128).toString(16).padStart(2, '0')},
      0 0 20px ${glowColor}${Math.round(parseFloat(intensityValue) * 96).toString(16).padStart(2, '0')},
      0 0 30px ${glowColor}${Math.round(parseFloat(intensityValue) * 64).toString(16).padStart(2, '0')}
    ` : 'none',
    animation: glow !== 'none' ? `${textGlow} 3s ease-in-out infinite, ${hologramFlicker} 5s ease-in-out infinite` : 'none',
    transition: 'all 0.3s ease',
    
    '&:hover': {
      transform: glow !== 'none' ? 'scale(1.05)' : 'none',
      textShadow: glow !== 'none' ? `
        0 0 15px ${glowColor}${Math.round(parseFloat(intensityValue) * 160).toString(16).padStart(2, '0')},
        0 0 30px ${glowColor}${Math.round(parseFloat(intensityValue) * 128).toString(16).padStart(2, '0')},
        0 0 45px ${glowColor}${Math.round(parseFloat(intensityValue) * 96).toString(16).padStart(2, '0')}
      ` : 'none',
    }
  };
});

export default function EnhancedGlowingTypography(props: GlowingTypographyProps) {
  return <GlowingTypography {...props} />;
}