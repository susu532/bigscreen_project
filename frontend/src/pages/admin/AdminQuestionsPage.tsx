import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Container } from '@mui/material'
import { GradientContainer, GlowingTypography } from '../../components/styled/StyledComponents'
import HolographicCard from '../../components/HolographicCard'
import AnimatedContainer from '../../components/animations/AnimatedContainer'
import AnimatedTitle from '../../components/AnimatedTitle'
import AnimatedProgress from '../../components/AnimatedProgress'
import Tilt3D from '../../components/effects/Tilt3D'

type Question = { id: number, number: number, question_text: string, type: string, type_label?: string }

/**
 * Admin questions table view.
 */
export default function AdminQuestionsPage() {
  const [rows, setRows] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get('/admin/questionnaire').then(r => setRows(r.data.data || r.data)).catch(() => setError('Failed to load questions')).finally(() => setLoading(false))
  }, [])

  if (loading) return <Box p={4}><AnimatedProgress /></Box>
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>

  return (
    <GradientContainer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AnimatedTitle title="Questionnaire" subtitle="Manage and refine survey items" align="left" variant="h5" />
        <TableContainer component={(props: any) => (
          <AnimatedContainer animationType="float" duration={0.8}>
            <Tilt3D>
              <HolographicCard {...props} />
            </Tilt3D>
          </AnimatedContainer>
        )}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question #</TableCell>
                <TableCell>Question text</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(q => (
                <TableRow key={q.id}>
                  <TableCell>{q.number}</TableCell>
                  <TableCell>{q.question_text}</TableCell>
                  <TableCell>{q.type_label || q.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </GradientContainer>
  )
}





