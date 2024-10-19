import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const SummaryCard = ({ title, value }) => (
  <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h4">
      {value}
    </Typography>
  </Paper>
);

const SummaryCards = ({ summaryData }) => {
  if (!summaryData) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard title="Total Insights" value={summaryData.total_insights} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard title="Avg. Intensity" value={summaryData.avg_intensity} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard title="Avg. Likelihood" value={summaryData.avg_likelihood} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard title="Avg. Relevance" value={summaryData.avg_relevance} />
      </Grid>
    </Grid>
  );
};

export default SummaryCards;