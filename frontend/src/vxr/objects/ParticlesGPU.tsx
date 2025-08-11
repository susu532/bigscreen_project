import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '@mui/material/styles'
import { useSceneStore } from '../hooks/useSceneStore'

interface ParticlesGPUProps {
  count?: number
}

export default function ParticlesGPU({ count = 500 }: ParticlesGPUProps) {
  const theme = useTheme()
  const { quality } = useSceneStore()
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null)

  // Create particle geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(3) // Single point
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  // Create particle material
  const material = useMemo(() => {
    return {
      color: theme.palette.primary.main,
      transparent: true,
      opacity: 0.6,
      size: quality === 'high' ? 0.1 : quality === 'medium' ? 0.15 : 0.2,
      sizeAttenuation: true,
    }
  }, [theme.palette.primary.main, quality])

  // Initialize particle positions and velocities
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Random positions in a large sphere
      const radius = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1

      // Random colors between primary and secondary
      const colorMix = Math.random()
      const primaryColor = new THREE.Color(theme.palette.primary.main)
      const secondaryColor = new THREE.Color(theme.palette.secondary.main)
      const color = primaryColor.clone().lerp(secondaryColor, colorMix)

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      // Random sizes
      sizes[i] = Math.random() * 0.5 + 0.5
    }

    return { positions, velocities, colors, sizes }
  }, [count, theme.palette.primary.main, theme.palette.secondary.main])

  // Animate particles
  useFrame((state) => {
    if (!instancedMeshRef.current) return

    const time = state.clock.elapsedTime
    const matrix = new THREE.Matrix4()

    for (let i = 0; i < count; i++) {
      // Update positions
      particles.positions[i * 3] += particles.velocities[i * 3]
      particles.positions[i * 3 + 1] += particles.velocities[i * 3 + 1]
      particles.positions[i * 3 + 2] += particles.velocities[i * 3 + 2]

      // Wrap around if too far
      const distance = Math.sqrt(
        particles.positions[i * 3] ** 2 +
        particles.positions[i * 3 + 1] ** 2 +
        particles.positions[i * 3 + 2] ** 2
      )

      if (distance > 100) {
        const scale = 50 / distance
        particles.positions[i * 3] *= scale
        particles.positions[i * 3 + 1] *= scale
        particles.positions[i * 3 + 2] *= scale
      }

      // Add some wave motion
      particles.positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.01

      // Set matrix for this instance
      matrix.setPosition(
        particles.positions[i * 3],
        particles.positions[i * 3 + 1],
        particles.positions[i * 3 + 2]
      )

      // Scale based on size
      const scale = particles.sizes[i] * (1 + Math.sin(time + i) * 0.2)
      matrix.scale(new THREE.Vector3(scale, scale, scale))

      instancedMeshRef.current.setMatrixAt(i, matrix)
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[geometry, undefined, count]}
      frustumCulled={false}
    >
      <pointsMaterial
        color={material.color}
        transparent={material.transparent}
        opacity={material.opacity}
        size={material.size}
        sizeAttenuation={material.sizeAttenuation}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}
