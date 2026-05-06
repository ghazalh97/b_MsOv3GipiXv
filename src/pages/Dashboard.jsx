import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getGoals, getUserStats } from '../utils/storage'
import GoalCard from '../components/GoalCard'

const Dashboard = () => {
  const { t } = useTranslation()
  const [goals, setGoals] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const allGoals = getGoals()
    setGoals(allGoals)
    setStats(getUserStats())
  }

  const activeGoals = goals.filter(g => g.status === 'active')
  const completedGoals = goals.filter(g => g.status === 'completed')

  const totalTarget = activeGoals.reduce((sum, g) => sum + g.target, 0)
  const totalProgress = activeGoals.reduce((sum, g) => sum + g.progress, 0)
  const overallCompletion = totalTarget > 0 ? (totalProgress / totalTarget) * 100 : 0

  const StatCard = ({ label, value, color = 'primary' }) => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`,
        border: `2px solid ${color}`,
      }}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          {t('dashboard')}
        </Typography>

        {/* Summary Stats */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              label={t('overallCompletion')}
              value={`${Math.round(overallCompletion)}%`}
              color="#2196F3"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              label={t('totalCompleted')}
              value={stats?.completedCount || 0}
              color="#4CAF50"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              label={t('streak')}
              value={`${stats?.streak || 0} ${t('days')}`}
              color="#FF9800"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              label={t('xp')}
              value={stats?.xpTotal || 0}
              color="#9C27B0"
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/goals/new"
            size="large"
          >
            ➕ {t('newGoal')}
          </Button>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/goals"
            size="large"
          >
            📋 {t('allGoals')}
          </Button>
        </Box>
      </Box>

      {/* Active Goals */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          {t('activeGoals')} ({activeGoals.length})
        </Typography>
        {activeGoals.length > 0 ? (
          <Box>
            {activeGoals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onUpdate={loadData}
                onDelete={loadData}
                showDetails
              />
            ))}
          </Box>
        ) : (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="textSecondary">
                {t('noGoals')}
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/goals/new"
                sx={{ mt: 2 }}
              >
                {t('createGoal')}
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Completed Goals Preview */}
      {completedGoals.length > 0 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            {t('completedGoals')} ({completedGoals.length})
          </Typography>
          <Box sx={{ display: { xs: 'grid', sm: 'grid' }, gap: 2 }}>
            {completedGoals.slice(0, 3).map(goal => (
              <Card key={goal.id} sx={{ opacity: 0.7 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body1">
                      ✅ {goal.title}
                    </Typography>
                    <Typography variant="caption" color="success.main">
                      {goal.progress}/{goal.target}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          {completedGoals.length > 3 && (
            <Button
              component={RouterLink}
              to="/goals"
              sx={{ mt: 2 }}
              variant="text"
            >
              {t('archive')}
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Dashboard
