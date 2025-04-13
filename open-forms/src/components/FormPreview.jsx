import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Box,
  Divider
} from '@mui/material';

const FormPreview = ({ 
  title, 
  description, 
  fields,
  onSubmit,
  readOnly = false,
  formId
}) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (fieldId, value) => {
    setFormValues({
      ...formValues,
      [fieldId]: value
    });
    
    // Clear error if field is now filled
    if (errors[fieldId] && value) {
      const newErrors = { ...errors };
      delete newErrors[fieldId];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formValues[field.id]) {
        newErrors[field.id] = 'This field is required';
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {title || 'Untitled Form'}
        </Typography>
        {description && (
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
        )}
        
        <Divider sx={{ my: 3 }} />
        
        {fields.map((field) => (
          <Box key={field.id} sx={{ mb: 3 }}>
            {renderField(
              field, 
              formValues[field.id], 
              (value) => handleChange(field.id, value),
              errors[field.id]
            )}
          </Box>
        ))}
        
        {!readOnly && (
          <Box sx={{ mt: 4 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
            >
              Submit
            </Button>
          </Box>
        )}
      </form>
    </Paper>
  );
};

const renderField = (field, value, onChange, error) => {
  const required = field.required;
  const label = `${field.label}${required ? ' *' : ''}`;
  
  switch (field.type) {
    case 'text':
      return (
        <TextField
          fullWidth
          label={label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          error={!!error}
          helperText={error}
          required={required}
        />
      );
      
    case 'textarea':
      return (
        <TextField
          fullWidth
          label={label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          multiline
          rows={4}
          error={!!error}
          helperText={error}
          required={required}
        />
      );
      
    case 'radio':
      return (
        <FormControl component="fieldset" error={!!error} required={required}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          >
            {field.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </FormControl>
      );
      
    case 'checkbox':
      return (
        <FormControl component="fieldset" error={!!error} required={required}>
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup>
            {field.options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox 
                    checked={value?.includes(option.value) || false}
                    onChange={(e) => {
                      const currentValues = value || [];
                      const newValue = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(v => v !== option.value);
                      onChange(newValue);
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </FormControl>
      );
      
    case 'select':
      return (
        <FormControl fullWidth error={!!error} required={required}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            label={label}
          >
            {field.options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </FormControl>
      );
      
    case 'date':
      return (
        <TextField
          fullWidth
          label={label}
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={!!error}
          helperText={error}
          required={required}
        />
      );
      
    case 'number':
      return (
        <TextField
          fullWidth
          label={label}
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          error={!!error}
          helperText={error}
          required={required}
        />
      );
      
    default:
      return null;
  }
};

export default FormPreview;