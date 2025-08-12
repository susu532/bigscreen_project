import { useEffect, useState } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import HolographicCard from '../../components/HolographicCard'
import AnimatedContainer from '../../components/animations/AnimatedContainer'
import AnimatedTitle from '../../components/AnimatedTitle'
import { api } from '../../services/api'
import { useParams } from 'react-router-dom'

type ResponseSummary = {
  token: string
  created_at: string
  answers: Array<{ question_id: number; answer: string }>
}

export default function ResponsePanel({ token }: { token?: string }) {
  const [data, setData] = useState<ResponseSummary | null>(null)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const tokenToUse = token ?? (params as any)?.slug

  useEffect(() => {
    if (!tokenToUse) return
    api.get(`/responses/${tokenToUse}`)
      .then(r => setData(r.data.data))
      .catch(() => setError('Failed to load response'))
  }, [tokenToUse])

  if (error) return <Box p={2}><Alert severity="error">{error}</Alert></Box>
  if (!data) return <Box p={2}><Typography variant="body2">Loading response...</Typography></Box>

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', p: 2 }}>
      <AnimatedTitle title="Your Response" subtitle={data.token} align="left" variant="h5" />
      <AnimatedContainer animationType="float" duration={0.8}>
        <HolographicCard sx={{ p: 2 }}>
          <Typography variant="subtitle2">Submitted on</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{new Date(data.created_at).toLocaleString()}</Typography>
          {data.answers.map(a => (
            <Typography key={a.question_id} variant="body2">Q{a.question_id}: {a.answer}</Typography>
          ))}
        </HolographicCard>
      </AnimatedContainer>
    </Box>
  )
}


