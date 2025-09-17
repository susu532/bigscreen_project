import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { Box } from '@mui/material'
import { getOptimalAnimationSettings, optimizeTransform, cleanupOptimizations } from '../../utils/performance'

type Tilt3DProps = PropsWithChildren<{
  maxTiltDeg?: number
  scale?: number
  glare?: boolean
  shadow?: boolean
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}>

export default function Tilt3D({
  children,
  maxTiltDeg = 12,
  scale = 1.02,
  glare = true,
  shadow = true,
  className,
  style,
  disabled = false,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({})
  const animationFrameRef = useRef<number | null>(null)
  const isHoveringRef = useRef(false)
  
  // Get optimal settings based on device capabilities
  const optimalSettings = useMemo(() => getOptimalAnimationSettings(), [])
  
  // Override props with optimal settings if needed
  const effectiveMaxTiltDeg = optimalSettings.reduceMotion ? 0 : 
    (optimalSettings.maxTiltDegrees < maxTiltDeg ? optimalSettings.maxTiltDegrees : maxTiltDeg)
  const effectiveGlare = optimalSettings.enableGlare && glare
  const effectiveShadow = optimalSettings.enableShadows && shadow

  // Throttle updates using requestAnimationFrame
  const updateTransform = useCallback((rotateX: number, rotateY: number, glowX: number, glowY: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const newStyle: React.CSSProperties = {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }

      if (effectiveShadow) {
        const shadowX = (-rotateX / effectiveMaxTiltDeg) * 20
        const shadowY = (rotateY / effectiveMaxTiltDeg) * 20
        newStyle.boxShadow = `
          ${shadowX.toFixed(2)}px ${shadowY.toFixed(2)}px 40px rgba(255, 20, 147, 0.25),
          ${(shadowX / 2).toFixed(2)}px ${(shadowY / 2).toFixed(2)}px 80px rgba(153, 50, 204, 0.25)
        `
      }

      if (effectiveGlare) {
        newStyle.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.08), transparent 40%)`
        newStyle.backgroundBlendMode = 'screen'
      }

      setTransformStyle(newStyle)
      
      // Optimize transform for hardware acceleration
      if (ref.current) {
        optimizeTransform(ref.current, newStyle.transform || '')
      }
    })
  }, [effectiveMaxTiltDeg, scale, effectiveGlare, effectiveShadow])

  const handleMove = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    if (!ref.current || disabled || optimalSettings.reduceMotion) return
    
    isHoveringRef.current = true
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 2 - 1 // -1 to 1
    const py = (y / rect.height) * 2 - 1
    const rotateY = px * effectiveMaxTiltDeg
    const rotateX = -py * effectiveMaxTiltDeg

    const glowX = Math.round((px + 1) * 50)
    const glowY = Math.round((py + 1) * 50)

    updateTransform(rotateX, rotateY, glowX, glowY)
  }, [effectiveMaxTiltDeg, updateTransform, disabled, optimalSettings.reduceMotion])

  const reset = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    isHoveringRef.current = false
    setTransformStyle({ 
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: 'none',
      background: 'none',
      backgroundBlendMode: 'normal'
    })
    
    // Clean up performance optimizations
    if (ref.current) {
      cleanupOptimizations(ref.current)
    }
  }, [])

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (ref.current) {
        cleanupOptimizations(ref.current)
      }
    }
  }, [])

  const mergedStyle = useMemo(() => ({
    transition: isHoveringRef.current ? 'none' : `transform ${optimalSettings.animationDuration}s cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${optimalSettings.animationDuration}s cubic-bezier(0.4, 0, 0.2, 1), background ${optimalSettings.animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
    willChange: 'transform, box-shadow, background',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
    ...style,
    ...transformStyle,
  } as React.CSSProperties), [style, transformStyle, optimalSettings.animationDuration])

  return (
    <Box
      ref={ref}
      className={className}
      style={mergedStyle}
      onMouseMove={disabled ? undefined : handleMove}
      onMouseLeave={disabled ? undefined : reset}
    >
      {children}
    </Box>
  )
}