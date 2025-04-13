import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FieldEditor from './FieldEditor';
import FormPreview from './FormPreview';

const FormBuilder = () => {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('Form Description');
  const [fields, setFields] = useState([
    { id: 'field_1', type: 'text', label: 'Name', required: true, options: [] }
  ]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [shareableLink, setShareableLink] = useState('');

  const handleAddField = () => {
    const newId = `field_${Date.now()}`;
    setFields([...fields, { 
      id: newId, 
      type: 'text', 
      label: 'New Question', 
      required: false,
      options: []
    }]);
  };

  const handleUpdateField = (updatedField) => {
    setFields(fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
  };

  const handleRemoveField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const handleMoveField = (fieldId, direction) => {
    const currentIndex = fields.findIndex(field => field.id === fieldId);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    [newFields[currentIndex], newFields[newIndex]] = 
    [newFields[newIndex], newFields[currentIndex]];
    
    setFields(newFields);
  };

  const handleGenerateLink = async () => {
    setLoading(true);
    try {
      // Create form data
      const formId = `f${Date.now()}`;
      const formData = {
        id: formId,
        title: formTitle,
        description: formDescription,
        fields,
        created: new Date().toISOString()
      };
      
      // Save to localStorage (in a real app, this would be an API call)
      const savedForms = localStorage.getItem('forms');
      const forms = savedForms ? JSON.parse(savedForms) : [];
      forms.push(formData);
      localStorage.setItem('forms', JSON.stringify(forms));
      
      // Set link and success message
      const link = `/form/${formId}`;
      setShareableLink(link);
      setSuccessMessage('Form created successfully! Share this link:');
    } catch (error) {
      console.error('Error creating form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  const handleGoToHome = () => {
    navigate('/home');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleGoToHome}
        >
          Back to Forms
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Form Builder
        </Typography>
        
        <FieldEditor 
          field={{ 
            id: 'title',
            type: 'form-title',
            label: formTitle 
          }}
          onUpdate={(field) => setFormTitle(field.label)}
          isTitle
        />
        
        <FieldEditor 
          field={{ 
            id: 'description',
            type: 'form-description',
            label: formDescription 
          }}
          onUpdate={(field) => setFormDescription(field.label)}
          isDescription
        />
        
        <Divider sx={{ my: 3 }} />
        
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 3 }}>
            <FieldEditor 
              field={field}
              onUpdate={handleUpdateField}
              onRemove={() => handleRemoveField(field.id)}
              onMoveUp={() => handleMoveField(field.id, 'up')}
              onMoveDown={() => handleMoveField(field.id, 'down')}
              isFirst={index === 0}
              isLast={index === fields.length - 1}
            />
          </Box>
        ))}
        
        <Button 
          variant="outlined" 
          startIcon={<AddIcon />} 
          onClick={handleAddField}
          sx={{ mt: 2 }}
        >
          Add Question
        </Button>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleGenerateLink}
            disabled={loading}
            sx={{ px: 4 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Shareable Link'}
          </Button>
          
          {shareableLink && (
            <Paper sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body2" color="textSecondary">
                Share this link:
              </Typography>
              <Typography 
                variant="body1" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  wordBreak: 'break-all',
                  mt: 1 
                }}
              >
                {window.location.origin}{shareableLink}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}${shareableLink}`);
                    setSuccessMessage('Link copied to clipboard!');
                  }}
                >
                  Copy Link
                </Button>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={handleGoToHome}
                >
                  View All Forms
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 2 }}>
        Live Preview
      </Typography>
      
      <FormPreview 
        title={formTitle}
        description={formDescription}
        fields={fields}
        readOnly
      />

      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FormBuilder;