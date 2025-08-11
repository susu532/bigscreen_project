import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';

const quantumGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 10px rgba(255, 20, 147, 0.9),
      0 0 20px rgba(255, 20, 147, 0.7),
      0 0 30px rgba(255, 20, 147, 0.5),
      0 0 40px rgba(255, 20, 147, 0.3);
    filter: hue-rotate(0deg);
  }
  25% {
    text-shadow: 
      0 0 15px rgba(153, 50, 204, 1),
      0 0 30px rgba(153, 50, 204, 0.8),
      0 0 45px rgba(153, 50, 204, 0.6),
      0 0 60px rgba(153, 50, 204, 0.4);
    filter: hue-rotate(90deg);
  }
  50% {
    text-shadow: 
      0 0 12px rgba(138, 43, 226, 0.95),
      0 0 24px rgba(138, 43, 226, 0.75),
      0 0 36px rgba(138, 43, 226, 0.55),
      0 0 48px rgba(138, 43, 226, 0.35);
    filter: hue-rotate(180deg);
  }
  75% {
    text-shadow: 
      0 0 18px rgba(186, 85, 211, 1),
      0 0 36px rgba(186, 85, 211, 0.8),
      0 0 54px rgba(186, 85, 211, 0.6),
      0 0 72px rgba(186, 85, 211, 0.4);
    filter: hue-rotate(270deg);
  }
`;

const dimensionalFlicker = keyframes`
  0%, 100% { 
    opacity: 1; 
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  2% { 
    opacity: 0.9; 
    transform: perspective(1000px) rotateX(1deg) rotateY(1deg) translateZ(2px);
  }
  4% { 
    opacity: 1; 
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  96% { 
    opacity: 1; 
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  98% { 
    opacity: 0.95; 
    transform: perspective(1000px) rotateX(-1deg) rotateY(-1deg) translateZ(3px);
  }
`;

const energyPulse = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

interface QuantumTypographyProps extends TypographyProps {
  glow?: 'primary' | 'secondary' | 'accent' | 'rainbow' | 'none';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  quantum?: boolean;
}

const QuantumTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'glow' && prop !== 'intensity' && prop !== 'quantum'
})<QuantumTypographyProps>(({ theme, glow = 'primary', intensity = 'medium', quantum = false }) => {
  const getGlowColor = () => {
    switch (glow) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'accent':
        return '#00ffff';
      case 'rainbow':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  const getIntensity = () => {
    switch (intensity) {
      case 'low':
        return '0.5';
      case 'high':
        return '1.2';
      case 'extreme':
        return '1.8';
      default:
        return '0.8';
    }
  };

  const glowColor = getGlowColor();
  const intensityValue = getIntensity();

  return {
    position: 'relative',
    background: glow === 'rainbow' ? `
      linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%,
        ${theme.palette.secondary.main} 25%,
        ${theme.palette.primary.light} 50%,
        ${theme.palette.secondary.light} 75%,
        ${theme.palette.primary.main} 100%
      )
    ` : glow !== 'none' ? `
      linear-gradient(135deg, 
        ${theme.palette.common.white} 0%,
        ${glowColor} 50%,
        ${theme.palette.common.white} 100%
      )
    ` : 'none',
    backgroundSize: glow === 'rainbow' ? '400% 400%' : 'auto',
    backgroundClip: glow !== 'none' ? 'text' : 'unset',
    WebkitBackgroundClip: glow !== 'none' ? 'text' : 'unset',
    WebkitTextFillColor: glow !== 'none' ? 'transparent' : 'inherit',
    textShadow: glow !== 'none' && glow !== 'rainbow' ? `
      0 0 10px ${glowColor}${Math.round(parseFloat(intensityValue) * 128).toString(16).padStart(2, '0')},
      0 0 20px ${glowColor}${Math.round(parseFloat(intensityValue) * 96).toString(16).padStart(2, '0')},
      0 0 30px ${glowColor}${Math.round(parseFloat(intensityValue) * 64).toString(16).padStart(2, '0')},
      0 0 40px ${glowColor}${Math.round(parseFloat(intensityValue) * 32).toString(16).padStart(2, '0')}
    ` : 'none',
    transformStyle: quantum ? 'preserve-3d' : 'flat',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: glow === 'rainbow' ? `
      ${quantumGlow} 4s ease-in-out infinite,
      ${energyPulse} 6s ease-in-out infinite,
      ${quantum ? dimensionalFlicker : 'none'} 8s ease-in-out infinite
    ` : glow !== 'none' ? `
      ${quantum ? dimensionalFlicker : 'none'} 8s ease-in-out infinite
    ` : 'none',
    
    '&::before': quantum ? {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        linear-gradient(45deg,
          transparent 30%,
          rgba(255, 255, 255, 0.05) 50%,
          transparent 70%
        )
      `,
      pointerEvents: 'none',
      zIndex: -1,
    } : {},
    
    '&:hover': {
      transform: quantum ? 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(10px) scale(1.05)' : 
                 glow !== 'none' ? 'scale(1.05)' : 'none',
      textShadow: glow !== 'none' && glow !== 'rainbow' ? `
        0 0 15px ${glowColor}${Math.round(parseFloat(intensityValue) * 160).toString(16).padStart(2, '0')},
        0 0 30px ${glowColor}${Math.round(parseFloat(intensityValue) * 128).toString(16).padStart(2, '0')},
        0 0 45px ${glowColor}${Math.round(parseFloat(intensityValue) * 96).toString(16).padStart(2, '0')},
        0 0 60px ${glowColor}${Math.round(parseFloat(intensityValue) * 64).toString(16).padStart(2, '0')}
      ` : 'none',
    }
  };
});

export default function EnhancedQuantumTypography(props: QuantumTypographyProps) {
  return <QuantumTypography {...props} />;
}