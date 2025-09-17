import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Container, IconButton, Tooltip } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import { GradientContainer, GlowingTypography } from '../../components/styled/StyledComponents'
import HolographicCard from '../../components/HolographicCard'
import AnimatedContainer from '../../components/animations/AnimatedContainer'
import AnimatedTitle from '../../components/AnimatedTitle'
import { useNotify } from '../../components/notifications/NotificationProvider'
import AnimatedProgress from '../../components/AnimatedProgress'
import Tilt3D from '../../components/effects/Tilt3D'
import EditQuestionModal from '../../components/admin/EditQuestionModal'

type Question = { 
  id: number
  number: number
  question_text: string
  type: string
  type_label?: string
  options?: string[]
  response_count: number
}

/**
 * Admin questions table view.
 */
export default function AdminQuestionsPage() {
  const [rows, setRows] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const notify = useNotify()

  const loadQuestions = () => {
    setLoading(true)
    api.get('/admin/questionnaire')
      .then(r => setRows(r.data.data || r.data))
      .catch(() => { 
        setError('Failed to load questions')
        notify.error('Failed to load questions') 
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadQuestions()
  }, [])

  const handleEditClick = (question: Question) => {
    setSelectedQuestion(question)
    setEditModalOpen(true)
  }

  const handleEditSuccess = () => {
    loadQuestions() // Reload questions after successful edit
  }

  const handleCloseModal = () => {
    setEditModalOpen(false)
    setSelectedQuestion(null)
  }

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
                <TableCell>Responses</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(q => (
                <TableRow key={q.id}>
                  <TableCell>{q.number}</TableCell>
                  <TableCell>{q.question_text}</TableCell>
                  <TableCell>{q.type_label || q.type}</TableCell>
                  <TableCell>{q.response_count}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Question">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(q)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <EditQuestionModal
        open={editModalOpen}
        onClose={handleCloseModal}
        question={selectedQuestion}
        onSuccess={handleEditSuccess}
      />
    </GradientContainer>
  )
}