import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Plane } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@mui/material/styles'
import { useSceneStore } from '../hooks/useSceneStore'

interface HoloPanelProps {
  position: [number, number, number]
  size: [number, number]
  panelId: string
  className?: string
  rotation?: [number, number, number]
  data?: Record<string, any>
  children?: React.ReactNode
}

export default function HoloPanel({ 
  position, 
  size, 
  panelId, 
  className = '',
  rotation = [0, 0, 0],
  data = {},
  children 
}: HoloPanelProps) {
  const theme = useTheme()
  const { quality, parallaxEnabled } = useSceneStore()
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Animate panel
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    
    // Subtle floating animation
    const floatY = Math.sin(time * 0.5) * 0.02
    meshRef.current.position.y = position[1] + floatY

    // Hover effect
    if (isHovered) {
      meshRef.current.scale.setScalar(1.02)
    } else {
      meshRef.current.scale.setScalar(1.0)
    }
  })

  // Handle mouse events for parallax
  const handlePointerMove = (event: any) => {
    if (!parallaxEnabled || !meshRef.current) return

    const rect = event.target.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    // Subtle tilt based on mouse position
    meshRef.current.rotation.x = y * 0.1
    meshRef.current.rotation.y = x * 0.1
  }

  const handlePointerLeave = () => {
    if (!meshRef.current) return
    
    setIsHovered(false)
    meshRef.current.rotation.x = 0
    meshRef.current.rotation.y = 0
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Holographic panel mesh */}
      <Plane
        ref={meshRef}
        args={size}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
      >
        <meshStandardMaterial
          color={theme.palette.primary.main}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          emissive={theme.palette.primary.main}
          emissiveIntensity={isHovered ? 0.2 : 0.05}
        />
      </Plane>

      {/* Holographic border effect */}
      <Plane
        args={[size[0] + 0.1, size[1] + 0.1]}
        position={[0, 0, -0.01]}
      >
        <meshStandardMaterial
          color={theme.palette.secondary.main}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          emissive={theme.palette.secondary.main}
          emissiveIntensity={0.1}
        />
      </Plane>

      {/* DOM content portal */}
      <Html
        transform
        occlude
        distanceFactor={size[0]}
        position={[0, 0, 0.01]}
        style={{
          width: `${size[0] * 100}px`,
          height: `${size[1] * 100}px`,
          background: 'transparent',
          border: 'none',
          outline: 'none',
        }}
        className={`holo-panel-content ${className}`}
        data-panel-id={panelId}
        {...data}
      >
        {children}
      </Html>

      {/* Glow effect */}
      {quality !== 'low' && (
        <Plane
          args={[size[0] + 0.2, size[1] + 0.2]}
          position={[0, 0, -0.02]}
        >
          <meshStandardMaterial
            color={theme.palette.primary.main}
            transparent
            opacity={isHovered ? 0.2 : 0.05}
            side={THREE.DoubleSide}
            emissive={theme.palette.primary.main}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
          />
        </Plane>
      )}
    </group>
  )
}
