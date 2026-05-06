import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import Dashboard from './pages/Dashboard'
import GoalsPage from './pages/GoalsPage'
import CreateGoalPage from './pages/CreateGoalPage'
import GoalDetailsPage from './pages/GoalDetailsPage'
import CategoriesPage from './pages/CategoriesPage'
import SettingsPage from './pages/SettingsPage'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  const [dir, setDir] = useState('ltr')

  useEffect(() => {
    // Set direction based on language
    const language = localStorage.getItem('language') || 'en'
    const direction = language === 'fa' ? 'rtl' : 'ltr'
    setDir(direction)
    document.documentElement.dir = direction
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Navigation />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              pt: { xs: 10, md: 8 },
              pb: 3,
              px: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <Container maxWidth="lg">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/goals/new" element={<CreateGoalPage />} />
                <Route path="/goals/:id" element={<GoalDetailsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
