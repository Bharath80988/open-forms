import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import FormBuilder from './components/FormBuilder';
import FormViewer from './components/FormViewer';
import SubmitSuccess from './components/SubmitSuccess';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ee',
    },
    secondary: {
      main: '#03dac6',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<FormBuilder />} />
          <Route path="/form/:formId" element={<FormViewer />} />
          <Route path="/success" element={<SubmitSuccess />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;