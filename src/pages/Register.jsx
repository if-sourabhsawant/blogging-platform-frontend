import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Container, 
  Box, 
  Typography, 
  Alert, 
  Snackbar, 
  Paper, 
  Fade, 
  Grow, 
  useTheme, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  CircularProgress,
  Zoom,
  alpha
} from '@mui/material';
import { 
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Login as LoginIcon
} from '@mui/icons-material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const validateForm = () => {
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('All fields are required');
      setOpenSnackbar(true);
      return false;
    }
    if (!/^[a-zA-Z0-9_\s]{3,30}$/.test(formData.username.trim())) {
      setError('Username must be 3-30 characters long and can only contain letters, numbers, underscores, and spaces');
      setOpenSnackbar(true);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      setOpenSnackbar(true);
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setOpenSnackbar(true);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await axios.post('http://localhost:5000/api/auth/register', {
        ...registerData,
        username: registerData.username.trim(),
        email: registerData.email.trim()
      });
      
      // Show success dialog instead of just a snackbar
      setSuccessMessage(`Account created successfully!\nWelcome to Blog Platform, ${registerData.username}!`);
      setRegistrationSuccess(true);
      
      // We'll navigate to login from the success dialog's button click
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSuccessDialogClose = () => {
    navigate('/login');
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
              <PersonAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
                Create Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Join our community of writers and readers
              </Typography>
            </Box>
          </Fade>
          {error && (
            <Fade in={true}>
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
            </Fade>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Fade in={true} timeout={2000}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
                autoFocus
                autoComplete="username"
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
            <Fade in={true} timeout={3000}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="new-password"
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
            <Fade in={true} timeout={3500}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="new-password"
                error={Boolean(formData.confirmPassword && formData.password !== formData.confirmPassword)}
                helperText={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords must match.' : ''}
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
            <Fade in={true} timeout={4000}>
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
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Fade>
            <Fade in={true} timeout={4500}>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      textDecoration: 'none', 
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign in
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
        open={registrationSuccess}
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
                Success!
              </Typography>
            </Box>
          </Zoom>
        </DialogTitle>
        <DialogContent>
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {successMessage}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Please sign in with your new account credentials.
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
              startIcon={<LoginIcon />}
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
              Go to Login
            </Button>
          </Fade>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Register;
