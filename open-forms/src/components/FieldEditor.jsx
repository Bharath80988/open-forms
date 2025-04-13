import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Typography,
  IconButton,
  Switch,
  Button,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const FieldEditor = ({ 
  field, 
  onUpdate, 
  onRemove, 
  onMoveUp, 
  onMoveDown, 
  isFirst,
  isLast,
  isTitle,
  isDescription
}) => {
  const [options, setOptions] = useState(field.options || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...field, [name]: value });
  };

  const handleToggleRequired = (e) => {
    onUpdate({ ...field, required: e.target.checked });
  };

  const handleAddOption = () => {
    const newOptions = [...options, { value: `Option ${options.length + 1}`, label: `Option ${options.length + 1}` }];
    setOptions(newOptions);
    onUpdate({ ...field, options: newOptions });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = options.map((option, i) => 
      i === index ? { ...option, value, label: value } : option
    );
    setOptions(updatedOptions);
    onUpdate({ ...field, options: updatedOptions });
  };

  const handleRemoveOption = (index) => {
    const filteredOptions = options.filter((_, i) => i !== index);
    setOptions(filteredOptions);
    onUpdate({ ...field, options: filteredOptions });
  };

  if (isTitle) {
    return (
      <TextField
        fullWidth
        variant="standard"
        label="Form Title"
        name="label"
        value={field.label}
        onChange={handleChange}
        sx={{ mb: 2, input: { fontSize: '1.75rem', fontWeight: 500 } }}
      />
    );
  }

  if (isDescription) {
    return (
      <TextField
        fullWidth
        variant="standard"
        label="Form Description"
        name="label"
        value={field.label}
        onChange={handleChange}
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
          Question
        </Typography>
        <Box>
          {onMoveUp && !isFirst && (
            <IconButton size="small" onClick={onMoveUp} sx={{ mr: 1 }}>
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
          )}
          {onMoveDown && !isLast && (
            <IconButton size="small" onClick={onMoveDown} sx={{ mr: 1 }}>
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          )}
          {onRemove && (
            <IconButton size="small" onClick={onRemove} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Question"
            name="label"
            value={field.label}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Field Type</InputLabel>
            <Select
              name="type"
              value={field.type}
              onChange={handleChange}
              label="Field Type"
            >
              <MenuItem value="text">Short Text</MenuItem>
              <MenuItem value="textarea">Paragraph</MenuItem>
              <MenuItem value="radio">Multiple Choice</MenuItem>
              <MenuItem value="checkbox">Checkboxes</MenuItem>
              <MenuItem value="select">Dropdown</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="number">Number</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {['radio', 'checkbox', 'select'].includes(field.type) && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Options
          </Typography>
          {options.map((option, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={option.label}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                variant="outlined"
                placeholder={`Option ${index + 1}`}
              />
              <IconButton size="small" onClick={() => handleRemoveOption(index)} sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button 
            startIcon={<AddIcon />} 
            onClick={handleAddOption} 
            size="small" 
            sx={{ mt: 1 }}
          >
            Add Option
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          control={
            <Switch 
              checked={field.required || false} 
              onChange={handleToggleRequired}
              size="small"
            />
          }
          label="Required"
        />
      </Box>
    </Paper>
  );
};

export default FieldEditor;