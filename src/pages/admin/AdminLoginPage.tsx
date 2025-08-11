import { useState } from 'react'
import { Box, Paper, TextField, Button, Typography, Alert } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

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
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" p={2}>
      <Paper sx={{ p: 3, width: 400 }}>
        <Typography variant="h5" gutterBottom>Admin Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={onSubmit}>
          <TextField fullWidth label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} required />
          <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} required />
          <Button fullWidth type="submit" variant="contained" disabled={loading}>Login</Button>
        </form>
      </Paper>
    </Box>
  )
}





