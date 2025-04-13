import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description'; // document-like icon

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <DescriptionIcon sx={{ mr: 1 }} />
      <Typography variant="h6" component="div">
        Open Forms
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
