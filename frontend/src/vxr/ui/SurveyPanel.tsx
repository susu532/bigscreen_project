import { useEffect, useMemo, useState } from 'react'
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Alert, ToggleButtonGroup, ToggleButton, Stack } from '@mui/material'
import FuturisticTitle from '../../components/FuturisticTitle'
import AnimatedContainer from '../../components/animations/AnimatedContainer'
import AnimatedTitle from '../../components/AnimatedTitle'
import AnimatedProgress from '../../components/AnimatedProgress'
import HolographicCard from '../../components/HolographicCard'
import EnhancedInput from '../../components/animations/EnhancedInput'
import FinalizeButton from '../../components/FinalizeButton'
import Tilt3D from '../../components/effects/Tilt3D'
import { api } from '../../services/api'
import { useNotify } from '../../components/notifications/NotificationProvider'
import { useNavigate } from 'react-router-dom'

type Question = {
  id: number
  question_text: string
  type: 'A' | 'B' | 'C'
  options: string[] | null
}

/**
 * Survey UI adapted to render inside a 3D HoloPanel (Html portal).
 * Keeps logic from the 2D page but removes viewport-fixed elements.
 */
export default function SurveyPanel() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const notify = useNotify()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/questions')
      .then(r => setQuestions(r.data.data))
      .catch(() => setError('Failed to load questions'))
      .finally(() => setLoading(false))
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
    const emailAnswer = answers[String(1)] || ''
    const emailOk = /.+@.+\..+/.test(emailAnswer)
    if (!emailOk) {
      setError('Please enter a valid email for Question 1.')
      notify.warning('Please enter a valid email for Question 1.')
      return
    }
    if (Object.keys(answers).length !== 20) {
      setError('Please answer all 20 questions.')
      notify.info('Some questions are missing.')
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
      notify.success('Responses submitted successfully!')
      const token = data?.data?.token
      navigate(`/response/${token}`)
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Submission failed'
      setError(msg)
      notify.error(msg)
    } finally { setSubmitting(false) }
  }

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', p: 2 }}>
      {/* Header */}
      <AnimatedContainer animationType="float" duration={1}>
        <FuturisticTitle 
          mainTitle="BIGSCREEN" 
          subtitle="SURVEY"
          description="Help us shape the future of virtual reality"
        />
      </AnimatedContainer>

      {/* Progress */}
      <AnimatedTitle title="Questions" subtitle="Answer to progress the neon arc" align="left" variant="h5" />
      <AnimatedContainer animationType="float" duration={0.8}>
        <Tilt3D>
          <HolographicCard sx={{ p: 2, mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle2">Progress</Typography>
              <Box sx={{ flex: 1 }}>
                <AnimatedProgress value={progress} />
              </Box>
            </Stack>
          </HolographicCard>
        </Tilt3D>
      </AnimatedContainer>

      {/* Errors */}
      {loading && <Box p={2}><AnimatedProgress /></Box>}
      {!loading && error && questions.length === 0 && (
        <Box p={2}><Alert severity="error">{error}</Alert></Box>
      )}

      {/* Questions */}
      {!loading && questions.map((q, idx) => (
        <AnimatedContainer key={q.id} animationType="float" duration={0.8} delay={idx * 0.05}>
          <Tilt3D>
            <HolographicCard id={`q-${q.id}`} sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>{q.question_text}</Typography>

              {q.type === 'B' && (
                <EnhancedInput 
                  fullWidth 
                  inputProps={{ maxLength: 255 }} 
                  value={answers[String(q.id)] || ''} 
                  onChange={(e) => updateAnswer(q.id, (e.target as HTMLInputElement).value)} 
                  placeholder="Enter your response..." 
                />
              )}

              {q.type === 'C' && (
                <ToggleButtonGroup
                  exclusive
                  value={answers[String(q.id)] || ''}
                  onChange={(_, val) => val && updateAnswer(q.id, String(val))}
                  sx={{ display: 'flex', gap: 1 }}
                >
                  {[1,2,3,4,5].map(n => (
                    <ToggleButton key={n} value={String(n)}>{n}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}

              {q.type === 'A' && (
                <RadioGroup 
                  value={answers[String(q.id)] || ''} 
                  onChange={(e) => updateAnswer(q.id, e.target.value)}
                >
                  {(q.options || []).map(opt => (
                    <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                  ))}
                </RadioGroup>
              )}
            </HolographicCard>
          </Tilt3D>
        </AnimatedContainer>
      ))}

      {/* Submit */}
      {!loading && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <AnimatedContainer animationType="breathe" duration={2}>
            <FinalizeButton onClick={onSubmit} loading={submitting} />
          </AnimatedContainer>
        </Box>
      )}
    </Box>
  )
}


