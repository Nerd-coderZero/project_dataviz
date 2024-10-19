import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Insight Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;