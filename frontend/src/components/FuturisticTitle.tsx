import { Box, Stack } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import { GlowingTypography, FloatingContainer } from './styled/StyledComponents'

const letterPop = keyframes`
  0% { transform: translateZ(0) scale(1); opacity: 0; }
  60% { transform: translateZ(20px) scale(1.2); opacity: 1; }
  100% { transform: translateZ(0) scale(1); }
`;

const ParticleTitle = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  '::before': {
    content: '""',
    position: 'absolute',
    top: '-20px',
    left: '-20px',
    right: '-20px',
    bottom: '-20px',
    background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main}40 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main}40 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, ${theme.palette.primary.light}30 0%, transparent 50%)`,
    animation: 'particleFloat 8s ease-in-out infinite',
    zIndex: -1,
    borderRadius: '50%',
    filter: 'blur(20px)',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120%',
    height: '120%',
    background: `conic-gradient(${theme.palette.primary.main}20, ${theme.palette.secondary.main}20, transparent, ${theme.palette.primary.main}20)`,
    animation: 'rotate 15s linear infinite',
    zIndex: -2,
    borderRadius: '50%',
    filter: 'blur(30px)',
  },
  '@keyframes particleFloat': {
    '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: 0.7 },
    '33%': { transform: 'translateY(-15px) scale(1.05)', opacity: 1 },
    '66%': { transform: 'translateY(10px) scale(0.95)', opacity: 0.8 },
  },
  '@keyframes rotate': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
  },
}))

type Props = {
  mainTitle?: string
  subtitle?: string
  description?: string
}

export default function FuturisticTitle({
  mainTitle = 'BIGSCREEN',
  subtitle = 'SURVEY',
  description = 'Shape the Future of Virtual Reality',
}: Props) {
  const split = (text: string) => text.split('').map((ch, i) => (
    <span
      key={`${ch}-${i}`}
      style={{
        display: 'inline-block',
        animation: `${letterPop} 600ms ease ${i * 30}ms both`,
        transformOrigin: 'center',
      }}
    >
      {ch}
    </span>
  ));

  return (
    <FloatingContainer>
      <Box sx={{ textAlign: 'center', position: 'relative', py: 4, px: 2 }}>
        <ParticleTitle>
          <Stack spacing={1} alignItems="center">
            <GlowingTypography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              {split(mainTitle)}
            </GlowingTypography>
            <GlowingTypography variant="h4" sx={{ fontWeight: 800, position: 'relative', pb: 0.5 }}>
              {split(subtitle)}
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 3,
                  borderRadius: 2,
                  background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: '0 0 12px rgba(255,20,147,0.6)',
                  animation: 'underlinePulse 2600ms ease-in-out infinite',
                  '@keyframes underlinePulse': {
                    '0%, 100%': { transform: 'scaleX(0.1)', opacity: 0.6, transformOrigin: 'left' },
                    '50%': { transform: 'scaleX(1)', opacity: 1, transformOrigin: 'right' },
                  },
                }}
              />
            </GlowingTypography>
          </Stack>
        </ParticleTitle>
        <StyledDescription>{description}</StyledDescription>
      </Box>
    </FloatingContainer>
  )
}

const descShimmer = keyframes`
  0% { background-position: 0% 50%; opacity: 0.85; }
  50% { background-position: 100% 50%; opacity: 1; }
  100% { background-position: 0% 50%; opacity: 0.85; }
`;

const StyledDescription = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: '0.95rem',
  letterSpacing: '0.3px',
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '300% 300%',
  animation: `${descShimmer} 8s ease-in-out infinite`,
  filter: 'drop-shadow(0 0 6px rgba(255, 20, 147, 0.25))',
}))


