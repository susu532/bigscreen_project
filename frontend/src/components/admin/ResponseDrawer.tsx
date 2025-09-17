import React from 'react'
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tooltip
} from '@mui/material'
import { Close as CloseIcon, Email as EmailIcon, AccessTime as TimeIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import HolographicCard from '../HolographicCard'
import AnimatedContainer from '../animations/AnimatedContainer'
import Tilt3D from '../effects/Tilt3D'

// Styled components for the drawer
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98) 0%, rgba(30, 20, 40, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 20, 147, 0.3)',
    borderLeft: 'none',
    borderRadius: '20px 0 0 20px',
    boxShadow: `
      0 25px 50px rgba(255, 20, 147, 0.2),
      0 0 100px rgba(153, 50, 204, 0.1),
      inset 0 0 30px rgba(255, 20, 147, 0.05)
    `,
    color: '#ffffff',
    width: '500px',
    maxWidth: '90vw',
    overflow: 'hidden'
  }
}))

const DrawerHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.1) 0%, rgba(153, 50, 204, 0.1) 100%)',
  borderBottom: '1px solid rgba(255, 20, 147, 0.2)',
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const DrawerContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflow: 'auto',
  height: '100%',
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

const StyledChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.2) 0%, rgba(153, 50, 204, 0.2) 100%)',
  border: '1px solid rgba(255, 20, 147, 0.3)',
  color: '#ffffff',
  margin: theme.spacing(0.5)
}))

const QuestionCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 20, 147, 0.2)',
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  }
}))

interface Answer {
  question_id: number
  question_text: string
  answer: string
  type: string
}

interface Response {
  id: number
  email: string
  submitted_at: string
  answers: Answer[]
}

interface ResponseDrawerProps {
  open: boolean
  onClose: () => void
  response: Response | null
}

const ResponseDrawer: React.FC<ResponseDrawerProps> = ({
  open,
  onClose,
  response
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'A': return 'Multiple Choice'
      case 'B': return 'Text Input'
      case 'C': return 'Numeric Scale'
      default: return 'Unknown'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'A': return 'rgba(255, 20, 147, 0.8)'
      case 'B': return 'rgba(153, 50, 204, 0.8)'
      case 'C': return 'rgba(138, 43, 226, 0.8)'
      default: return 'rgba(255, 255, 255, 0.5)'
    }
  }

  if (!response) return null

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true
      }}
    >
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ 
            background: 'linear-gradient(45deg, rgba(255, 20, 147, 0.8), rgba(153, 50, 204, 0.8))',
            width: 40,
            height: 40
          }}>
            <EmailIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff' }}>
              Response Details
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              ID: {response.id}
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Close">
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: 'rgba(255, 20, 147, 0.8)',
              '&:hover': {
                background: 'rgba(255, 20, 147, 0.1)',
                color: '#ff1493'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DrawerHeader>

      <DrawerContent>
        {/* Response Info */}
        <AnimatedContainer animationType="float" duration={0.6} delay={0.1}>
          <Tilt3D maxTiltDeg={3} scale={1.01}>
            <HolographicCard sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 2 }}>
                Response Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <EmailIcon sx={{ color: 'rgba(255, 20, 147, 0.8)' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Email Address
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 500 }}>
                    {response.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TimeIcon sx={{ color: 'rgba(153, 50, 204, 0.8)' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Submitted At
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 500 }}>
                    {new Date(response.submitted_at).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </HolographicCard>
          </Tilt3D>
        </AnimatedContainer>

        {/* Answers */}
        <AnimatedContainer animationType="float" duration={0.6} delay={0.2}>
          <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 2 }}>
            Answers ({response.answers.length})
          </Typography>
        </AnimatedContainer>

        {response.answers.map((answer, index) => (
          <AnimatedContainer 
            key={`${response.id}-${answer.question_id}`}
            animationType="float" 
            duration={0.6} 
            delay={0.3 + (index * 0.1)}
          >
            <Tilt3D maxTiltDeg={3} scale={1.01}>
              <QuestionCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <StyledChip 
                      label={`Q${answer.question_id}`}
                      size="small"
                      sx={{ 
                        background: getTypeColor(answer.type),
                        color: '#ffffff',
                        fontWeight: 600
                      }}
                    />
                    <StyledChip 
                      label={getTypeLabel(answer.type)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  <Typography 
                    variant="subtitle2" 
                    gutterBottom 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 1,
                      fontSize: '0.9rem'
                    }}
                  >
                    Question
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#ffffff',
                      mb: 2,
                      fontWeight: 500,
                      lineHeight: 1.4
                    }}
                  >
                    {answer.question_text}
                  </Typography>

                  <Typography 
                    variant="subtitle2" 
                    gutterBottom 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 1,
                      fontSize: '0.9rem'
                    }}
                  >
                    Answer
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#ffffff',
                      fontWeight: 600,
                      background: 'rgba(255, 20, 147, 0.1)',
                      padding: 1.5,
                      borderRadius: 1,
                      border: '1px solid rgba(255, 20, 147, 0.2)',
                      wordBreak: 'break-word'
                    }}
                  >
                    {answer.answer}
                  </Typography>
                </CardContent>
              </QuestionCard>
            </Tilt3D>
          </AnimatedContainer>
        ))}
      </DrawerContent>
    </StyledDrawer>
  )
}

export default ResponseDrawer