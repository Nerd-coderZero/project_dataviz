import React from 'react';
   import { Grid, Paper, Typography, Box } from '@mui/material';

   const MetricCard = ({ title, value }) => (
     <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
       <Typography variant="h6">{title}</Typography>
       <Typography variant="h4">{value}</Typography>
     </Paper>
   );

   const DashboardHeader = ({ data }) => {
     const totalEntries = data.length;
     const averageIntensity = (data.reduce((sum, item) => sum + (item.intensity || 0), 0) / totalEntries).toFixed(2);
     const uniqueTopics = new Set(data.map(item => item.topic)).size;

     return (
       <Box mb={3}>
         <Grid container spacing={3}>
           <Grid item xs={12} md={4}>
             <MetricCard title="Total Entries" value={totalEntries} />
           </Grid>
           <Grid item xs={12} md={4}>
             <MetricCard title="Average Intensity" value={averageIntensity} />
           </Grid>
           <Grid item xs={12} md={4}>
             <MetricCard title="Unique Topics" value={uniqueTopics} />
           </Grid>
         </Grid>
       </Box>
     );
   };

   export default DashboardHeader;