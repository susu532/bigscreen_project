import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Chip,
  IconButton,
  Typography,
  Alert,
  Divider,
  Card,
  CardContent
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { api } from '../../services/api'
import { useNotify } from '../notifications/NotificationProvider'
import HolographicCard from '../HolographicCard'
import AnimatedContainer from '../animations/AnimatedContainer'
import Tilt3D from '../effects/Tilt3D'
import { styled } from '@mui/material/styles'

// Styled components for the modal
const StyledDialog = styled(Dialog)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  '& .MuiDialog-paper': {
    background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98) 0%, rgba(30, 20, 40, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 20, 147, 0.3)',
    borderRadius: '20px',
    boxShadow: `
      0 25px 50px rgba(255, 20, 147, 0.2),
      0 0 100px rgba(153, 50, 204, 0.1),
      inset 0 0 30px rgba(255, 20, 147, 0.05)
    `,
    color: '#ffffff',
    maxHeight: '90vh',
    height: 'auto',
    overflow: 'hidden',
    margin: 0,
    position: 'relative',
    width: '90vw',
    maxWidth: '800px',
    minHeight: 'auto'
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  '& .MuiDialog-container': {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4)
  }
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.1) 0%, rgba(153, 50, 204, 0.1) 100%)',
  borderBottom: '1px solid rgba(255, 20, 147, 0.2)',
  padding: theme.spacing(3),
  '& .MuiTypography-root': {
    color: '#ffffff',
    fontWeight: 600
  }
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'transparent',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.6), rgba(153, 50, 204, 0.6))',
    borderRadius: '4px'
  }
}))

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.05) 0%, rgba(153, 50, 204, 0.05) 100%)',
  borderTop: '1px solid rgba(255, 20, 147, 0.2)',
  padding: theme.spacing(2, 3),
  gap: theme.spacing(1)
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(255, 20, 147, 0.3)',
      borderWidth: '2px'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 20, 147, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 20, 147, 0.8)',
      boxShadow: '0 0 20px rgba(255, 20, 147, 0.3)'
    },
    '& .MuiInputBase-input': {
      color: '#ffffff',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)'
      }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: 'rgba(255, 20, 147, 0.8)'
      }
    }
  }
}))

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(255, 20, 147, 0.3)',
      borderWidth: '2px'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 20, 147, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 20, 147, 0.8)',
      boxShadow: '0 0 20px rgba(255, 20, 147, 0.3)'
    },
    '& .MuiSelect-select': {
      color: '#ffffff'
    }
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: 'rgba(255, 20, 147, 0.8)'
    }
  }
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&.MuiButton-contained': {
    background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.8) 0%, rgba(153, 50, 204, 0.8) 100%)',
    boxShadow: '0 8px 25px rgba(255, 20, 147, 0.3)',
    '&:hover': {
      background: 'linear-gradient(45deg, rgba(255, 20, 147, 1) 0%, rgba(153, 50, 204, 1) 100%)',
      boxShadow: '0 12px 35px rgba(255, 20, 147, 0.4)',
      transform: 'translateY(-2px)'
    },
    '&:disabled': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.3)',
      boxShadow: 'none'
    }
  },
  '&.MuiButton-outlined': {
    borderColor: 'rgba(255, 20, 147, 0.5)',
    color: '#ffffff',
    '&:hover': {
      borderColor: 'rgba(255, 20, 147, 0.8)',
      background: 'rgba(255, 20, 147, 0.1)',
      transform: 'translateY(-1px)'
    }
  }
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.2) 0%, rgba(153, 50, 204, 0.2) 100%)',
  border: '1px solid rgba(255, 20, 147, 0.3)',
  color: '#ffffff',
  '& .MuiChip-deleteIcon': {
    color: 'rgba(255, 20, 147, 0.8)',
    '&:hover': {
      color: '#ff1493'
    }
  }
}))

interface Question {
  id: number
  number: number
  question_text: string
  type: string
  type_label?: string
  options?: string[]
  response_count: number
}

