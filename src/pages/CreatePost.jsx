import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Alert, Box, Snackbar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.content) {
      setError('Title and content are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/posts',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Post created successfully:', response.data);
      setOpenSnackbar(true);
      // Wait for 2 seconds before navigating
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Post creation error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create post. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
          Create New Post
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Content</Typography>
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData((prevData) => ({
                  ...prevData,
                  content: data,
                }));
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            {loading ? 'Creating Post...' : 'Create Post'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          icon={<CheckCircleIcon />}
          sx={{ 
            width: '100%',
            boxShadow: 3,
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          Post created successfully! Redirecting...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatePost;
