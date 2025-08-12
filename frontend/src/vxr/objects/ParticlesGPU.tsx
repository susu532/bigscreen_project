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
  const pointsRef = useRef<THREE.Points>(null)
  const positionsRef = useRef<Float32Array>()
  const velocitiesRef = useRef<Float32Array>()
  const colorsRef = useRef<Float32Array>()

  // Initialize particle data
  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      velocities[i * 3] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1

      const colorMix = Math.random()
      const primaryColor = new THREE.Color(theme.palette.primary.main)
      const secondaryColor = new THREE.Color(theme.palette.secondary.main)
      const color = primaryColor.clone().lerp(secondaryColor, colorMix)

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    positionsRef.current = positions
    velocitiesRef.current = velocities
    colorsRef.current = colors

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      size: quality === 'high' ? 0.08 : quality === 'medium' ? 0.12 : 0.18,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })

    return { geometry: geo, material: mat }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, theme.palette.primary.main, theme.palette.secondary.main, quality])

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current || !positionsRef.current || !velocitiesRef.current) return

    const positions = positionsRef.current
    const velocities = velocitiesRef.current
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3]
      positions[i * 3 + 1] += velocities[i * 3 + 1]
      positions[i * 3 + 2] += velocities[i * 3 + 2]

      const distance = Math.sqrt(
        positions[i * 3] ** 2 +
        positions[i * 3 + 1] ** 2 +
        positions[i * 3 + 2] ** 2
      )

      if (distance > 100) {
        const scale = 50 / distance
        positions[i * 3] *= scale
        positions[i * 3 + 1] *= scale
        positions[i * 3 + 2] *= scale
      }

      positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.01
    }

    const attr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
    attr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  )
}
