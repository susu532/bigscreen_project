import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export type QualityLevel = 'low' | 'medium' | 'high'
export type EffectType = 'bloom' | 'chromatic' | 'vignette' | 'noise' | 'particles' | 'grid'

export interface SceneState {
  // Quality and performance
  quality: QualityLevel
  fps: number
  autoQuality: boolean
  
  // Effects toggles
  effects: Record<EffectType, boolean>
  
  // Camera and interaction
  cameraTarget: [number, number, number]
  cameraSpeed: number
  parallaxEnabled: boolean
  
  // Route presets
  currentRoute: string
  scenePreset: string
  
  // UI state
  hudVisible: boolean
  debugMode: boolean
  viewMode: 'flat' | 'immersive180'
  focusedIndex: number
  
  // Actions
  setQuality: (quality: QualityLevel) => void
  setFPS: (fps: number) => void
  toggleEffect: (effect: EffectType) => void
  setCameraTarget: (target: [number, number, number]) => void
  setCameraSpeed: (speed: number) => void
  setParallaxEnabled: (enabled: boolean) => void
  setCurrentRoute: (route: string) => void
  setScenePreset: (preset: string) => void
  toggleHUD: () => void
  toggleDebugMode: () => void
  setViewMode: (mode: 'flat' | 'immersive180') => void
  setFocusedIndex: (index: number) => void
  resetToDefaults: () => void
}

const defaultEffects: Record<EffectType, boolean> = {
  bloom: true,
  chromatic: true,
  vignette: true,
  noise: false,
  particles: true,
  grid: true,
}

export const useSceneStore = create<SceneState>()(
  subscribeWithSelector((set) => ({
    // Initial state
    quality: 'medium',
    fps: 60,
    autoQuality: true,
    effects: defaultEffects,
    cameraTarget: [0, 0, 0],
    cameraSpeed: 1,
    parallaxEnabled: true,
    currentRoute: '/',
    scenePreset: 'default',
    hudVisible: true,
    debugMode: false,
    viewMode: 'flat',
    focusedIndex: 0,

    // Actions
    setQuality: (quality) => set({ quality }),
    setFPS: (fps) => set({ fps }),
    toggleEffect: (effect) => 
      set((state) => ({
        effects: {
          ...state.effects,
          [effect]: !state.effects[effect]
        }
      })),
    setCameraTarget: (cameraTarget) => set({ cameraTarget }),
    setCameraSpeed: (cameraSpeed) => set({ cameraSpeed }),
    setParallaxEnabled: (parallaxEnabled) => set({ parallaxEnabled }),
    setCurrentRoute: (currentRoute) => set({ currentRoute }),
    setScenePreset: (scenePreset) => set({ scenePreset }),
    toggleHUD: () => set((state) => ({ hudVisible: !state.hudVisible })),
    toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
    setViewMode: (viewMode) => set({ viewMode }),
    setFocusedIndex: (focusedIndex) => set({ focusedIndex }),
    resetToDefaults: () => set({
      quality: 'medium',
      effects: defaultEffects,
      cameraTarget: [0, 0, 0],
      cameraSpeed: 1,
      parallaxEnabled: true,
      hudVisible: true,
      debugMode: false,
      viewMode: 'flat',
      focusedIndex: 0,
    }),
  }))
)

// Quality presets
export const qualityPresets = {
  low: {
    particles: 100,
    bloomIntensity: 0.3,
    shadowMapSize: 512,
    antialias: false,
  },
  medium: {
    particles: 500,
    bloomIntensity: 0.6,
    shadowMapSize: 1024,
    antialias: true,
  },
  high: {
    particles: 1000,
    bloomIntensity: 1.0,
    shadowMapSize: 2048,
    antialias: true,
  },
}

// Route presets for camera targets and scene composition
export const routePresets = {
  '/': {
    cameraTarget: [0, 0, 0] as [number, number, number],
    scenePreset: 'survey',
    effects: { particles: true, grid: true, bloom: true },
  },
  '/response': {
    cameraTarget: [0, 2, 0] as [number, number, number],
    scenePreset: 'response',
    effects: { particles: true, grid: false, bloom: true },
  },
  '/administration': {
    cameraTarget: [0, -1, 0] as [number, number, number],
    scenePreset: 'admin',
    effects: { particles: false, grid: true, bloom: false },
  },
  '/admin': {
    cameraTarget: [0, -1, 0] as [number, number, number],
    scenePreset: 'admin',
    effects: { particles: false, grid: true, bloom: false },
  },
}

// Subscribe to route changes and update scene accordingly
export const initializeSceneStore = () => {
  // Auto-quality adjustment based on FPS
  let frameCount = 0
  let lastTime = performance.now()
  
  const checkPerformance = () => {
    frameCount++
    const currentTime = performance.now()
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
      const store = useSceneStore.getState()
      const { quality, autoQuality, setQuality, setFPS } = store
      
      setFPS(fps)
      
      if (autoQuality) {
        if (fps < 30 && quality !== 'low') {
          setQuality('low')
        } else if (fps > 55 && quality === 'low') {
          setQuality('medium')
        }
      }
      
      frameCount = 0
      lastTime = currentTime
    }
    
    requestAnimationFrame(checkPerformance)
  }
  
  checkPerformance()
}
