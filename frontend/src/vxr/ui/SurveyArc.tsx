import { useEffect, useMemo, useState, useCallback } from 'react'
import { Box, Typography, RadioGroup, FormControlLabel, Radio, ToggleButtonGroup, ToggleButton, Alert } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import HoloPanel from '../objects/HoloPanel'
import AnimatedContainer from '../../components/animations/AnimatedContainer'
import AnimatedTitle from '../../components/AnimatedTitle'
import FuturisticTitle from '../../components/FuturisticTitle'
import HolographicCard from '../../components/HolographicCard'
import EnhancedInput from '../../components/animations/EnhancedInput'
import AnimatedProgress from '../../components/AnimatedProgress'
import FinalizeButton from '../../components/FinalizeButton'
import { api } from '../../services/api'
import { useNotify } from '../../components/notifications/NotificationProvider'
import { useNavigate } from 'react-router-dom'
import { useSceneStore } from '../hooks/useSceneStore'

type Question = {
  id: number
  question_text: string
  type: 'A' | 'B' | 'C'
  options: string[] | null
}

export default function SurveyArc() {
  const theme = useTheme()
  const notify = useNotify()
  const navigate = useNavigate()
  const { focusedIndex, setFocusedIndex } = useSceneStore()

  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)

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

  const updateAnswer = useCallback((id: number, value: string) => {
    setAnswers(a => ({ ...a, [String(id)]: value }))
  }, [])

  const onSubmit = useCallback(async () => {
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
  }, [answers, navigate, notify])

  // Calculate semicircle positions for panels
  const radius = 7
  const y = 0
  const panelSize: [number, number] = [3.2, 2]

  const arcPositions = useMemo(() => {
    const N = Math.max(questions.length, 1)
    return questions.map((_, i) => {
      const t = N === 1 ? 0 : (-Math.PI / 2) + (i * (Math.PI / (N - 1)))
      const x = Math.sin(t) * radius
      const z = -Math.cos(t) * radius
      const rotY = t
      return { position: [x, y, z] as [number, number, number], rotation: [0, rotY, 0] as [number, number, number] }
    })
  }, [questions])

  // Keyboard navigation for focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setFocusedIndex(Math.max(0, focusedIndex - 1))
      if (e.key === 'ArrowRight') setFocusedIndex(Math.min((questions.length - 1) || 0, focusedIndex + 1))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [focusedIndex, questions.length, setFocusedIndex])

  return (
    <>
      {/* Center title panel */}
      <HoloPanel position={[0, 2.2, -radius + 1]} size={[4.5, 1.5]} panelId="survey-title">
        <Box sx={{ width: '100%', height: '100%', p: 2 }}>
          <AnimatedContainer animationType="float" duration={1}>
            <FuturisticTitle 
              mainTitle="BIGSCREEN" 
              subtitle="SURVEY"
              description="Immersive 180° mode"
            />
          </AnimatedContainer>
        </Box>
      </HoloPanel>

      {/* Progress + Submit panel */}
      <HoloPanel position={[radius * 0.55, -1.0, -radius * 0.2]} size={[2.6, 1.2]} panelId="survey-progress">
        <Box sx={{ width: '100%', height: '100%', p: 1.5 }}>
          <AnimatedTitle title="Progress" subtitle={`${progress}%`} align="left" variant="h6" />
          <AnimatedContainer animationType="float" duration={0.8}>
            <AnimatedProgress value={progress} />
          </AnimatedContainer>
          {error && <Box mt={1}><Alert severity="error">{error}</Alert></Box>}
          <Box mt={1.5}>
            <FinalizeButton onClick={onSubmit} loading={submitting} />
          </Box>
        </Box>
      </HoloPanel>

      {/* Question panels along the arc */}
      {arcPositions.map(({ position, rotation }, idx) => {
        const q = questions[idx]
        if (!q) return null
        return (
          <HoloPanel key={q.id} position={position} rotation={rotation} size={panelSize} panelId={`q-${q.id}`}>
            <Box sx={{ width: '100%', height: '100%', p: 1.5, overflow: 'auto' }}>
              <AnimatedContainer animationType="float" duration={0.8}>
                <HolographicCard sx={{ p: 1.5 }}>
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
              </AnimatedContainer>
            </Box>
          </HoloPanel>
        )
      })}
    </>
  )
}


