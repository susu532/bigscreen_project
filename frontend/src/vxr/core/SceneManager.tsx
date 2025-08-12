import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSceneStore, routePresets, qualityPresets } from '../hooks/useSceneStore'

// 3D Objects
import CyberGrid3D from '../objects/CyberGrid3D'
import ParticlesGPU from '../objects/ParticlesGPU'
import HoloPanel from '../objects/HoloPanel'
import SurveyPanel from '../ui/SurveyPanel'
import ResponsePanel from '../ui/ResponsePanel'
import AdminPanels from '../ui/AdminPanels'

// Background effects
import FloatingElements from '../objects/FloatingElements'

export default function SceneManager() {
  const location = useLocation()
  const { 
    currentRoute, 
    setCurrentRoute, 
    setScenePreset, 
    setCameraTarget,
    effects,
    quality 
  } = useSceneStore()

  // Update scene based on route changes
  useEffect(() => {
    const path = location.pathname
    setCurrentRoute(path)
    
    // Find matching preset
    const preset = routePresets[path as keyof typeof routePresets] || routePresets['/']
    
    setScenePreset(preset.scenePreset)
    setCameraTarget(preset.cameraTarget)
    
    // Update effects based on route
    Object.entries(preset.effects).forEach(([effect, enabled]) => {
      if (effects[effect as keyof typeof effects] !== enabled) {
        // Note: We'll handle effect toggling in the Effects component
      }
    })
  }, [location.pathname, setCurrentRoute, setScenePreset, setCameraTarget, effects])

  // Get current scene configuration
  const getSceneConfig = () => {
    const preset = routePresets[currentRoute as keyof typeof routePresets] || routePresets['/']
    return {
      ...preset,
      quality: qualityPresets[quality],
    }
  }

  const config = getSceneConfig()

  return (
    <>
      {/* Background Elements */}
      {effects.grid && <CyberGrid3D />}
      {effects.particles && <ParticlesGPU count={config.quality.particles} />}
      <FloatingElements />
      
      {/* Route-specific UI Panels */}
      {currentRoute === '/' && (
        <SurveyScene />
      )}
      
      {currentRoute.startsWith('/response') && (
        <ResponseScene />
      )}
      
      {(currentRoute === '/administration' || currentRoute.startsWith('/admin')) && (
        <AdminScene />
      )}
    </>
  )
}

// Survey Scene - Central panel with question cards in depth
function SurveyScene() {
  return (
    <>
        <HoloPanel 
          position={[0, 0, 0]} 
          size={[8, 5]} 
          panelId="survey-root"
          className="survey-root-panel"
      >
        <SurveyPanel />
      </HoloPanel>
    </>
  )
}

// Response Scene - Gallery of response cards
function ResponseScene() {
  return (
    <>
        <HoloPanel 
          position={[0, 0, 0]} 
          size={[8, 5]} 
          panelId="response-root"
          className="response-root-panel"
      >
        <ResponsePanel />
      </HoloPanel>
    </>
  )
}

// Admin Scene - Minimal 3D background with DOM overlay
function AdminScene() {
  return (
    <>
        <HoloPanel 
          position={[0, 0, 0]} 
          size={[8, 5]} 
          panelId="admin-root"
          className="admin-root-panel"
      >
        <AdminPanels />
      </HoloPanel>
    </>
  )
}
