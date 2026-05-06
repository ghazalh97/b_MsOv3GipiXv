import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Chip,
  LinearProgress,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as ResumeIcon,
  Pause as PauseIcon,
  CheckCircle as CompleteIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { updateGoal, deleteGoal, addProgressLog } from '../utils/storage'

const categoryColors = {
  Health: '#4CAF50',
  Study: '#2196F3',
  Work: '#FF9800',
  Personal: '#9C27B0',
  Other: '#757575',
}

const GoalCard = ({ goal, onUpdate, onDelete, showDetails = false }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const progress = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0
  const categoryColor = categoryColors[goal.category] || categoryColors.Other

  const handleMarkProgress = () => {
    const updated = addProgressLog(goal.id)
    onUpdate?.(updated)
  }

  const handleTogglePause = () => {
    const newStatus = goal.status === 'paused' ? 'active' : 'paused'
    const updated = updateGoal(goal.id, { status: newStatus })
    onUpdate?.(updated)
  }

  const handleDelete = () => {
    deleteGoal(goal.id)
    onDelete?.(goal.id)
    setDeleteDialogOpen(false)
  }

  const handleNavigateToDetails = () => {
    navigate(`/goals/${goal.id}`)
  }

  return (
    <>
      <Card
        sx={{
          mb: 2,
          borderLeft: `4px solid ${categoryColor}`,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-2px)',
          },
        }}
        onClick={showDetails ? handleNavigateToDetails : undefined}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ flex: 1, wordBreak: 'break-word' }}>
              {goal.title}
            </Typography>
            <Chip
              label={t(goal.status)}
              size="small"
              variant={goal.status === 'completed' ? 'filled' : 'outlined'}
              color={
                goal.status === 'completed'
                  ? 'success'
                  : goal.status === 'paused'
                    ? 'warning'
                    : 'primary'
              }
              sx={{ ml: 1 }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label={goal.category}
              size="small"
              sx={{ backgroundColor: categoryColor, color: 'white' }}
            />
            <Chip label={t(goal.type)} size="small" variant="outlined" />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {t('progress')}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {goal.progress}/{goal.target}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(progress, 100)}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: categoryColor,
                  borderRadius: 4,
                },
              }}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
              {Math.round(progress)}%
            </Typography>
          </Box>

          {goal.notes && (
            <Typography variant="body2" color="textSecondary">
              {goal.notes}
            </Typography>
          )}
        </CardContent>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box>
            <IconButton
              size="small"
              color="primary"
              onClick={handleMarkProgress}
              disabled={goal.status === 'paused' || goal.status === 'completed'}
              title={t('markProgress')}
            >
              <CompleteIcon />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={handleTogglePause}
              title={goal.status === 'paused' ? t('resume') : t('pause')}
            >
              {goal.status === 'paused' ? <ResumeIcon /> : <PauseIcon />}
            </IconButton>
          </Box>
          <Box>
            <IconButton
              size="small"
              color="primary"
              onClick={() => navigate(`/goals/${goal.id}`)}
              title={t('edit')}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
              title={t('delete')}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{t('delete')}</DialogTitle>
        <DialogContent>
          <Typography>{t('delete_confirmation')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GoalCard
