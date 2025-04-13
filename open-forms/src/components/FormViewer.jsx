import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Button
} from '@mui/material';
import FormPreview from './FormPreview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FormViewer = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get forms from localStorage
        const savedForms = localStorage.getItem('forms');
        const forms = savedForms ? JSON.parse(savedForms) : [];
        
        // Find the requested form
        const foundForm = forms.find(form => form.id === formId);
        
        if (foundForm) {
          setForm(foundForm);
        } else {
          setError('Form not found. It may have been deleted or the link is invalid.');
        }
      } catch (err) {
        console.error('Error fetching form:', err);
        setError('There was an error loading the form. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleSubmit = async (formValues) => {
    setLoading(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Save submission to localStorage for demonstration purposes
      const submissions = localStorage.getItem('submissions') 
        ? JSON.parse(localStorage.getItem('submissions')) 
        : [];
      
      submissions.push({
        formId,
        values: formValues,
        submittedAt: new Date().toISOString()
      });
      
      localStorage.setItem('submissions', JSON.stringify(submissions));
      
      // Navigate to success page
      navigate('/success');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your response. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading form...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/home')}
          >
            Back to Forms
          </Button>
        </Box>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Form Not Available
          </Typography>
          <Typography variant="body1">
            The form you're looking for might have been removed or is temporarily unavailable.
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!form) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">
          Form not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <FormPreview
        title={form.title}
        description={form.description}
        fields={form.fields}
        onSubmit={handleSubmit}
        formId={formId}
      />
    </Container>
  );
};

export default FormViewer;