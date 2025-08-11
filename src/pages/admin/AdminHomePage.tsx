import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Box, Paper, Typography, LinearProgress, Alert } from '@mui/material'
import { Pie, Radar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js'

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

  if (loading) return <Box p={4}><LinearProgress /></Box>
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>

  const pieOptions = { responsive: true, plugins: { legend: { position: 'bottom' as const } } }
  const radarOptions = { responsive: true, scales: { r: { suggestedMin: 0, suggestedMax: 5 } } }

  function toPieData(chart: PieChart | null) {
    const labels = chart?.labels || []
    const data = chart?.data || []
    return { labels, datasets: [{ data, backgroundColor: ['#1976d2','#9c27b0','#f44336','#ff9800','#4caf50'] }] }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Statistics</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
        <Paper sx={{ p:2 }}>
          <Typography variant="subtitle1">Purchase Frequency (Q6)</Typography>
          <Pie data={toPieData(pie6)} options={pieOptions} />
        </Paper>
        <Paper sx={{ p:2 }}>
          <Typography variant="subtitle1">Recommendation Likelihood (Q7)</Typography>
          <Pie data={toPieData(pie7)} options={pieOptions} />
        </Paper>
        <Paper sx={{ p:2 }}>
          <Typography variant="subtitle1">Product Category (Q10)</Typography>
          <Pie data={toPieData(pie10)} options={pieOptions} />
        </Paper>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p:2 }}>
          <Typography variant="subtitle1">Quality (Q11-Q15)</Typography>
          <Radar data={radar || { labels: [], datasets: [] }} options={radarOptions} />
        </Paper>
      </Box>
    </Box>
  )
}


