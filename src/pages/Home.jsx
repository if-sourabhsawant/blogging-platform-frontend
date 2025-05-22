import { useState, useEffect, useRef } from 'react';
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
  TextField, 
  Fade, 
  Grow, 
  Zoom,
  Slide,
  Chip,
  IconButton,
  Skeleton,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import { 
  Search as SearchIcon, 
  ArrowForward as ArrowForwardIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  AccessTime as AccessTimeIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  const searchInputRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  
  // Pagination - 3 posts per page
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  useEffect(() => {
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchPosts();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // Safely handle the response data
      const postsData = response.data?.posts || response.data || [];
      setPosts(Array.isArray(postsData) ? postsData : []);
      setError('');
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search posts. Please try again.');
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
  }, []);

  const toggleBookmark = (postId) => {
    const newBookmarkedPosts = bookmarkedPosts.includes(postId)
      ? bookmarkedPosts.filter(id => id !== postId)
      : [...bookmarkedPosts, postId];
    
    setBookmarkedPosts(newBookmarkedPosts);
    localStorage.setItem('bookmarkedPosts', JSON.stringify(newBookmarkedPosts));
  };

  const isBookmarked = (postId) => bookmarkedPosts.includes(postId);
  
  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Skeleton variant="text" width="50%" height={60} sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width="30%" height={30} sx={{ mx: 'auto', mt: 1 }} />
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="rounded" height={56} width="100%" />
        </Box>
        
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton variant="rounded" height={300} width="100%" sx={{ 
                borderRadius: 3,
                transform: 'scale(1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Slide direction="down" in={true} timeout={800} mountOnEnter unmountOnExit>
        <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
          Welcome to the Blog
        </Typography>
      </Slide>
      
      <Fade in={true} timeout={1200}>
        <Typography 
          variant="subtitle1" 
          align="center" 
          gutterBottom 
          sx={{ 
            mt: -1, 
            mb: 3,
            fontStyle: 'italic',
            letterSpacing: '0.5px',
            color: 'primary.light',
            textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)',
            fontWeight: 400,
            fontSize: '1rem',
            borderBottom: '1px solid #eaeaea',
            borderTop: '1px solid #eaeaea',
            width: 'fit-content',
            margin: '-0.5rem auto 2rem auto',
            padding: '0.5rem 2rem',
            borderRadius: '4px',
            background: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(8px)'
          }}
        >
          Connecting Writers and Readers
        </Typography>
      </Fade>
      
      <Zoom in={true} timeout={1000} style={{ transitionDelay: '300ms' }}>
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 5, 
            p: 0.5, 
            borderRadius: 3,
            background: theme.palette.background.subtle,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: 1,
            borderRadius: 2.5,
            border: searchFocused ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
            transition: 'all 0.2s ease-in-out',
            bgcolor: 'background.paper'
          }}>
            <SearchIcon sx={{ mx: 1, color: searchFocused ? 'primary.main' : 'text.secondary' }} />
            <TextField
              inputRef={searchInputRef}
              placeholder="Search for posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              fullWidth
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ 
                '& .MuiInputBase-root': { 
                  fontSize: '1.1rem',
                  py: 0.5
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1,
                minWidth: 120,
                boxShadow: 2
              }}
            >
              Search
            </Button>
          </Box>
        </Paper>
      </Zoom>

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

      {posts.length === 0 && !loading && !error ? (
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
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill={alpha(theme.palette.primary.main, 0.7)} />
                    <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill={alpha(theme.palette.primary.main, 0.5)} />
                  </svg>
                </div>
              </Zoom>
            </Box>
            <Typography variant="h5" color="text.primary" gutterBottom fontWeight={600}>
              No posts found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px', mx: 'auto', mb: 3 }}>
              Be the first to create a post or try a different search term.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              component={Link} 
              to="/create-post"
              sx={{ 
                borderRadius: 8, 
                px: 3, 
                py: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              Create a Post
            </Button>
          </Paper>
        </Fade>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentPosts.map((post, index) => (
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
                    onClick={() => toggleBookmark(post.id)}
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
                      }
                    }}
                  >
                    {isBookmarked(post.id) ? 
                      <BookmarkIcon color="primary" /> : 
                      <BookmarkBorderIcon />}
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

          {/* Pagination Controls */}
          {posts.length > postsPerPage && (
            <Fade in={true} timeout={1000}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 6,
                  mb: 2,
                  gap: 1
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={currentPage === 1}
                  onClick={prevPage}
                  sx={{ 
                    minWidth: '40px',
                    height: '40px',
                    p: 1,
                    borderRadius: '50%',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <NavigateBeforeIcon />
                </Button>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handlePageChange(pageNumber)}
                        sx={{ 
                          minWidth: '40px',
                          height: '40px',
                          p: 0,
                          borderRadius: '50%',
                          fontWeight: 600,
                          '&:hover': {
                            transform: currentPage !== pageNumber ? 'translateY(-2px)' : 'none',
                          },
                          transition: 'all 0.2s ease-in-out',
                          boxShadow: currentPage === pageNumber ? 2 : 0,
                        }}
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </Box>
                
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={currentPage === totalPages}
                  onClick={nextPage}
                  sx={{ 
                    minWidth: '40px',
                    height: '40px',
                    p: 1,
                    borderRadius: '50%',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <NavigateNextIcon />
                </Button>
              </Box>
            </Fade>
          )}
          
          {/* Page info */}
          {posts.length > 0 && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
              sx={{ mt: 1, mb: 4, opacity: 0.7 }}
            >
              Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)} of {posts.length} posts
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;