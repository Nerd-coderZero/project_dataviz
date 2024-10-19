import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';
import { Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomScatterPlot = ({ data, xAxisField, yAxisField, title }) => {
  const [colorBy, setColorBy] = useState('sector');

  const processedData = data.map(item => ({
    ...item,
    [xAxisField]: item[xAxisField] || 0,
    [yAxisField]: item[yAxisField] || 0
  }));

  const colorOptions = ['sector', 'region', 'pestle'];
  const colorScale = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1'];

  const uniqueCategories = [...new Set(processedData.map(item => item[colorBy]))];
  const colorMap = Object.fromEntries(uniqueCategories.map((category, index) => [category, colorScale[index % colorScale.length]]));

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <FormControl size="small" style={{ minWidth: 120, marginBottom: 10 }}>
        <InputLabel id="color-by-label">Color By</InputLabel>
        <Select
          labelId="color-by-label"
          id="color-by-select"
          value={colorBy}
          label="Color By"
          onChange={(e) => setColorBy(e.target.value)}
        >
          {colorOptions.map(option => (
            <MenuItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey={xAxisField} name={xAxisField} />
          <YAxis type="number" dataKey={yAxisField} name={yAxisField} />
          <ZAxis type="category" dataKey={colorBy} name={colorBy} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          {uniqueCategories.map((category, index) => (
            <Scatter
              key={category}
              name={category}
              data={processedData.filter(item => item[colorBy] === category)}
              fill={colorMap[category]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomScatterPlot;