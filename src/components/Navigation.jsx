import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  CheckCircle as GoalsIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const Navigation = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navItems = [
    { label: t('dashboard'), path: '/', icon: HomeIcon },
    { label: t('allGoals'), path: '/goals', icon: GoalsIcon },
    { label: t('newGoal'), path: '/goals/new', icon: AddIcon },
    { label: t('category'), path: '/categories', icon: CategoryIcon },
    { label: t('settings'), path: '/settings', icon: SettingsIcon },
  ]

  const NavContent = () => (
    <List>
      {navItems.map((item) => (
        <ListItem
          button
          key={item.path}
          component={RouterLink}
          to={item.path}
          selected={location.pathname === item.path}
          onClick={() => setDrawerOpen(false)}
          sx={{
            '&.Mui-selected': {
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            },
          }}
        >
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" variant="text">
                📊 {t('dashboard')}
              </Button>
            </RouterLink>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.slice(1).map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={RouterLink}
                to={item.path}
                sx={{
                  borderBottom:
                    location.pathname === item.path ? '2px solid white' : 'none',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              const newLang = i18n.language === 'en' ? 'fa' : 'en'
              i18n.changeLanguage(newLang)
              localStorage.setItem('language', newLang)
            }}
            sx={{ ml: 1 }}
          >
            {i18n.language === 'en' ? 'فا' : 'EN'}
          </Button>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 250, pt: 2 }}>
            <NavContent />
          </Box>
        </Drawer>
      )}
    </>
  )
}

export default Navigation
