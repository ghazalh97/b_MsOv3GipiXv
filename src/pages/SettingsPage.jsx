import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { resetAllData } from '../utils/storage'

const SettingsPage = () => {
  const { t, i18n } = useTranslation()
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark')
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [resetMessage, setResetMessage] = useState('')

  const handleLanguageChange = (e) => {
    const newLang = e.target.value
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  const handleThemeChange = (e) => {
    const isDark = e.target.checked
    setDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    // Note: Actual theme switching would require provider integration
  }

  const handleResetData = () => {
    resetAllData()
    setResetMessage(t('resetSuccess') || 'Data reset successfully!')
    setConfirmDialogOpen(false)
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        {t('settings')}
      </Typography>

      {resetMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {resetMessage}
        </Alert>
      )}

      {/* Language Settings */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            {t('language')}
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>{t('selectLanguage') || 'Select Language'}</InputLabel>
            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              label={t('selectLanguage') || 'Select Language'}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fa">فارسی</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            {t('languageDescription') || 'The UI will adjust text and layout direction based on selected language.'}
          </Typography>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            {t('theme')}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleThemeChange}
              />
            }
            label={darkMode ? t('darkMode') : t('lightMode')}
          />
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            {t('themeDescription') || 'Toggle between light and dark mode for comfortable viewing.'}
          </Typography>
        </CardContent>
      </Card>

      <Divider sx={{ my: 2 }} />

      {/* Data Management */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            {t('dataManagement') || 'Data Management'}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setConfirmDialogOpen(true)}
          >
            {t('resetData') || 'Reset All Data'}
          </Button>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            {t('resetWarning') || 'This will delete all your goals and reset your progress. This action cannot be undone.'}
          </Typography>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            {t('about') || 'About'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t('aboutDescription') || 'Goal Tracker Dashboard v1.0 - Achieve your goals and track your progress with ease.'}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="caption" color="textSecondary">
                {t('builtWith') || 'Built with'}
              </Typography>
              <Typography variant="body2">React, Vite, Material-UI</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Reset Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>{t('confirm')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('resetConfirmation') || 'Are you sure you want to reset all data? This action cannot be undone.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>
            {t('cancel')}
          </Button>
          <Button
            onClick={handleResetData}
            color="error"
            variant="contained"
          >
            {t('resetData') || 'Reset'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SettingsPage
