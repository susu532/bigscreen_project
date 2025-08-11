import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@mui/material/styles'
import { useSceneStore } from '../hooks/useSceneStore'

// Custom shader for the grid
const gridVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const gridFragmentShader = `
  uniform float time;
  uniform vec3 primaryColor;
  uniform vec3 secondaryColor;
  uniform float intensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Create grid pattern
    float gridSize = 50.0;
    vec2 grid = fract(uv * gridSize);
    float lineWidth = 0.02;
    
    float gridX = step(1.0 - lineWidth, grid.x) + step(grid.x, lineWidth);
    float gridY = step(1.0 - lineWidth, grid.y) + step(grid.y, lineWidth);
    float gridLines = max(gridX, gridY);
    
    // Animate grid
    float pulse = sin(time * 0.5) * 0.5 + 0.5;
    float glow = sin(time + vPosition.x * 10.0 + vPosition.z * 10.0) * 0.5 + 0.5;
    
    // Color gradient
    vec3 color = mix(primaryColor, secondaryColor, glow);
    
    // Fade based on distance
    float distance = length(vPosition.xz);
    float fade = 1.0 - smoothstep(0.0, 50.0, distance);
    
    // Final color
    vec3 finalColor = color * gridLines * intensity * pulse * fade;
    
    gl_FragColor = vec4(finalColor, gridLines * fade * 0.3);
  }
`

export default function CyberGrid3D() {
  const theme = useTheme()
  const { quality } = useSceneStore()
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Shader uniforms
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    primaryColor: { value: new THREE.Color(theme.palette.primary.main) },
    secondaryColor: { value: new THREE.Color(theme.palette.secondary.main) },
    intensity: { value: quality === 'high' ? 1.0 : quality === 'medium' ? 0.7 : 0.4 },
  }), [theme.palette.primary.main, theme.palette.secondary.main, quality])

  // Animate the grid
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  // Grid lines for additional detail
  const gridLines = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = []
    const size = 50
    const spacing = 1

    // Vertical lines
    for (let i = -size; i <= size; i += spacing) {
      lines.push([
        new THREE.Vector3(i, 0, -size),
        new THREE.Vector3(i, 0, size)
      ])
    }

    // Horizontal lines
    for (let i = -size; i <= size; i += spacing) {
      lines.push([
        new THREE.Vector3(-size, 0, i),
        new THREE.Vector3(size, 0, i)
      ])
    }

    return lines
  }, [])

  return (
    <group>
      {/* Main grid plane */}
      <Plane
        ref={meshRef}
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
      >
        <shaderMaterial
          ref={materialRef}
          vertexShader={gridVertexShader}
          fragmentShader={gridFragmentShader}
          uniforms={uniforms}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Additional grid lines for depth */}
      {quality !== 'low' && (
        <group>
          {gridLines.map((line, index) => (
            <Line
              key={index}
              points={line}
              color={theme.palette.primary.main}
              lineWidth={0.5}
              transparent
              opacity={0.1}
            />
          ))}
        </group>
      )}

      {/* Wall grids for immersive effect */}
      <group>
        {/* Back wall */}
        <Plane
          args={[100, 50]}
          position={[0, 23, -50]}
          rotation={[0, 0, 0]}
        >
          <shaderMaterial
            vertexShader={gridVertexShader}
            fragmentShader={gridFragmentShader}
            uniforms={uniforms}
            transparent
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </Plane>

        {/* Side walls */}
        <Plane
          args={[100, 50]}
          position={[-50, 23, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <shaderMaterial
            vertexShader={gridVertexShader}
            fragmentShader={gridFragmentShader}
            uniforms={uniforms}
            transparent
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </Plane>

        <Plane
          args={[100, 50]}
          position={[50, 23, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <shaderMaterial
            vertexShader={gridVertexShader}
            fragmentShader={gridFragmentShader}
            uniforms={uniforms}
            transparent
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </Plane>
      </group>
    </group>
  )
}
