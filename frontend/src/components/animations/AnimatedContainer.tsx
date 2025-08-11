import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import { styled, keyframes } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

const floatIn = keyframes`
  0% {
    opacity: 0;
    transform: perspective(1000px) translateY(100px) translateZ(-200px) rotateX(45deg);
  }
  100% {
    opacity: 1;
    transform: perspective(1000px) translateY(0) translateZ(0) rotateX(0deg);
  }
`;

const breathe = keyframes`
  0%, 100% {
    transform: perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg);
    box-shadow: 
      0 10px 40px rgba(255, 20, 147, 0.2),
      0 0 60px rgba(153, 50, 204, 0.15);
  }
  50% {
    transform: perspective(1000px) scale(1.02) rotateX(2deg) rotateY(1deg);
    box-shadow: 
      0 20px 60px rgba(255, 20, 147, 0.3),
      0 0 80px rgba(153, 50, 204, 0.25);
  }
`;

const shimmerEffect = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const StyledAnimatedContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'animationType' && prop !== 'delay' && prop !== 'duration'
})<{
  animationType?: 'float' | 'breathe' | 'shimmer' | 'none';
  delay?: number;
  duration?: number;
}>(({ theme, animationType = 'float', delay = 0, duration = 1 }) => ({
  position: 'relative',
  transformStyle: 'preserve-3d',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  
  ...(animationType === 'float' && {
    animation: `${floatIn} ${duration}s ease-out ${delay}s both`,
  }),
  
  ...(animationType === 'breathe' && {
    animation: `${breathe} ${duration * 3}s ease-in-out infinite ${delay}s`,
  }),
  
  ...(animationType === 'shimmer' && {
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      )`,
      animation: `${shimmerEffect} ${duration * 2}s ease-in-out infinite ${delay}s`,
      pointerEvents: 'none',
    }
  }),
  
  '&:hover': {
    transform: 'perspective(1000px) translateY(-8px) translateZ(20px) rotateX(5deg) scale(1.02)',
    boxShadow: `
      0 25px 50px rgba(255, 20, 147, 0.3),
      0 0 100px rgba(153, 50, 204, 0.2),
      inset 0 0 30px rgba(255, 20, 147, 0.1)
    `,
  }
}));

interface AnimatedContainerProps extends BoxProps {
  animationType?: 'float' | 'breathe' | 'shimmer' | 'none';
  delay?: number;
  duration?: number;
}

export default function AnimatedContainer({ 
  children, 
  animationType = 'float',
  delay = 0,
  duration = 1,
  ...props 
}: PropsWithChildren<AnimatedContainerProps>) {
  return (
    <StyledAnimatedContainer
      animationType={animationType}
      delay={delay}
      duration={duration}
      {...props}
    >
      {children}
    </StyledAnimatedContainer>
  );
}