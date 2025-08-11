import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import EnhancedBackground from './components/EnhancedBackground'
import './index.css'
import App from './App.tsx'
import NotificationProvider, { NotificationBinder } from './components/notifications/NotificationProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EnhancedBackground />
        <NotificationProvider>
          <NotificationBinder />
          <App />
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
