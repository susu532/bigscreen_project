import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'
import { Box, Typography, Paper, LinearProgress, Alert, TextField } from '@mui/material'

type Answer = { id: number, answer_text: string, question_id: number, question?: { id: number, question_text: string } }
type SurveyResponse = { token: string, email: string, answers: Answer[] }

/**
 * Public response page by slug: shows all questions and user answers.
 */
export default function ResponsePage() {
  const { slug } = useParams()
  const [data, setData] = useState<SurveyResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    api.get(`/responses/${slug}`).then(r => setData(r.data.data)).catch(() => setError('Not found')).finally(() => setLoading(false))
  }, [slug])

  if (loading) return <Box p={4}><LinearProgress /></Box>
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>
  if (!data) return null

  return (
    <Box p={2} maxWidth={800} mx="auto">
      <Typography variant="h4" gutterBottom>My Responses</Typography>
      <Paper variant="outlined" sx={{ p:2, mb:2 }}>
        <Typography variant="subtitle1" gutterBottom>Thank you for completing the survey!</Typography>
        <Typography variant="body2" gutterBottom>Use this unique URL to view your responses later:</Typography>
        <TextField fullWidth value={window.location.href} inputProps={{ readOnly: true }} />
      </Paper>
      {data.answers.map(a => (
        <Paper key={a.id} variant="outlined" sx={{ p: 2, mb: 2, borderStyle: 'dotted' }}>
          <Typography variant="h6" gutterBottom>{a.question?.question_text || `Question #${a.question_id}`}</Typography>
          <Typography>Answer: {a.answer_text}</Typography>
        </Paper>
      ))}
    </Box>
  )
}


