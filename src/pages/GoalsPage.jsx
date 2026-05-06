import { useState, useEffect, useMemo } from 'react'
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getGoals } from '../utils/storage'
import GoalCard from '../components/GoalCard'

const GoalsPage = () => {
  const { t } = useTranslation()
  const [goals, setGoals] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = () => {
    setGoals(getGoals())
  }

  const filteredAndSortedGoals = useMemo(() => {
    let filtered = goals

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(g => g.status === filterStatus)
    }

    // Filter by search
    if (searchText) {
      filtered = filtered.filter(g =>
        g.title.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    // Sort
    const sorted = [...filtered]
    if (sortBy === 'progress') {
      sorted.sort((a, b) => {
        const aProgress = a.target > 0 ? (a.progress / a.target) * 100 : 0
        const bProgress = b.target > 0 ? (b.progress / b.target) * 100 : 0
        return bProgress - aProgress
      })
    } else if (sortBy === 'newest') {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
    } else if (sortBy === 'category') {
      sorted.sort((a, b) => a.category.localeCompare(b.category))
    }

    return sorted
  }, [goals, filterStatus, searchText, sortBy])

  const statusTabs = ['all', 'active', 'paused', 'completed']

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        {t('goals')}
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder={t('searchGoals') || 'Search goals...'}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>{t('sort')}</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label={t('sort')}
              >
                <MenuItem value="newest">{t('newest') || 'Newest'}</MenuItem>
                <MenuItem value="progress">{t('progress')}</MenuItem>
                <MenuItem value="category">{t('category')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Status Tabs */}
      <Tabs
        value={filterStatus}
        onChange={(e, value) => setFilterStatus(value)}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {statusTabs.map(status => (
          <Tab
            key={status}
            label={t(status)}
            value={status}
          />
        ))}
      </Tabs>

      {/* Goals List */}
      {filteredAndSortedGoals.length > 0 ? (
        <Box>
          {filteredAndSortedGoals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={loadGoals}
              onDelete={loadGoals}
              showDetails
            />
          ))}
        </Box>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="textSecondary">
              {t('noGoals')}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default GoalsPage
