import { useCallback, useMemo, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

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

  const handleMove = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 2 - 1 // -1 to 1
    const py = (y / rect.height) * 2 - 1
    const rotateY = px * maxTiltDeg
    const rotateX = -py * maxTiltDeg

    const glowX = Math.round((px + 1) * 50)
    const glowY = Math.round((py + 1) * 50)

    const newStyle: React.CSSProperties = {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transformStyle: 'preserve-3d',
    }

    if (shadow) {
      const shadowX = (-px * 20).toFixed(2)
      const shadowY = (py * 20).toFixed(2)
      newStyle.boxShadow = `
        ${shadowX}px ${shadowY}px 40px rgba(255, 20, 147, 0.25),
        ${Number(shadowX) / 2}px ${Number(shadowY) / 2}px 80px rgba(153, 50, 204, 0.25)
      `
    }

    if (glare) {
      newStyle.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.08), transparent 40%)`
      newStyle.backgroundBlendMode = 'screen'
    }

    setTransformStyle(newStyle)
  }, [maxTiltDeg, scale, glare, shadow])

  const reset = useCallback(() => {
    setTransformStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)' })
  }, [])

  const mergedStyle = useMemo(() => ({
    transition: 'transform 0.25s ease, box-shadow 0.35s ease, background 0.35s ease',
    willChange: 'transform, box-shadow, background',
    ...style,
    ...transformStyle,
  } as React.CSSProperties), [style, transformStyle])

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


