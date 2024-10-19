import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Button, ButtonGroup } from '@mui/material';

const CustomLineChart = ({ data, xAxisField, yAxisField, title }) => {
  const [timeRange, setTimeRange] = useState('all');

  // Process and sort data
  const processedData = data.reduce((acc, item) => {
    const year = item[xAxisField];
    if (!acc[year]) {
      acc[year] = { [xAxisField]: year, [yAxisField]: 0, count: 0 };
    }
    acc[year][yAxisField] += item[yAxisField] || 0;
    acc[year].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(processedData)
    .map(item => ({
      ...item,
      [yAxisField]: item[yAxisField] / item.count
    }))
    .sort((a, b) => a[xAxisField] - b[xAxisField]);

  const filterDataByTimeRange = (range) => {
    const currentYear = new Date().getFullYear();
    switch (range) {
      case '5years':
        return chartData.filter(item => item[xAxisField] >= currentYear - 5);
      case '10years':
        return chartData.filter(item => item[xAxisField] >= currentYear - 10);
      default:
        return chartData;
    }
  };

  const filteredData = filterDataByTimeRange(timeRange);

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <ButtonGroup size="small" aria-label="time range selection">
        <Button onClick={() => setTimeRange('all')} variant={timeRange === 'all' ? 'contained' : 'outlined'}>All Time</Button>
        <Button onClick={() => setTimeRange('10years')} variant={timeRange === '10years' ? 'contained' : 'outlined'}>Last 10 Years</Button>
        <Button onClick={() => setTimeRange('5years')} variant={timeRange === '5years' ? 'contained' : 'outlined'}>Last 5 Years</Button>
      </ButtonGroup>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisField} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yAxisField} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomLineChart;