import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Alert, Pagination } from '@mui/material'

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

  if (loading) return <Box p={4}><LinearProgress /></Box>
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Responses</Typography>
      {rows.map((resp) => (
        <Paper key={resp.id} sx={{ p:2, mb: 3 }}>
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
        </Paper>
      ))}
      <Pagination count={pages} page={page} onChange={(_, p) => setPage(p)} />
    </Box>
  )
}





