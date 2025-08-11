import { useState } from 'react'
import { TextField, Alert, Container } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { GradientContainer, NeonButton, GlowingTypography } from '../../components/styled/StyledComponents'
import HolographicCard from '../../components/HolographicCard'
import AnimatedContainer from '../../components/animations/AnimatedContainer'

/**
 * Admin login page using simple email/password with Sanctum token.
 */
export default function AdminLoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@survey.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <GradientContainer>
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', py: 6 }}>
        <AnimatedContainer animationType="float" duration={0.8}>
          <HolographicCard sx={{ p: 4, width: '100%' }}>
            <GlowingTypography variant="h5" sx={{ mb: 2 }}>Admin Login</GlowingTypography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={onSubmit}>
              <TextField fullWidth label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 3 }} required />
              <NeonButton type="submit" fullWidth disabled={loading}>Login</NeonButton>
            </form>
          </HolographicCard>
        </AnimatedContainer>
      </Container>
    </GradientContainer>
  )
}





