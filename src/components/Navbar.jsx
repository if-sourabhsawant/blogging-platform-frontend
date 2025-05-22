import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  Slide,
  Fade,
  Zoom,
  Badge,
  alpha,
  useScrollTrigger,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create as CreateIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Logout as LogoutIcon,
  Article as ArticleIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';

// Hide navbar on scroll down, show on scroll up
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ isAuthenticated, user, setIsAuthenticated, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    handleCloseUserMenu();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = isAuthenticated
    ? [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Create Post', icon: <CreateIcon />, path: '/create-post' },
        { text: 'Bookmarks', icon: <BookmarkIcon />, path: '/bookmarks' },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      ]
    : [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Login', icon: <LoginIcon />, path: '/login' },
        { text: 'Register', icon: <RegisterIcon />, path: '/register' },
      ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={scrolled ? 2 : 0} 
        sx={{ 
          bgcolor: scrolled ? 'background.paper' : alpha(theme.palette.background.paper, 0.98),
          borderBottom: scrolled ? 0 : 1, 
          borderColor: 'divider',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: 'blur(8px)'
        }}
      >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, sm: 70 } }}>
        <Zoom in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Zoom>

        <Fade in={true} timeout={1000}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ArticleIcon 
              color="primary" 
              sx={{ 
                display: { xs: 'none', sm: 'flex' }, 
                mr: 1,
                fontSize: '2rem',
                filter: 'drop-shadow(0 2px 4px rgba(25, 118, 210, 0.3))'
              }} 
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'flex' },
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
                letterSpacing: '.1rem',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '0',
                  height: '2px',
                  bottom: '-2px',
                  left: '0',
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  transition: 'width 0.3s ease-in-out',
                },
                '&:hover::after': {
                  width: '100%',
                },
              }}
            >
              BLOG PLATFORM
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          {menuItems.filter(item => item.text !== 'Create Post' && item.text !== 'Bookmarks').map((item, index) => (
            <Fade 
              key={item.text} 
              in={true} 
              timeout={1000}
              style={{ transitionDelay: `${200 + (index * 100)}ms` }}
            >
              <Button
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: isActive(item.path) ? 'primary.main' : 'text.primary',
                  fontWeight: isActive(item.path) ? 600 : 500,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: isActive(item.path) ? 0 : '50%',
                    width: isActive(item.path) ? '100%' : 0,
                    height: '2px',
                    backgroundColor: theme.palette.primary.main,
                    transition: 'all 0.3s ease-in-out',
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    '&::after': {
                      left: 0,
                      width: '100%',
                    },
                  },
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {item.text}
              </Button>
            </Fade>
          ))}
          {isAuthenticated && (
            <>
              <Button
                component={Link}
                to="/bookmarks"
                startIcon={<BookmarkIcon />}
                sx={{
                  color: isActive('/bookmarks') ? 'primary.main' : 'text.primary',
                  fontWeight: isActive('/bookmarks') ? 600 : 500,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: isActive('/bookmarks') ? 0 : '50%',
                    width: isActive('/bookmarks') ? '100%' : 0,
                    height: '2px',
                    backgroundColor: theme.palette.primary.main,
                    transition: 'all 0.3s ease-in-out',
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    '&::after': {
                      left: 0,
                      width: '100%',
                    },
                  },
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                Bookmarks
              </Button>
              <Button
                component={Link}
                to="/create-post"
                startIcon={<CreateIcon />}
                sx={{
                  color: isActive('/create-post') ? 'primary.main' : 'text.primary',
                  fontWeight: isActive('/create-post') ? 600 : 500,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: isActive('/create-post') ? 0 : '50%',
                    width: isActive('/create-post') ? '100%' : 0,
                    height: '2px',
                    backgroundColor: theme.palette.primary.main,
                    transition: 'all 0.3s ease-in-out',
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    '&::after': {
                      left: 0,
                      width: '100%',
                    },
                  },
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                Create Post
              </Button>
            </>
          )}
        </Box>

        {isAuthenticated && (
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '200px'
              }}
            >
              {user?.username?.split('_').join(' ')}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  alt={user ? user.username : 'User'} 
                  src="/avatar.jpg"
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    width: 32,
                    height: 32,
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  {user?.username?.split('_').join(' ').charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </Container>

    <Drawer
      container={window.document.body}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
      }}
    >
      {drawer}
    </Drawer>
  </AppBar>
</HideOnScroll>
  );
};

export default Navbar;
