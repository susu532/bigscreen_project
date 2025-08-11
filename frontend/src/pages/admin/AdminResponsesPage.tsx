import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Pagination, Container } from '@mui/material'
import { GradientContainer, GlowingTypography } from '../../components/styled/StyledComponents'
import HolographicCard from '../../components/HolographicCard'
import AnimatedContainer from '../../components/animations/AnimatedContainer'
import AnimatedTitle from '../../components/AnimatedTitle'
import AnimatedProgress from '../../components/AnimatedProgress'
import Tilt3D from '../../components/effects/Tilt3D'

type Answer = { question_id: number, question_text: string, answer: string, type: string }
type Response = { id: number, email: string, submitted_at: string, answers: Answer[] }

/**
 * Admin responses view with a table per respondent.
 */
export default function AdminResponsesPage() {
  const [pages, setPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [rows, setRows] = useState<Response[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api.get(`/admin/responses?page=${page}`).then(r => {
      const data = r.data?.data || []
      const meta = r.data?.meta || {}
      setRows(data)
      setPages(meta.last_page || 1)
    }).catch(() => setError('Failed to load responses')).finally(() => setLoading(false))
  }, [page])

  if (loading) return <Box p={4}><AnimatedProgress /></Box>
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>

  return (
    <GradientContainer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AnimatedTitle title="Responses" subtitle="Browse, review and analyze" align="left" variant="h5" />
        {rows.map((resp, idx) => (
          <AnimatedContainer key={resp.id} animationType="float" duration={0.8} delay={idx * 0.05}>
            <Tilt3D>
              <HolographicCard sx={{ p:2, mb: 3 }}>
                <Typography variant="subtitle1">{resp.email}</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Question #</TableCell>
                        <TableCell>Question</TableCell>
                        <TableCell>Answer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {resp.answers.map(a => (
                        <TableRow key={`${resp.id}-${a.question_id}`}>
                          <TableCell>{a.question_id}</TableCell>
                          <TableCell>{a.question_text}</TableCell>
                          <TableCell>{a.answer}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </HolographicCard>
            </Tilt3D>
          </AnimatedContainer>
        ))}
        <Pagination count={pages} page={page} onChange={(_, p) => setPage(p)} />
      </Container>
    </GradientContainer>
  )
}





