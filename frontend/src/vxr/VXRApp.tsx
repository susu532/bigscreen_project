import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from '../theme'

// VXR Components
import VXRCanvas from './core/VXRCanvas'
import HUDOverlay from './ui/HUDOverlay'

// Original App
import App from '../App'

// Providers
import NotificationProvider, { NotificationBinder } from '../components/notifications/NotificationProvider'

// Store
import { initializeSceneStore } from './hooks/useSceneStore'

export default function VXRApp() {
  // Initialize scene store
  useEffect(() => {
    initializeSceneStore()
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        {/* Notification Provider */}
        <NotificationProvider>
          <NotificationBinder />
          
          {/* 3D Virtual Experience Canvas */}
          <VXRCanvas />
          
          {/* HUD Overlay */}
          <HUDOverlay />
          
          {/* Original App - will be mounted in 3D panels */}
          <App />
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
