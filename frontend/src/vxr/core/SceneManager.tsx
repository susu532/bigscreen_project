import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSceneStore, routePresets, qualityPresets } from '../hooks/useSceneStore'

// 3D Objects
import CyberGrid3D from '../objects/CyberGrid3D'
import ParticlesGPU from '../objects/ParticlesGPU'
import HoloPanel from '../objects/HoloPanel'

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
      {/* Main title panel */}
      <HoloPanel 
        position={[0, 2, 0]} 
        size={[8, 2]} 
        panelId="survey-title"
        className="survey-title-panel"
      />
      
      {/* Progress indicator */}
      <HoloPanel 
        position={[0, 1, 0]} 
        size={[6, 1]} 
        panelId="survey-progress"
        className="survey-progress-panel"
      />
      
      {/* Question panels - arranged in a scrollable column */}
      {Array.from({ length: 20 }, (_, i) => (
        <HoloPanel 
          key={i}
          position={[0, -i * 1.5, 0]} 
          size={[7, 3]} 
          panelId={`question-${i + 1}`}
          className="question-panel"
          data={{ questionIndex: i + 1 }}
        />
      ))}
      
      {/* Floating action button */}
      <HoloPanel 
        position={[3, -1, 0]} 
        size={[2, 1]} 
        panelId="survey-submit"
        className="submit-button-panel"
      />
    </>
  )
}

// Response Scene - Gallery of response cards
function ResponseScene() {
  return (
    <>
      {/* Response summary panel */}
      <HoloPanel 
        position={[0, 2, 0]} 
        size={[8, 2]} 
        panelId="response-summary"
        className="response-summary-panel"
      />
      
      {/* Response details */}
      <HoloPanel 
        position={[0, 0, 0]} 
        size={[8, 4]} 
        panelId="response-details"
        className="response-details-panel"
      />
      
      {/* Navigation */}
      <HoloPanel 
        position={[0, -2, 0]} 
        size={[6, 1]} 
        panelId="response-nav"
        className="response-nav-panel"
      />
    </>
  )
}

// Admin Scene - Minimal 3D background with DOM overlay
function AdminScene() {
  return (
    <>
      {/* Admin stats panel */}
      <HoloPanel 
        position={[0, 1, 0]} 
        size={[6, 2]} 
        panelId="admin-stats"
        className="admin-stats-panel"
      />
      
      {/* Quick actions */}
      <HoloPanel 
        position={[0, -1, 0]} 
        size={[8, 1]} 
        panelId="admin-actions"
        className="admin-actions-panel"
      />
    </>
  )
}
