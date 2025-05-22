import { Box, Container, Grid, Typography, Link, IconButton, Divider, Fade, Zoom, useTheme, alpha } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, Email, Phone, LocationOn, ArrowUpward } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        py: 8,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 50%, #1976d2 100%)',
          boxShadow: '0 2px 10px rgba(25, 118, 210, 0.2)'
        }
      }}
    >
      <IconButton 
        onClick={scrollToTop}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            transform: 'translateY(-3px)'
          },
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <ArrowUpward />
      </IconButton>
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography 
              variant="h5" 
              color="primary" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px'
              }}
            >
              BLOG PLATFORM
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', mb: 2 }}>
              A place where ideas come to life. Share your thoughts, connect with others, and discover amazing content.
            </Typography>
          </Box>
        </Fade>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Zoom in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
              <Box>
                <Typography 
                  variant="h6" 
                  color="text.primary" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '40px',
                      height: '2px',
                      backgroundColor: theme.palette.primary.main
                    }
                  }}
                >
                  About Us
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                  Share your thoughts, ideas, and stories with the world. Join our community of writers and readers.
                </Typography>
                <Box sx={{ 
                  mt: 3, 
                  display: 'flex', 
                  gap: 1,
                  '& .MuiIconButton-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)'
                    }
                  }
                }}>
                  <IconButton 
                    color="primary" 
                    aria-label="LinkedIn" 
                    href="https://www.linkedin.com/in/sourabh-sawant19"
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <LinkedIn fontSize="small" />
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    aria-label="Instagram" 
                    href="https://www.instagram.com/sourabh_sawant07/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <Instagram fontSize="small" />
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    aria-label="Twitter" 
                    href="#"
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <Twitter fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Zoom in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
              <Box>
                <Typography 
                  variant="h6" 
                  color="text.primary" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '40px',
                      height: '2px',
                      backgroundColor: theme.palette.primary.main
                    }
                  }}
                >
                  Quick Links
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1.5,
                  '& a': {
                    transition: 'all 0.2s ease-in-out',
                    position: 'relative',
                    width: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)'
                    },
                    '&::before': {
                      content: '""',
                      width: '0',
                      height: '1px',
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      backgroundColor: 'currentColor',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover::before': {
                      width: '100%'
                    }
                  }
                }}>
                  <Link href="/" color="text.secondary" underline="none">
                    Home
                  </Link>
                  <Link href="/about" color="text.secondary" underline="none">
                    About Us
                  </Link>
                  <Link href="/contact" color="text.secondary" underline="none">
                    Contact
                  </Link>
                  <Link href="/privacy-policy" color="text.secondary" underline="none">
                    Privacy Policy
                  </Link>
                </Box>
              </Box>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Zoom in={true} timeout={800} style={{ transitionDelay: '600ms' }}>
              <Box>
                <Typography 
                  variant="h6" 
                  color="text.primary" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '40px',
                      height: '2px',
                      backgroundColor: theme.palette.primary.main
                    }
                  }}
                >
                  Contact Us
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <LocationOn fontSize="small" color="primary" sx={{ mt: 0.3 }} />
                    <Typography variant="body2" color="text.secondary">
                      Karve Nagar, Pune, Maharashtra
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Email fontSize="small" color="primary" />
                    <Typography variant="body2" color="text.secondary">
                      developer@blogplatform.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Phone fontSize="small" color="primary" />
                    <Typography variant="body2" color="text.secondary">
                      (91) 7972720487
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Zoom>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Fade in={true} timeout={1500}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
              sx={{ 
                opacity: 0.8,
                '& a': {
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }
              }}
            >
              © {currentYear} <Link href="/" color="inherit">Blog Platform</Link>. All rights reserved.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, opacity: 0.6 }}>
              Designed with ❤️ by Sourabh Sawant
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Footer;
