import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Chip,
  Alert,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getGoal, updateGoal, addProgressLog } from '../utils/storage'

const categoryColors = {
  Health: '#4CAF50',
  Study: '#2196F3',
  Work: '#FF9800',
  Personal: '#9C27B0',
  Other: '#757575',
}

const GoalDetailsPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [goal, setGoal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})
  const [progressAmount, setProgressAmount] = useState('1')

  useEffect(() => {
    loadGoal()
  }, [id])

  const loadGoal = () => {
    const g = getGoal(id)
    if (g) {
      setGoal(g)
      setFormData(g)
    }
    setLoading(false)
  }

  if (loading) {
    return <Typography>{t('loading') || 'Loading...'}</Typography>
  }

  if (!goal) {
    return (
      <Box>
        <Alert severity="error">{t('notFound')}</Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/goals')}
          sx={{ mt: 2 }}
        >
          {t('goHome')}
        </Button>
      </Box>
    )
  }

  const progress = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0
  const categoryColor = categoryColors[goal.category] || categoryColors.Other

  const handleSaveEdit = () => {
    const updated = updateGoal(id, formData)
    setGoal(updated)
    setEditMode(false)
  }

  const handleAddProgress = () => {
    const amount = parseInt(progressAmount)
    if (amount > 0) {
      const updated = addProgressLog(id, amount)
      setGoal(updated)
      setProgressAmount('1')
    }
  }

  const handleTogglePause = () => {
    const newStatus = goal.status === 'paused' ? 'active' : 'paused'
    const updated = updateGoal(id, { status: newStatus })
    setGoal(updated)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Box>
      <Button
        onClick={() => navigate('/goals')}
        sx={{ mb: 2 }}
      >
        ← {t('goHome')}
      </Button>

      <Grid container spacing={2}>
        {/* Goal Info */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderLeft: `4px solid ${categoryColor}` }}>
            <CardContent>
              {!editMode ? (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h4">{goal.title}</Typography>
                    <Chip
                      label={t(goal.status)}
                      color={
                        goal.status === 'completed'
                          ? 'success'
                          : goal.status === 'paused'
                            ? 'warning'
                            : 'primary'
                      }
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={goal.category} sx={{ backgroundColor: categoryColor, color: 'white' }} />
                    <Chip label={t(goal.type)} variant="outlined" />
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {goal.notes}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>{t('progress')}</Typography>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {goal.progress}/{goal.target} ({Math.round(progress)}%)
                      </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={Math.min(progress, 100)} sx={{ height: 10, borderRadius: 5 }} />
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        {t('startDate')}
                      </Typography>
                      <Typography>{goal.startDate}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        {t('endDate')}
                      </Typography>
                      <Typography>{goal.endDate || t('notSet') || 'Not set'}</Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      onClick={() => setEditMode(true)}
                    >
                      {t('edit')}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleTogglePause}
                    >
                      {goal.status === 'paused' ? t('resume') : t('pause')}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <TextField
                    fullWidth
                    label={t('goalTitle')}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label={t('notes')}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" onClick={handleSaveEdit}>
                      {t('save')}
                    </Button>
                    <Button variant="outlined" onClick={() => setEditMode(false)}>
                      {t('cancel')}
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Add Progress */}
        {goal.status !== 'completed' && (
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t('markProgress')}
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  label={t('amount')}
                  value={progressAmount}
                  onChange={(e) => setProgressAmount(e.target.value)}
                  inputProps={{ min: 1 }}
                  sx={{ mb: 2 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddProgress}
                >
                  {t('confirm')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Progress History */}
      {goal.logs && goal.logs.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('progressHistory') || 'Progress History'}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('date')}</TableCell>
                    <TableCell align="right">{t('amount')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...goal.logs]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((log, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{log.date}</TableCell>
                        <TableCell align="right">+{log.amount}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default GoalDetailsPage
