import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Box, Typography, Alert, Container } from '@mui/material'
import { GradientContainer, GlowingTypography } from '../../components/styled/StyledComponents'
import HolographicCard from '../../components/HolographicCard'
import AnimatedContainer from '../../components/animations/AnimatedContainer'
import AnimatedProgress from '../../components/AnimatedProgress'
import Tilt3D from '../../components/effects/Tilt3D'
import { Pie, Radar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js'
import AnimatedTitle from '../../components/AnimatedTitle'

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler)

type PieChart = { labels: string[]; data: number[]; question?: string; total?: number }

/**
 * Admin dashboard with charts for equipment and quality.
 */
export default function AdminHomePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pie6, setPie6] = useState<PieChart | null>(null)
  const [pie7, setPie7] = useState<PieChart | null>(null)
  const [pie10, setPie10] = useState<PieChart | null>(null)
  const [radar, setRadar] = useState<{ labels: string[]; datasets: any[] } | null>(null)

  useEffect(() => {
    api.get('/admin/dashboard').then(r => {
      const d = r.data?.data || {}
      setPie6(d.pie_charts?.purchase_frequency || null)
      setPie7(d.pie_charts?.recommendation_likelihood || null)
      setPie10(d.pie_charts?.product_category || null)
      setRadar(d.radar_chart || null)
    }).catch(() => setError('Failed to load stats')).finally(() => setLoading(false))
  }, [])

  if (loading) return <Box p={4}><AnimatedProgress /></Box>
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>

  const pieOptions = { responsive: true, plugins: { legend: { position: 'bottom' as const } } }
  const radarOptions = { responsive: true, scales: { r: { suggestedMin: 0, suggestedMax: 5 } } }

  function toPieData(chart: PieChart | null) {
    const labels = chart?.labels || []
    const data = chart?.data || []
    return { labels, datasets: [{ data, backgroundColor: ['#1976d2','#9c27b0','#f44336','#ff9800','#4caf50'] }] }
  }

  return (
    <GradientContainer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AnimatedTitle title="Statistics" subtitle="Key insights at a glance" align="left" variant="h5" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {[pie6, pie7, pie10].map((chart, i) => (
            <AnimatedContainer key={i} animationType="float" duration={0.8} delay={i * 0.05}>
              <Tilt3D>
                <HolographicCard sx={{ p:2 }}>
                  <Typography variant="subtitle1">{['Purchase Frequency (Q6)','Recommendation Likelihood (Q7)','Product Category (Q10)'][i]}</Typography>
                  <Pie data={toPieData(chart)} options={pieOptions} />
                </HolographicCard>
              </Tilt3D>
            </AnimatedContainer>
          ))}
        </Box>
        <Box sx={{ mt: 2 }}>
          <AnimatedContainer animationType="float" duration={0.8} delay={0.15}>
            <Tilt3D>
              <HolographicCard sx={{ p:2 }}>
                <Typography variant="subtitle1">Quality (Q11-Q15)</Typography>
                <Radar data={radar || { labels: [], datasets: [] }} options={radarOptions} />
              </HolographicCard>
            </Tilt3D>
          </AnimatedContainer>
        </Box>
      </Container>
    </GradientContainer>
  )
}


