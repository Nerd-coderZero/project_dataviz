import React from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { Typography, Paper } from '@mui/material';

const CustomTreemap = ({ data, dataKey, nameKey, title }) => {
  const processedData = data.reduce((acc, item) => {
    const name = item[nameKey];
    const value = parseFloat(item[dataKey]);
    if (name && !isNaN(value)) {
      if (!acc[name]) {
        acc[name] = { name, value: 0 };
      }
      acc[name].value += value;
    }
    return acc;
  }, {});

  const treemapData = Object.values(processedData);

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <Treemap
          data={treemapData}
          dataKey="value"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        >
          <Tooltip 
            formatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
          />
        </Treemap>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CustomTreemap;