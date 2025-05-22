import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Alert, 
  Box, 
  Fade, 
  Grow, 
  useTheme,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Zoom,
  alpha
} from '@mui/material';
import { 
  Login as LoginIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;
      
      // Store user data and token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update state
      setIsAuthenticated(true);
      setUser(user);
      setUserData(user);
      
      // Show success dialog
      setSuccessMessage(`Welcome back, ${user.username || 'User'}!`);
      setLoginSuccess(true);
      
      // We'll navigate to home from the success dialog
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSuccessDialogClose = () => {
    navigate('/');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth={false} sx={{ 
      py: 8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 64px)' // Subtract navbar height
    }}>
      <Grow in={true} timeout={1000}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            width: '100%',
            maxWidth: '450px',
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Fade in={true} timeout={1500}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to continue to your account
              </Typography>
            </Box>
          </Fade>
          {/* Error message is now shown in snackbar instead */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Fade in={true} timeout={2000}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="email"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Fade>
            <Fade in={true} timeout={2500}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="current-password"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Fade>
            <Fade in={true} timeout={3000}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ 
                  py: 1.5, 
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: loading ? 'none' : 'translateY(-2px)',
                    boxShadow: loading ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 6px 16px rgba(0, 0, 0, 0.15)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Fade>
            <Fade in={true} timeout={3500}>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    style={{ 
                      textDecoration: 'none', 
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Create one
                  </Link>
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Paper>
      </Grow>
      
      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          sx={{ 
            width: '100%',
            boxShadow: '0 4px 20px rgba(211, 47, 47, 0.2)',
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
          icon={<ErrorIcon fontSize="inherit" />}
        >
          {error}
        </Alert>
      </Snackbar>
      
      {/* Success Dialog */}
      <Dialog
        open={loginSuccess}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            padding: 2,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 0 }}>
          <Zoom in={true} timeout={800}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}>
              <CheckCircleIcon 
                color="success" 
                sx={{ 
                  fontSize: 80,
                  mb: 2,
                  filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))'
                }} 
              />
              <Typography variant="h4" fontWeight={700} color="success.main">
                Login Successful!
              </Typography>
            </Box>
          </Zoom>
        </DialogTitle>
        <DialogContent>
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" paragraph>
                {successMessage}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                You are now logged in to your account.
              </Typography>
            </Box>
          </Fade>
          <Fade in={true} timeout={1200}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSuccessDialogClose}
              startIcon={<HomeIcon />}
              sx={{ 
                py: 1.5, 
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Go to Home Page
            </Button>
          </Fade>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Login;
