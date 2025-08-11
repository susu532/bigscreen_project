import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { useTheme } from '@mui/material/styles'
import { Box, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'

// Core components
import SceneManager from './SceneManager'
import Effects from './Effects'
import CameraRig from './CameraRig'


const CanvasContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 0,
  background: 'transparent',
  '& canvas': {
    outline: 'none',
  },
}))

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

const LoadingText = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.2rem',
  fontFamily: 'monospace',
  textShadow: `0 0 10px ${theme.palette.primary.main}`,
}))

function LoadingFallback() {
  return (
    <LoadingOverlay>
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{
          color: 'primary.main',
          filter: 'drop-shadow(0 0 10px rgba(255, 20, 147, 0.5))',
        }}
      />
      <LoadingText>Initializing Virtual Experience...</LoadingText>
    </LoadingOverlay>
  )
}

function SceneContent() {
  const theme = useTheme()
  
  return (
    <>
      <SceneManager />
      <Effects />
      <CameraRig />
      
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.3}
        color={theme.palette.primary.main}
      />
      <pointLight 
        position={[-10, -10, -5]} 
        intensity={0.2}
        color={theme.palette.secondary.main}
      />
      
      {/* Performance optimizations */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}

export default function VXRCanvas() {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Check WebGL availability
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setIsWebGLAvailable(!!gl)
  }, [])

  if (isWebGLAvailable === null) {
    return <LoadingFallback />
  }

  if (isWebGLAvailable === false) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        color: 'error.main',
        textAlign: 'center',
        p: 3
      }}>
        <div>
          <h2>WebGL Not Available</h2>
          <p>Your device or browser doesn't support WebGL, which is required for the 3D experience.</p>
          <p>Please try a different browser or device.</p>
        </div>
      </Box>
    )
  }

  return (
    <CanvasContainer>
      <Canvas
        ref={canvasRef}
        camera={{ 
          position: [0, 0, 5], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = 2 // ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2
          gl.outputColorSpace = 'srgb'
          
          // Enable shadow mapping
          gl.shadowMap.enabled = true
          gl.shadowMap.type = 1 // PCFSoftShadowMap
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
        <Preload all />
      </Canvas>
    </CanvasContainer>
  )
}
