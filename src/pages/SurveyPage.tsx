import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import { TextField, Button, Typography, Box, RadioGroup, FormControlLabel, Radio, Paper, LinearProgress, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type Question = {
  id: number
  question_text: string
  type: 'A' | 'B' | 'C'
  options: string[] | null
}

/**
 * Public survey page: loads 20 questions, validates, and submits answers.
 */
export default function SurveyPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/questions').then(r => {
      // backend returns { success, data: QuestionResource[] }
      setQuestions(r.data.data)
    }).catch(() => setError('Failed to load questions')).finally(() => setLoading(false))
  }, [])

  const progress = useMemo(() => {
    const total = questions.length || 1
    const answered = questions.filter(q => answers[String(q.id)] && answers[String(q.id)].length > 0).length
    return Math.round((answered / total) * 100)
  }, [answers, questions])

  function updateAnswer(id: number, value: string) {
    setAnswers(a => ({ ...a, [String(id)]: value }))
  }

  async function onSubmit() {
    setError(null)
    // basic email presence; server validates thoroughly
    const emailAnswer = answers[String(1)] || ''
    const emailOk = /.+@.+\..+/.test(emailAnswer)
    if (!emailOk) {
      setError('Please enter a valid email for Question 1.')
      return
    }
    if (Object.keys(answers).length !== 20) {
      setError('Please answer all 20 questions.')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        email: emailAnswer,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question_id: Number(questionId),
          answer,
        })),
      }
      const { data } = await api.post('/responses', payload)
      const token = data?.data?.token
      navigate(`/response/${token}`)
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Submission failed')
    } finally { setSubmitting(false) }
  }

  if (loading) return <Box p={4}><LinearProgress /></Box>
  if (error && questions.length === 0) return <Box p={4}><Alert severity="error">{error}</Alert></Box>

  return (
    <Box p={2} maxWidth={800} mx="auto">
      <Typography variant="h4" gutterBottom>Bigscreen Survey</Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {questions.map(q => (
        <Paper key={q.id} variant="outlined" sx={{ p: 2, mb: 2, borderStyle: 'dotted' }}>
          <Typography variant="h6" gutterBottom>{q.question_text}</Typography>

          {q.type === 'B' && (
            <TextField fullWidth inputProps={{ maxLength: 255 }} value={answers[String(q.id)] || ''} onChange={(e) => updateAnswer(q.id, e.target.value)} />
          )}
          {q.type === 'C' && (
            <RadioGroup row value={answers[String(q.id)] || ''} onChange={(e) => updateAnswer(q.id, e.target.value)}>
              {[1,2,3,4,5].map(n => (
                <FormControlLabel key={n} value={String(n)} control={<Radio />} label={String(n)} />
              ))}
            </RadioGroup>
          )}
          {q.type === 'A' && (
            <RadioGroup value={answers[String(q.id)] || ''} onChange={(e) => updateAnswer(q.id, e.target.value)}>
              {(q.options || []).map(opt => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} sx={{ border: '1px dotted', borderRadius: 1, px: 1, my: 0.5 }} />
              ))}
            </RadioGroup>
          )}
        </Paper>
      ))}

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="contained" onClick={onSubmit} disabled={submitting}>
          Finalize
        </Button>
      </Box>
    </Box>
  )
}





