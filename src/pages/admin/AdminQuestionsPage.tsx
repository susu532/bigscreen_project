import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Alert } from '@mui/material'

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

  if (loading) return <Box p={4}><LinearProgress /></Box>
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Questionnaire</Typography>
      <TableContainer component={Paper}>
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
    </Box>
  )
}





