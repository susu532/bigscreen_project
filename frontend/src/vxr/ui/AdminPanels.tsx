import { Box } from '@mui/material'
import AnimatedTitle from '../../components/AnimatedTitle'
import HolographicCard from '../../components/HolographicCard'
import AnimatedContainer from '../../components/animations/AnimatedContainer'

export default function AdminPanels() {
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', p: 2 }}>
      <AnimatedTitle title="Admin Command" subtitle="Quick Stats" align="left" variant="h5" />
      <AnimatedContainer animationType="float" duration={0.8}>
        <HolographicCard sx={{ p: 2 }}>
          Placeholder for admin stats and quick actions.
        </HolographicCard>
      </AnimatedContainer>
    </Box>
  )
}


