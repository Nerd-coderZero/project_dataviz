import React from 'react';
import { Container, Box } from '@mui/material';

const DashboardLayout = ({ children }) => {
  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ p: 3, width: '100%' }}>
        {children}
      </Box>
    </Container>
  );
};

export default DashboardLayout;