interface EditQuestionModalProps {
  open: boolean
  onClose: () => void
  question: Question | null
  onSuccess: () => void
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  open,
  onClose,
  question,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    question_text: '',
    type: 'A',
    options: [] as string[]
  })
  const [newOption, setNewOption] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const notify = useNotify()

  useEffect(() => {
    if (question) {
      setFormData({
        question_text: question.question_text,
        type: question.type,
        options: question.options || []
      })
      setError(null)
    }
  }, [question])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addOption = () => {
    if (newOption.trim() && !formData.options.includes(newOption.trim())) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, newOption.trim()]
      }))
      setNewOption('')
    }
  }

  const removeOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    if (!question) return

    setLoading(true)
    setError(null)

    try {
      const payload = {
        question_text: formData.question_text,
        type: formData.type,
        options: formData.type === 'A' ? formData.options : null
      }

      await api.put(`/admin/questions/${question.id}`, payload)
      notify.success('Question updated successfully')
      onSuccess()
      onClose()
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update question'
      setError(errorMessage)
      notify.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'A': return 'Multiple Choice'
      case 'B': return 'Text Input'
      case 'C': return 'Numeric Scale (1-5)'
      default: return 'Unknown'
    }
  }

  return (
    <StyledDialog 
      open={open} 
      onClose={onClose} 
      maxWidth={false}
      fullWidth={false}
      disableScrollLock={false}
      PaperProps={{
        sx: {
          margin: 0,
          maxHeight: '90vh',
          height: 'auto'
        }
      }}
    >
      <StyledDialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <EditIcon sx={{ color: 'rgba(255, 20, 147, 0.8)' }} />
          <Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
              Edit Question #{question?.number}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 0.5 }}>
              {question?.response_count} responses received
            </Typography>
          </Box>
        </Box>
      </StyledDialogTitle>
      
      <StyledDialogContent>
        {error && (
          <AnimatedContainer animationType="float" duration={0.5}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                background: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                color: '#ffffff',
                '& .MuiAlert-icon': {
                  color: '#f44336'
                }
              }}
            >
              {error}
            </Alert>
          </AnimatedContainer>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Question Text Section */}
          <AnimatedContainer animationType="float" duration={0.6} delay={0.1}>
            <Tilt3D maxTiltDeg={5} scale={1.01}>
              <HolographicCard sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 2 }}>
                  Question Text
                </Typography>
                <StyledTextField
                  label="Question Text"
                  value={formData.question_text}
                  onChange={(e) => handleInputChange('question_text', e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                  required
                  helperText="Enter the question text that will be displayed to users"
                  placeholder="What is your question?"
                />
              </HolographicCard>
            </Tilt3D>
          </AnimatedContainer>

          {/* Question Type Section */}
          <AnimatedContainer animationType="float" duration={0.6} delay={0.2}>
            <Tilt3D maxTiltDeg={5} scale={1.01}>
              <HolographicCard sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 2 }}>
                  Question Type
                </Typography>
                <StyledFormControl fullWidth>
                  <InputLabel>Question Type</InputLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    label="Question Type"
                  >
                    <MenuItem value="A">Multiple Choice</MenuItem>
                    <MenuItem value="B">Text Input</MenuItem>
                    <MenuItem value="C">Numeric Scale (1-5)</MenuItem>
                  </Select>
                </StyledFormControl>
              </HolographicCard>
            </Tilt3D>
          </AnimatedContainer>

          {/* Options Section */}
          {formData.type === 'A' && (
            <AnimatedContainer animationType="float" duration={0.6} delay={0.3}>
              <Tilt3D maxTiltDeg={5} scale={1.01}>
                <HolographicCard sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 2 }}>
                    Answer Options
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <StyledTextField
                      size="small"
                      placeholder="Add new option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addOption()}
                      sx={{ flexGrow: 1 }}
                    />
                    <StyledButton
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={addOption}
                      disabled={!newOption.trim()}
                      size="small"
                    >
                      Add
                    </StyledButton>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
                    {formData.options.map((option, index) => (
                      <StyledChip
                        key={index}
                        label={option}
                        onDelete={() => removeOption(index)}
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  
                  {formData.options.length === 0 && (
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic' }}>
                      No options added yet. Add at least one option for multiple choice questions.
                    </Typography>
                  )}
                </HolographicCard>
              </Tilt3D>
            </AnimatedContainer>
          )}

          {/* Type Information */}
          {formData.type === 'B' && (
            <AnimatedContainer animationType="float" duration={0.6} delay={0.3}>
              <Tilt3D maxTiltDeg={5} scale={1.01}>
                <HolographicCard sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 2 }}>
                    Text Input Question
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Text input questions allow users to enter free-form text responses. 
                    Users can type any text up to 255 characters.
                  </Typography>
                </HolographicCard>
              </Tilt3D>
            </AnimatedContainer>
          )}

          {formData.type === 'C' && (
            <AnimatedContainer animationType="float" duration={0.6} delay={0.3}>
              <Tilt3D maxTiltDeg={5} scale={1.01}>
                <HolographicCard sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 2 }}>
                    Numeric Scale Question
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Numeric scale questions allow users to rate on a scale from 1 to 5. 
                    This is useful for measuring satisfaction, agreement, or other quantitative responses.
                  </Typography>
                </HolographicCard>
              </Tilt3D>
            </AnimatedContainer>
          )}
        </Box>
      </StyledDialogContent>

      <StyledDialogActions>
        <StyledButton onClick={onClose} disabled={loading} variant="outlined">
          Cancel
        </StyledButton>
        <StyledButton
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !formData.question_text.trim() || (formData.type === 'A' && formData.options.length === 0)}
        >
          {loading ? 'Updating...' : 'Update Question'}
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default EditQuestionModal