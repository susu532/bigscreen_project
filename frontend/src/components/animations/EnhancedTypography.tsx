import { Typography, TypographyProps } from '@mui/material';
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
      0 0 20px rgba(153, 50, 204, 1),
      0 0 40px rgba(153, 50, 204, 0.8),
      0 0 60px rgba(153, 50, 204, 0.6);
  }
`;

const typewriter = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: perspective(1000px) translateY(50px) translateZ(-100px) rotateX(30deg);
  }
  100% {
    opacity: 1;
    transform: perspective(1000px) translateY(0) translateZ(0) rotateX(0deg);
  }
`;

const holographicText = keyframes`
  0%, 100% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  25% {
    background-position: 100% 50%;
    filter: hue-rotate(90deg);
  }
  50% {
    background-position: 100% 100%;
    filter: hue-rotate(180deg);
  }
  75% {
    background-position: 0% 100%;
    filter: hue-rotate(270deg);
  }
`;

const StyledTypography = styled(Typography)<{
  animationType?: 'glow' | 'typewriter' | 'fadeInUp' | 'holographic' | 'none';
  delay?: number;
  duration?: number;
}>(({ theme, animationType = 'none', delay = 0, duration = 1 }) => ({
  position: 'relative',
  transformStyle: 'preserve-3d',
  
  ...(animationType === 'glow' && {
    animation: `${textGlow} ${duration * 2}s ease-in-out infinite ${delay}s`,
  }),
  
  ...(animationType === 'typewriter' && {
    overflow: 'hidden',
    borderRight: '3px solid',
    borderColor: theme.palette.primary.main,
    whiteSpace: 'nowrap',
    animation: `
      ${typewriter} ${duration * 2}s steps(40, end) ${delay}s both,
      ${textGlow} 1s ease-in-out infinite ${delay + duration * 2}s
    `,
  }),
  
  ...(animationType === 'fadeInUp' && {
    animation: `${fadeInUp} ${duration}s ease-out ${delay}s both`,
  }),
  
  ...(animationType === 'holographic' && {
    background: `linear-gradient(
      45deg,
      ${theme.palette.primary.main} 0%,
      ${theme.palette.secondary.main} 25%,
      ${theme.palette.primary.light} 50%,
      ${theme.palette.secondary.light} 75%,
      ${theme.palette.primary.main} 100%
    )`,
    backgroundSize: '400% 400%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    animation: `${holographicText} ${duration * 3}s ease-in-out infinite ${delay}s`,
    textShadow: 'none',
  }),
  
  '&:hover': {
    transform: 'perspective(1000px) translateZ(20px) rotateX(5deg)',
    textShadow: animationType !== 'holographic' ? `
      0 0 20px ${theme.palette.primary.main},
      0 0 40px ${theme.palette.secondary.main},
      0 10px 20px rgba(0, 0, 0, 0.3)
    ` : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }
}));

interface EnhancedTypographyProps extends TypographyProps {
  animationType?: 'glow' | 'typewriter' | 'fadeInUp' | 'holographic' | 'none';
  delay?: number;
  duration?: number;
}

export default function EnhancedTypography({ 
  children,
  animationType = 'none',
  delay = 0,
  duration = 1,
  ...props 
}: EnhancedTypographyProps) {
  return (
    <StyledTypography
      animationType={animationType}
      delay={delay}
      duration={duration}
      {...props}
    >
      {children}
    </StyledTypography>
  );
}