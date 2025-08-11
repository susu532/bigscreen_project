import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'
import { Box, Typography, Alert, TextField, Container } from '@mui/material'
import { GradientContainer, NeonButton } from '../components/styled/StyledComponents'
import HolographicCard from '../components/HolographicCard'
import AnimatedContainer from '../components/animations/AnimatedContainer'
import AnimatedProgress from '../components/AnimatedProgress'
import Tilt3D from '../components/effects/Tilt3D'
import AnimatedTitle from '../components/AnimatedTitle'
import { useNotify } from '../components/notifications/NotificationProvider'

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
  const notify = useNotify()

  useEffect(() => {
    api.get(`/responses/${slug}`)
      .then(r => setData(r.data.data))
      .catch(() => { setError('Not found'); notify.error('Response not found'); })
      .finally(() => setLoading(false))
  }, [slug])

  function exportCsv() {
    if (!data) return
    const headers = ['Email', 'Token', 'QuestionId', 'Question', 'Answer']
    const rows = data.answers.map(a => [
      data.email,
      data.token,
      a.question_id,
      a.question?.question_text || '',
      a.answer_text,
    ])
    const csvMatrix = [headers, ...rows]
    const csv = csvMatrix
      .map(row => row
        .map((value) => {
          const s = String(value ?? '')
          const escaped = s.replace(/"/g, '""')
          return /[",\n]/.test(s) ? `"${escaped}"` : escaped
        })
        .join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `response_${data.token}.csv`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(url)
    notify.success('CSV exported')
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      notify.success('Link copied to clipboard')
    } catch {
      notify.error('Failed to copy link')
    }
  }

  if (loading) return <Box p={4}><AnimatedProgress /></Box>
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>
  if (!data) return null

  return (
    <GradientContainer>
      <Container maxWidth="md" sx={{ py: 6, position: 'relative', zIndex: 2 }}>
        <AnimatedTitle title="My Responses" subtitle="Your personal neon trail" align="left" variant="h5" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
          <NeonButton onClick={copyLink}>Copy Link</NeonButton>
          <NeonButton onClick={exportCsv}>Export CSV</NeonButton>
        </Box>
        <AnimatedContainer animationType="float" duration={0.8}>
          <Tilt3D>
            <HolographicCard sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Thank you for completing the survey!</Typography>
              <Typography variant="body2" gutterBottom>Use this unique URL to view your responses later:</Typography>
              <TextField fullWidth value={window.location.href} inputProps={{ readOnly: true }} />
            </HolographicCard>
          </Tilt3D>
        </AnimatedContainer>
        {data.answers.map((a, idx) => (
          <AnimatedContainer key={a.id} animationType="float" duration={0.8} delay={idx * 0.05}>
            <Tilt3D>
              <HolographicCard sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>{a.question?.question_text || `Question #${a.question_id}`}</Typography>
                <Typography>Answer: {a.answer_text}</Typography>
              </HolographicCard>
            </Tilt3D>
          </AnimatedContainer>
        ))}
      </Container>
    </GradientContainer>
  )
}


