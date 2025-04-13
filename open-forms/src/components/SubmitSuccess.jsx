import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Stack
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';

const SubmitSuccess = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 2, color: 'success.main', fontSize: 64 }}>
          <CheckCircleOutlineIcon fontSize="inherit" />
        </Box>
        
        <Typography variant="h4" gutterBottom>
          Thank You!
        </Typography>
        
        <Typography variant="body1" paragraph>
          Your response has been recorded successfully.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              component={Link} 
              to="/home" 
              variant="outlined"
              startIcon={<HomeIcon />}
            >
              Go to Home
            </Button>
            <Button 
              component={Link} 
              to="/" 
              variant="contained" 
              color="primary"
            >
              Create New Form
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default SubmitSuccess;