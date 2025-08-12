import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSpring } from '@react-spring/three'
import { useSceneStore } from '../hooks/useSceneStore'

export default function CameraRig() {
  const { camera } = useThree()
  const { cameraTarget, parallaxEnabled, focusedIndex } = useSceneStore()
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0, z: 5 })

  // Spring animation for smooth camera movement
  const [springs, api] = useSpring(() => ({
    position: [0, 0, 5],
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  }))

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!parallaxEnabled) return
      
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [parallaxEnabled])

  // Update camera target based on route
  useEffect(() => {
    targetRef.current = {
      x: cameraTarget[0],
      y: cameraTarget[1],
      z: cameraTarget[2] + 5 // Add some distance
    }
  }, [cameraTarget])

  // Nudge camera slightly when focused index changes (immersive nav)
  useEffect(() => {
    // Small horizontal offset to give a sense of movement
    const offsetX = (focusedIndex || 0) * 0.0001
    targetRef.current = {
      x: cameraTarget[0] + offsetX,
      y: cameraTarget[1],
      z: cameraTarget[2] + 5
    }
  }, [focusedIndex, cameraTarget])

  // Animate camera
  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Smooth camera movement to target
    const targetX = targetRef.current.x
    const targetY = targetRef.current.y
    const targetZ = targetRef.current.z

    // Add subtle floating motion
    const floatY = Math.sin(time * 0.5) * 0.1
    const floatX = Math.sin(time * 0.3) * 0.05

    // Parallax effect
    const parallaxX = mouseRef.current.x * 0.5
    const parallaxY = mouseRef.current.y * 0.3

    // Update spring target
    api.start({
      position: [
        targetX + floatX + (parallaxEnabled ? parallaxX : 0),
        targetY + floatY + (parallaxEnabled ? parallaxY : 0),
        targetZ
      ],
      rotation: [
        (parallaxEnabled ? mouseRef.current.y * 0.1 : 0),
        (parallaxEnabled ? mouseRef.current.x * 0.1 : 0),
        0
      ]
    })

    // Apply spring values to camera
    camera.position.set(
      springs.position.get()[0],
      springs.position.get()[1],
      springs.position.get()[2]
    )

    camera.rotation.set(
      springs.rotation.get()[0],
      springs.rotation.get()[1],
      springs.rotation.get()[2]
    )

    // Look at target
    camera.lookAt(targetX, targetY, targetZ - 5)
  })

  return null
}
