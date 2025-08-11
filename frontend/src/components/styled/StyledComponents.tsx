import { Box, Paper, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GradientContainer = styled(Box)(({ theme }) => ({
  background: 'transparent',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}33 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}33 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, ${theme.palette.primary.light}22 0%, transparent 50%)`,
    animation: 'float 10s ease-in-out infinite',
    zIndex: 0,
    pointerEvents: 'none'
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
    '50%': { transform: 'translateY(-15px) rotate(1deg)' },
  },
}))

export const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 24,
  boxShadow: `0 0 40px ${theme.palette.primary.main}44, 0 0 80px ${theme.palette.secondary.main}22, 0 8px 32px rgba(0,0,0,0.3)`,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}80, transparent)`,
    zIndex: 1,
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 0 60px ${theme.palette.primary.main}66, 0 0 120px ${theme.palette.secondary.main}44, 0 16px 64px rgba(0,0,0,0.4)`,
  },
}))

export const NeonButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  border: 'none',
  borderRadius: 16,
  color: theme.palette.common.white,
  fontWeight: 700,
  fontSize: '1.05rem',
  padding: '12px 28px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `0 0 20px ${theme.palette.primary.main}88, 0 0 40px ${theme.palette.secondary.main}44, 0 4px 16px rgba(0,0,0,0.3)`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    transition: 'left 0.6s',
    zIndex: 1,
  },
  '&:hover': {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: `0 0 30px ${theme.palette.primary.main}, 0 0 60px ${theme.palette.secondary.main}66, 0 8px 24px rgba(0,0,0,0.4)`,
    '::before': { left: '100%' },
  },
  '&:active': { transform: 'translateY(0px) scale(1.02)' },
}))

export const FloatingContainer = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
}))

export const GlowingTypography = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 800,
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: `0 0 15px ${theme.palette.primary.main}99, 0 0 30px ${theme.palette.secondary.main}66, 0 1px 3px rgba(0,0,0,0.3)`,
  position: 'relative',
  '::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    filter: 'blur(15px)',
    zIndex: -1,
    opacity: 0.6,
  },
}))

export const NeonProgressBar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 8,
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
  '.progress-fill': {
    height: '100%',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: 4,
    transition: 'width 0.3s ease',
    boxShadow: `0 0 10px ${theme.palette.primary.main}88, 0 0 20px ${theme.palette.secondary.main}44`,
    position: 'relative',
  },
}))


