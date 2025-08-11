import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { Box, Drawer, List, ListItemButton, ListItemText, Toolbar, AppBar, Typography, Button } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

const drawerWidth = 260

/**
 * Admin layout with fixed sidebar and scrollable content.
 */
export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (!isAuthenticated) {
    navigate('/administration')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Bigscreen Admin</Typography>
          <Button color="inherit" onClick={() => { logout(); navigate('/administration') }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }}>
        <Toolbar />
        <List>
          <ListItemButton component={Link} to="/admin" selected={location.pathname === '/admin'}>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/questions" selected={location.pathname.includes('/admin/questions')}>
            <ListItemText primary="Questionnaire" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/responses" selected={location.pathname.includes('/admin/responses')}>
            <ListItemText primary="Responses" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}





