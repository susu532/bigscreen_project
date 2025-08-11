import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

const ParallaxBox = styled(Box, {
  shouldForwardProp: (prop) => !['parallaxSpeed','translateY','rotateX','rotateY'].includes(String(prop))
})<{ 
  parallaxSpeed: number;
  translateY: number;
  rotateX: number;
  rotateY: number;
}>(({ parallaxSpeed, translateY, rotateX, rotateY }) => ({
  transform: `
    perspective(1000px) 
    translateY(${translateY * parallaxSpeed}px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg)
    translateZ(${Math.abs(parallaxSpeed) * 10}px)
  `,
  transformStyle: 'preserve-3d',
  transition: 'transform 0.1s ease-out',
  willChange: 'transform',
}));

interface ParallaxContainerProps extends BoxProps {
  speed?: number;
  enableMouseParallax?: boolean;
  enable3D?: boolean;
}

export default function ParallaxContainer({ 
  children, 
  speed = 0.5,
  enableMouseParallax = true,
  enable3D = true,
  ...props 
}: PropsWithChildren<ParallaxContainerProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseParallax) return;
      
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (enableMouseParallax) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enableMouseParallax]);

  const rotateX = enable3D ? mousePosition.y * 5 : 0;
  const rotateY = enable3D ? mousePosition.x * 5 : 0;

  return (
    <ParallaxBox
      ref={containerRef}
      parallaxSpeed={speed}
      translateY={scrollY}
      rotateX={rotateX}
      rotateY={rotateY}
      {...props}
    >
      {children}
    </ParallaxBox>
  );
}