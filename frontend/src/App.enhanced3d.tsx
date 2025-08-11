import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box, Typography, Stack, Button, Paper, TextField } from '@mui/material'
import theme from './theme'
import App from './App'

// Enhanced Animation Components
import {
  AnimatedContainer,
  MorphingBackground,
  ParallaxContainer,
  EnhancedTypography,
  CyberGrid,
  EnhancedInput
} from './components/animations'

// Existing Enhanced Components
import GlowingButton from './components/GlowingButton'
import HolographicCard from './components/HolographicCard'
import QuantumButton from './components/QuantumButton'
import AnimatedProgress from './components/AnimatedProgress'
import FloatingElements from './components/FloatingElements'
import Tilt3D from './components/effects/Tilt3D'

// Mock auth provider for preview
import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email: string, password: string) => {
    // Mock login - in real app this would call the API
    if (email === 'admin@survey.com' && password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function Enhanced3DShowcase() {
  const [progress, setProgress] = useState(75)

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Effects */}
      <CyberGrid />
      <MorphingBackground />
      <FloatingElements />
      
      {/* Main Content */}
      <ParallaxContainer speed={0.3}>
        <Box sx={{ position: 'relative', zIndex: 10, p: 4 }}>
          {/* Hero Section */}
          <AnimatedContainer animationType="float" delay={0.2} duration={1.5}>
            <Stack spacing={4} alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
              <EnhancedTypography 
                variant="h1" 
                animationType="holographic"
                delay={0.5}
                duration={2}
              >
                Enhanced 3D Frontend
              </EnhancedTypography>
              
              <EnhancedTypography 
                variant="h4" 
                animationType="typewriter"
                delay={2}
                duration={3}
                sx={{ maxWidth: '800px' }}
              >
                Experience the future of web interfaces
              </EnhancedTypography>
            </Stack>
          </AnimatedContainer>

          {/* Interactive Components Grid */}
          <Stack spacing={6}>
            {/* Buttons Section */}
            <AnimatedContainer animationType="breathe" delay={0.8} duration={2}>
              <HolographicCard sx={{ p: 4 }}>
                <EnhancedTypography variant="h5" animationType="glow" sx={{ mb: 3 }}>
                  Enhanced Buttons
                </EnhancedTypography>
                <Stack direction="row" spacing={3} flexWrap="wrap" gap={2}>
                  <GlowingButton variant="contained">
                    Glowing Button
                  </GlowingButton>
                  <QuantumButton variant="contained">
                    Quantum Button
                  </QuantumButton>
                  <Button variant="contained" color="primary">
                    Enhanced MUI Button
                  </Button>
                </Stack>
              </HolographicCard>
            </AnimatedContainer>

            {/* Input Fields Section */}
            <ParallaxContainer speed={0.5}>
              <AnimatedContainer animationType="shimmer" delay={1.2} duration={1.5}>
                <Tilt3D maxTiltDeg={8} scale={1.03}>
                  <HolographicCard sx={{ p: 4 }}>
                    <EnhancedTypography variant="h5" animationType="fadeInUp" sx={{ mb: 3 }}>
                      Enhanced Input Fields
                    </EnhancedTypography>
                    <Stack spacing={3}>
                      <EnhancedInput
                        label="Enhanced Input"
                        placeholder="Type something amazing..."
                        fullWidth
                      />
                      <TextField
                        label="Standard MUI Input (Enhanced)"
                        placeholder="Also enhanced via theme"
                        fullWidth
                      />
                    </Stack>
                  </HolographicCard>
                </Tilt3D>
              </AnimatedContainer>
            </ParallaxContainer>

            {/* Progress Section */}
            <AnimatedContainer animationType="float" delay={1.6} duration={1.8}>
              <HolographicCard sx={{ p: 4 }}>
                <EnhancedTypography variant="h5" animationType="glow" sx={{ mb: 3 }}>
                  Animated Progress
                </EnhancedTypography>
                <Stack spacing={3}>
                  <AnimatedProgress value={progress} showPercentage />
                  <AnimatedProgress />
                  <Stack direction="row" spacing={2}>
                    <Button 
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                      variant="outlined"
                    >
                      Decrease
                    </Button>
                    <Button 
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                      variant="outlined"
                    >
                      Increase
                    </Button>
                  </Stack>
                </Stack>
              </HolographicCard>
            </AnimatedContainer>

            {/* Cards Grid */}
            <Stack direction="row" spacing={3} flexWrap="wrap" gap={3}>
              {[1, 2, 3].map((index) => (
                <ParallaxContainer key={index} speed={0.2 * index}>
                  <AnimatedContainer 
                    animationType="breathe" 
                    delay={2 + index * 0.3} 
                    duration={2 + index * 0.5}
                  >
                    <Tilt3D maxTiltDeg={15} scale={1.05}>
                      <Paper sx={{ 
                        p: 3, 
                        minWidth: 250, 
                        flex: 1,
                        background: 'rgba(20, 20, 30, 0.9)',
                        backdropFilter: 'blur(20px)',
                      }}>
                        <EnhancedTypography 
                          variant="h6" 
                          animationType="fadeInUp"
                          delay={2.5 + index * 0.3}
                          sx={{ mb: 2 }}
                        >
                          3D Card {index}
                        </EnhancedTypography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          This card demonstrates advanced 3D effects, tilt interactions, 
                          and modern shadow systems.
                        </Typography>
                        <Button variant="outlined" size="small" fullWidth>
                          Interact
                        </Button>
                      </Paper>
                    </Tilt3D>
                  </AnimatedContainer>
                </ParallaxContainer>
              ))}
            </Stack>

            {/* Typography Showcase */}
            <AnimatedContainer animationType="float" delay={3} duration={2}>
              <HolographicCard sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <EnhancedTypography variant="h4" animationType="holographic">
                    Typography Effects
                  </EnhancedTypography>
                  <EnhancedTypography variant="h5" animationType="glow">
                    Glowing Text Effect
                  </EnhancedTypography>
                  <EnhancedTypography variant="h6" animationType="fadeInUp" delay={0.5}>
                    Fade In Up Animation
                  </EnhancedTypography>
                  <EnhancedTypography variant="body1" animationType="typewriter" delay={1}>
                    This text appears with a typewriter effect...
                  </EnhancedTypography>
                </Stack>
              </HolographicCard>
            </AnimatedContainer>
          </Stack>

          {/* Original App Content */}
          <AnimatedContainer animationType="float" delay={4} duration={2}>
            <Box sx={{ mt: 8, position: 'relative' }}>
              <HolographicCard sx={{ p: 4 }}>
                <EnhancedTypography variant="h4" animationType="glow" sx={{ mb: 4 }}>
                  Original Application
                </EnhancedTypography>
                <Box sx={{ 
                  background: 'rgba(10, 10, 10, 0.8)', 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 20, 147, 0.3)',
                }}>
                  <App />
                </Box>
              </HolographicCard>
            </Box>
          </AnimatedContainer>
        </Box>
      </ParallaxContainer>
    </Box>
  )
}

export default function Enhanced3DApp() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Enhanced3DShowcase />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}