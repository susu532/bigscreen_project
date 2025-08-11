import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import { Typography, Box, RadioGroup, FormControlLabel, Radio, Alert, Container, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { GradientContainer, NeonButton } from '../components/styled/StyledComponents'
import FuturisticTitle from '../components/FuturisticTitle'
import ParallaxContainer from '../components/animations/ParallaxContainer'
import AnimatedTitle from '../components/AnimatedTitle'
import HolographicCard from '../components/HolographicCard'
import AnimatedContainer from '../components/animations/AnimatedContainer'
import AnimatedProgress from '../components/AnimatedProgress'
import Tilt3D from '../components/effects/Tilt3D'
import EnhancedInput from '../components/animations/EnhancedInput'

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
      const firstMissing = questions.find(q => !answers[String(q.id)] || answers[String(q.id)].length === 0)
      if (firstMissing) {
        const el = document.getElementById(`q-${firstMissing.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
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

  if (loading) return <Box p={4}><AnimatedProgress /> </Box>
  if (error && questions.length === 0) return <Box p={4}><Alert severity="error">{error}</Alert></Box>

  return (
    <GradientContainer>
      <Container maxWidth="md" sx={{ py: 6, position: 'relative', zIndex: 2 }}>
        <AnimatedContainer animationType="float" duration={1}>
          <ParallaxContainer speed={0.2} enableMouseParallax enable3D>
            <FuturisticTitle mainTitle="BIGSCREEN" subtitle="SURVEY" description="Help us shape the future of virtual reality" />
          </ParallaxContainer>
        </AnimatedContainer>
        <AnimatedTitle title="Questions" subtitle="Answer to progress the neon arc" align="left" variant="h5" />

        <AnimatedContainer animationType="float" duration={0.8}>
          <Tilt3D>
            <HolographicCard sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>Progress</Typography>
              <AnimatedProgress value={progress} />
            </HolographicCard>
          </Tilt3D>
        </AnimatedContainer>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {questions.map((q, idx) => (
          <AnimatedContainer key={q.id} animationType="float" duration={0.8} delay={idx * 0.05}>
            <Tilt3D>
              <HolographicCard id={`q-${q.id}`} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>{q.question_text}</Typography>

                {q.type === 'B' && (
                  <EnhancedInput fullWidth inputProps={{ maxLength: 255 }} value={answers[String(q.id)] || ''} onChange={(e) => updateAnswer(q.id, (e.target as HTMLInputElement).value)} placeholder="Enter your response..." />
                )}
                {q.type === 'C' && (
                  <ToggleButtonGroup
                    exclusive
                    value={answers[String(q.id)] || ''}
                    onChange={(_, val) => val && updateAnswer(q.id, String(val))}
                    sx={{
                      display: 'flex',
                      gap: 1,
                      '& .MuiToggleButton-root': {
                        flex: 1,
                        borderRadius: 2,
                        borderColor: 'rgba(255,255,255,0.15)',
                        color: 'text.primary',
                        background: 'rgba(255,255,255,0.04)',
                        transition: 'all 0.25s ease',
                        '&.Mui-selected': {
                          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          color: '#fff',
                          boxShadow: '0 0 16px rgba(255,20,147,0.5)'
                        },
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 18px rgba(0,0,0,0.3)'
                        }
                      }
                    }}
                  >
                    {[1,2,3,4,5].map(n => (
                      <ToggleButton key={n} value={String(n)}>{n}</ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                )}
                {q.type === 'A' && (
                  <RadioGroup value={answers[String(q.id)] || ''} onChange={(e) => updateAnswer(q.id, e.target.value)}>
                    {(q.options || []).map(opt => (
                      <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} sx={{
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 1,
                        px: 1,
                        my: 0.5,
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 18px rgba(0,0,0,0.3)'
                        },
                        '& .MuiRadio-root.Mui-checked': {
                          color: 'primary.main'
                        }
                      }} />
                    ))}
                  </RadioGroup>
                )}
              </HolographicCard>
            </Tilt3D>
          </AnimatedContainer>
        ))}
        {/* Floating action bar */}
        <Box sx={{ position: 'fixed', right: 24, bottom: 24, display: 'flex', alignItems: 'center', gap: 2, zIndex: 10 }}>
          <Box sx={{ minWidth: 160 }}>
            <AnimatedProgress value={progress} showPercentage />
          </Box>
          <AnimatedContainer animationType="breathe" duration={2}>
            <Tilt3D>
              <NeonButton onClick={onSubmit} disabled={submitting}>
                Finalize
              </NeonButton>
            </Tilt3D>
          </AnimatedContainer>
        </Box>
      </Container>
    </GradientContainer>
  )
}





