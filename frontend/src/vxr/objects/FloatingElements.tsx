import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@mui/material/styles'
import { useSceneStore } from '../hooks/useSceneStore'

export default function FloatingElements() {
  const theme = useTheme()
  const { quality } = useSceneStore()
  const elementsRef = useRef<THREE.Group>(null)

  // Create floating elements
  const elements = useMemo(() => {
    const count = quality === 'high' ? 8 : quality === 'medium' ? 5 : 3
    const elements = []

    for (let i = 0; i < count; i++) {
      const type = Math.floor(Math.random() * 3) // 0: box, 1: sphere, 2: torus
      const position = [
        (Math.random() - 0.5) * 40,
        Math.random() * 20 + 10,
        (Math.random() - 0.5) * 40
      ]
      const rotation = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ]
      const scale = Math.random() * 0.5 + 0.5
      const speed = Math.random() * 0.5 + 0.5

      elements.push({
        type,
        position,
        rotation,
        scale,
        speed,
        id: i
      })
    }

    return elements
  }, [quality])

  // Animate floating elements
  useFrame((state) => {
    if (!elementsRef.current) return

    const time = state.clock.elapsedTime

    elementsRef.current.children.forEach((child, index) => {
      const element = elements[index]
      if (!element) return

      // Floating motion
      child.position.y = element.position[1] + Math.sin(time * element.speed + index) * 2

      // Rotation
      child.rotation.x = element.rotation[0] + time * 0.2 * element.speed
      child.rotation.y = element.rotation[1] + time * 0.3 * element.speed
      child.rotation.z = element.rotation[2] + time * 0.1 * element.speed

      // Subtle scale pulsing
      const pulse = Math.sin(time * element.speed * 2) * 0.1 + 1
      child.scale.setScalar(element.scale * pulse)
    })
  })

  return (
    <group ref={elementsRef}>
      {elements.map((element) => (
        <group
          key={element.id}
          position={element.position as [number, number, number]}
          rotation={element.rotation as [number, number, number]}
          scale={element.scale}
        >
          {element.type === 0 && (
            <Box args={[1, 1, 1]}>
              <meshStandardMaterial
                color={theme.palette.primary.main}
                transparent
                opacity={0.3}
                emissive={theme.palette.primary.main}
                emissiveIntensity={0.1}
                wireframe
              />
            </Box>
          )}
          
          {element.type === 1 && (
            <Sphere args={[0.5, 8, 6]}>
              <meshStandardMaterial
                color={theme.palette.secondary.main}
                transparent
                opacity={0.2}
                emissive={theme.palette.secondary.main}
                emissiveIntensity={0.1}
                wireframe
              />
            </Sphere>
          )}
          
          {element.type === 2 && (
            <Torus args={[0.5, 0.2, 8, 16]}>
              <meshStandardMaterial
                color={theme.palette.primary.main}
                transparent
                opacity={0.25}
                emissive={theme.palette.primary.main}
                emissiveIntensity={0.1}
                wireframe
              />
            </Torus>
          )}
        </group>
      ))}
    </group>
  )
}
