import { useMemo } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useTranslation } from 'react-i18next'
import { getGoals } from '../utils/storage'

const categoryColors = {
  Health: '#4CAF50',
  Study: '#2196F3',
  Work: '#FF9800',
  Personal: '#9C27B0',
  Other: '#757575',
}

const CategoriesPage = () => {
  const { t } = useTranslation()
  const goals = getGoals()

  const categoryStats = useMemo(() => {
    const stats = {}
    goals.forEach(goal => {
      if (!stats[goal.category]) {
        stats[goal.category] = {
          category: goal.category,
          active: 0,
          completed: 0,
          total: 0,
          progress: 0,
          target: 0,
        }
      }
      stats[goal.category].total += 1
      if (goal.status === 'active') stats[goal.category].active += 1
      if (goal.status === 'completed') stats[goal.category].completed += 1
      stats[goal.category].progress += goal.progress
      stats[goal.category].target += goal.target
    })
    return Object.values(stats)
  }, [goals])

  const chartData = categoryStats.map(cat => ({
    name: cat.category,
    active: cat.active,
    completed: cat.completed,
  }))

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        {t('category')}
      </Typography>

      {/* Chart */}
      {categoryStats.length > 0 && (
        <Card sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('overview') || 'Category Overview'}
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="active" fill="#2196F3" name={t('active')} />
              <Bar dataKey="completed" fill="#4CAF50" name={t('completed')} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Category Cards */}
      <Grid container spacing={2}>
        {categoryStats.map(cat => {
          const progressPercent = cat.target > 0 ? (cat.progress / cat.target) * 100 : 0
          const color = categoryColors[cat.category] || categoryColors.Other
          return (
            <Grid item xs={12} sm={6} md={4} key={cat.category}>
              <Card
                sx={{
                  borderTop: `4px solid ${color}`,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {cat.category}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label={`${t('active')}: ${cat.active}`}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      label={`${t('completed')}: ${cat.completed}`}
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {t('total')}: {cat.total}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption">{t('progress')}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {cat.progress}/{cat.target}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(progressPercent, 100)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: color,
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      {Math.round(progressPercent)}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {categoryStats.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="textSecondary">
              {t('noGoals')}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default CategoriesPage
