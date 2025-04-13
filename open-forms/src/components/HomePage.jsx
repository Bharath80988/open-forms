import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fab,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Grid,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const HomePage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);

  useEffect(() => {
    // Load saved forms from localStorage
    const loadForms = () => {
      try {
        const savedForms = localStorage.getItem('forms');
        if (savedForms) {
          setForms(JSON.parse(savedForms));
        }
      } catch (error) {
        console.error('Error loading forms:', error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading delay
    setTimeout(loadForms, 500);
  }, []);

  const handleCreateNewForm = () => {
    navigate('/');
  };

  const handleEditForm = (formId) => {
    // We'd need to update the FormBuilder to accept a formId for editing
    // For now, we'll just create a copy of the form as a new form
    const formToEdit = forms.find(form => form.id === formId);
    if (formToEdit) {
      // In a real app, we'd route to edit mode with the formId
      navigate(`/`);
    }
  };

  const handleDeleteClick = (form) => {
    setFormToDelete(form);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (formToDelete) {
      const updatedForms = forms.filter(form => form.id !== formToDelete.id);
      setForms(updatedForms);
      localStorage.setItem('forms', JSON.stringify(updatedForms));
    }
    setDeleteDialogOpen(false);
    setFormToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setFormToDelete(null);
  };

  const handleCopyLink = (formId) => {
    const link = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(link);
    // In a real app, you might want to show a snackbar confirmation
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Forms
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateNewForm}
        >
          Create New Form
        </Button>
      </Box>

      {forms.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <NoteAddIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No forms yet
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Create your first form to get started!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateNewForm}
          >
            Create Form
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {forms.map((form) => (
            <Grid item xs={12} md={6} key={form.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" noWrap>
                    {form.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Created: {new Date(form.created).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" noWrap>
                    {form.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {form.fields.length} {form.fields.length === 1 ? 'question' : 'questions'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/form/${form.id}`}
                  >
                    View
                  </Button>
                  <Tooltip title="Edit Form">
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditForm(form.id)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy Link">
                    <IconButton 
                      size="small" 
                      onClick={() => handleCopyLink(form.id)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Form">
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleDeleteClick(form)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{formToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleCreateNewForm}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default HomePage;