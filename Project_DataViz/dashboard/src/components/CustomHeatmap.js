import React from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Scatter, ScatterChart } from 'recharts';
import { Typography, Paper } from '@mui/material';

const CustomHeatmap = ({ data, xField, yField, zField, title }) => {
  const processedData = data.reduce((acc, item) => {
    const x = item[xField];
    const y = item[yField];
    const z = parseFloat(item[zField]);
    if (x && y && !isNaN(z)) {
      const key = `${x}-${y}`;
      if (!acc[key]) {
        acc[key] = { x, y, value: 0, count: 0 };
      }
      acc[key].value += z;
      acc[key].count += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(processedData).map(item => ({
    ...item,
    value: item.value / item.count,
  }));

  const minValue = Math.min(...chartData.map(item => item.value));
  const maxValue = Math.max(...chartData.map(item => item.value));

  const getColor = (value) => {
    const ratio = (value - minValue) / (maxValue - minValue);
    const hue = (1 - ratio) * 240;
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
          <XAxis
            type="category"
            dataKey="x"
            name={xField}
            allowDuplicatedCategory={false}
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            type="category"
            dataKey="y"
            name={yField}
            allowDuplicatedCategory={false}
          />
          <Tooltip
            formatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
            labelFormatter={(label) => `${xField}: ${label}`}
          />
          <Scatter
            data={chartData}
            shape="square"
          >
            {chartData.map((entry, index) => (
              <cell
                key={`cell-${index}`}
                fill={getColor(entry.value)}
                stroke="#000"
                strokeWidth={1}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CustomHeatmap;