import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Import the VXR App for 3D virtual experience
import VXRApp from './vxr/VXRApp'

// Import the original App as fallback
import App from './App'

// Choose which app to run
const USE_VXR = true // Set to false to use original App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {USE_VXR ? <VXRApp /> : <App />}
  </StrictMode>,
)
