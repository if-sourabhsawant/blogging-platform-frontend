import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Alert, 
  CircularProgress, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Fade, 
  Grow, 
  Zoom,
  Chip,
  IconButton,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { 
  ArrowForward as ArrowForwardIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  AccessTime as AccessTimeIcon,
  BookmarkRemove as BookmarkRemoveIcon
} from '@mui/icons-material';

const Bookmarks = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load bookmarked posts from localStorage
    const savedBookmarks = localStorage.getItem('bookmarkedPosts');
    if (savedBookmarks) {
      try {
        setBookmarkedPosts(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Error parsing bookmarks:', e);
      }
    }
    
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts`);
      // Safely handle the response data
      const postsData = response.data?.posts || response.data || [];
      setPosts(Array.isArray(postsData) ? postsData : []);
      setError('');
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setError('Failed to fetch posts. Please try again later.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const removeBookmark = (postId) => {
    const newBookmarkedPosts = bookmarkedPosts.filter(id => id !== postId);
    setBookmarkedPosts(newBookmarkedPosts);
    localStorage.setItem('bookmarkedPosts', JSON.stringify(newBookmarkedPosts));
  };

  // Filter posts to only show bookmarked ones
  const bookmarkedPostsList = posts.filter(post => bookmarkedPosts.includes(post.id));

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
            Loading your bookmarks...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Fade in={true} timeout={800}>
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            fontWeight={700}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'primary.main'
            }}
          >
            <BookmarkIcon sx={{ mr: 1, fontSize: '2rem' }} />
            Your Bookmarks
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Here you can find all the posts you've bookmarked for later reading.
          </Typography>
          <Divider sx={{ mt: 2, mb: 4 }} />
        </Box>
      </Fade>

      {error && (
        <Fade in={true}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4, 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)' 
            }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {bookmarkedPostsList.length === 0 && !loading && !error ? (
        <Fade in={true} timeout={800}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 5, 
              textAlign: 'center', 
              borderRadius: 3,
              background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.paper, 0.8)})`,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Zoom in={true} timeout={1000}>
                <div>
                  <BookmarkIcon 
                    sx={{ 
                      fontSize: '5rem', 
                      color: alpha(theme.palette.primary.main, 0.7),
                      mb: 2
                    }} 
                  />
                </div>
              </Zoom>
            </Box>
            <Typography variant="h5" color="text.primary" gutterBottom fontWeight={600}>
              No bookmarks yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px', mx: 'auto', mb: 3 }}>
              You haven't bookmarked any posts yet. Browse posts and click the bookmark icon to save them for later.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              component={Link} 
              to="/"
              sx={{ 
                borderRadius: 8, 
                px: 3, 
                py: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              Browse Posts
            </Button>
          </Paper>
        </Fade>
      ) : (
        <Grid container spacing={3}>
          {bookmarkedPostsList.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Zoom 
                in={true} 
                style={{ transitionDelay: `${index * 100}ms` }}
                timeout={800}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  <IconButton 
                    size="small"
                    onClick={() => removeBookmark(post.id)}
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      zIndex: 2,
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        bgcolor: 'background.paper',
                        color: theme.palette.error.main
                      }
                    }}
                  >
                    <BookmarkRemoveIcon color="primary" />
                  </IconButton>
                  
                  <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chip 
                        size="small" 
                        label={post.category || 'General'}
                        sx={{ 
                          mr: 1, 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          fontWeight: 500,
                          fontSize: '0.7rem'
                        }} 
                      />
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          fontSize: '0.75rem',
                          color: 'text.secondary'
                        }}
                      >
                        <AccessTimeIcon sx={{ fontSize: '0.875rem', mr: 0.5 }} />
                        {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Unknown date'}
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        height: '2.8rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {post.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{
                        mb: 1,
                        color: 'primary.main',
                        fontWeight: 500
                      }}
                    >
                      By {post.author_name || 'Anonymous'}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{
                        mt: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '4.5rem',
                        lineHeight: 1.5
                      }}
                    >
                      {stripHtml(post.content || '')}
                    </Typography>
                  </CardContent>
                  
                  <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
                    <Button 
                      component={Link} 
                      to={`/post/${post.id}`} 
                      variant="contained"
                      color="primary"
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        borderRadius: 6,
                        px: 2,
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Bookmarks;
