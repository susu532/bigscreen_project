import { useState } from 'react'
import { 
  Box, 
  IconButton, 
  Typography, 
  Chip, 
  Stack, 
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material'
import { 
  Settings, 
  Visibility, 
  VisibilityOff, 
  BugReport,
  Refresh
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { useSceneStore } from '../hooks/useSceneStore'
import { useTheme } from '@mui/material/styles'

const HUDContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 1000,
}))

const HUDItem = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background: 'rgba(20, 20, 30, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.primary.main}40`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1),
  pointerEvents: 'auto',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(30, 30, 40, 0.95)',
    borderColor: theme.palette.primary.main,
  },
}))

const StatusChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 20, 147, 0.2)',
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1),
  },
}))

export default function HUDOverlay() {
  const theme = useTheme()
  const { 
    hudVisible, 
    debugMode, 
    fps, 
    quality, 
    effects, 
    parallaxEnabled,
    currentRoute,
    viewMode,
    focusedIndex,
    toggleHUD, 
    toggleDebugMode, 
    setQuality, 
    toggleEffect,
    setParallaxEnabled,
    setViewMode,
    setFocusedIndex,
    resetToDefaults
  } = useSceneStore()

  const [showSettings, setShowSettings] = useState(false)

  if (!hudVisible) {
    return (
      <HUDContainer>
        <HUDItem sx={{ top: 16, right: 16 }}>
          <IconButton 
            onClick={toggleHUD}
            size="small"
            sx={{ color: theme.palette.primary.main }}
          >
            <Visibility />
          </IconButton>
        </HUDItem>
      </HUDContainer>
    )
  }

  return (
    <HUDContainer>
      {/* Top-left: FPS and Quality */}
      <HUDItem sx={{ top: 16, left: 16 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <StatusChip 
            label={`${fps} FPS`} 
            size="small"
            color={fps < 30 ? 'error' : fps < 50 ? 'warning' : 'success'}
          />
          <StatusChip 
            label={quality.toUpperCase()} 
            size="small"
          />
        </Stack>
      </HUDItem>

      {/* Top-right: Settings and Controls */}
      <HUDItem sx={{ top: 16, right: 16 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Settings">
            <IconButton 
              onClick={() => setShowSettings(!showSettings)}
              size="small"
              sx={{ color: theme.palette.primary.main }}
            >
              <Settings />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Toggle Debug Mode">
            <IconButton 
              onClick={toggleDebugMode}
              size="small"
              sx={{ 
                color: debugMode ? theme.palette.secondary.main : theme.palette.primary.main 
              }}
            >
              <BugReport />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Hide HUD">
            <IconButton 
              onClick={toggleHUD}
              size="small"
              sx={{ color: theme.palette.primary.main }}
            >
              <VisibilityOff />
            </IconButton>
          </Tooltip>
        </Stack>
      </HUDItem>

      {/* Settings Panel */}
      {showSettings && (
        <HUDItem sx={{ top: 80, right: 16, minWidth: 250 }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
            Settings
          </Typography>
          
          <Stack spacing={2}>
            {/* Quality Settings */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Quality
              </Typography>
              <Stack direction="row" spacing={1}>
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <Chip
                    key={level}
                    label={level.toUpperCase()}
                    size="small"
                    onClick={() => setQuality(level)}
                    sx={{
                      background: quality === level ? theme.palette.primary.main : 'transparent',
                      color: quality === level ? '#000' : theme.palette.primary.main,
                      border: `1px solid ${theme.palette.primary.main}`,
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Effects Toggles */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Effects
              </Typography>
              <Stack spacing={1}>
                {Object.entries(effects).map(([effect, enabled]) => (
                  <FormControlLabel
                    key={effect}
                    control={
                      <Switch
                        checked={enabled}
                        onChange={() => toggleEffect(effect as any)}
                        size="small"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: theme.palette.primary.main,
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: theme.palette.primary.main,
                          },
                        }}
                      />
                    }
                    label={effect.charAt(0).toUpperCase() + effect.slice(1)}
                    sx={{ 
                      '& .MuiFormControlLabel-label': { 
                        fontSize: '0.875rem',
                        color: theme.palette.text.primary
                      } 
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Parallax Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={parallaxEnabled}
                  onChange={(e) => setParallaxEnabled(e.target.checked)}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label="Parallax"
              sx={{ 
                '& .MuiFormControlLabel-label': { 
                  fontSize: '0.875rem',
                  color: theme.palette.text.primary
                } 
              }}
            />

            {/* 180° Mode Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={viewMode === 'immersive180'}
                  onChange={(e) => setViewMode(e.target.checked ? 'immersive180' : 'flat')}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label="180° Mode"
              sx={{ 
                '& .MuiFormControlLabel-label': { 
                  fontSize: '0.875rem',
                  color: theme.palette.text.primary
                } 
              }}
            />

            {/* Reset Button */}
            <Box>
              <IconButton
                onClick={resetToDefaults}
                size="small"
                sx={{ color: theme.palette.primary.main }}
              >
                <Refresh />
              </IconButton>
              <Typography variant="caption" sx={{ ml: 1, color: theme.palette.text.secondary }}>
                Reset to Defaults
              </Typography>
            </Box>
          </Stack>
        </HUDItem>
      )}

      {/* Bottom-left: Current Route */}
      <HUDItem sx={{ bottom: 16, left: 16 }}>
        <StatusChip 
          label={currentRoute === '/' ? 'SURVEY' : currentRoute.toUpperCase()} 
          size="small"
        />
      </HUDItem>

      {/* Bottom-right: Performance Info */}
      {debugMode && (
        <HUDItem sx={{ bottom: 16, right: 16 }}>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Debug Mode Active
          </Typography>
        </HUDItem>
      )}

      {/* Bottom-center: Immersive navigation */}
      {viewMode === 'immersive180' && currentRoute === '/' && (
        <HUDItem sx={{ bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label="Prev" size="small" onClick={() => setFocusedIndex(Math.max(0, focusedIndex - 1))} />
            <Chip label={`Q ${focusedIndex + 1}`} size="small" />
            <Chip label="Next" size="small" onClick={() => setFocusedIndex(focusedIndex + 1)} />
          </Stack>
        </HUDItem>
      )}
    </HUDContainer>
  )
}
