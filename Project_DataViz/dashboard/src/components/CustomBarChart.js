import React, { useState } from 'react';
   import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
   import { Typography, Button } from '@mui/material';

   const CustomBarChart = ({ data, xAxisField, yAxisField, title }) => {
     const [sortOrder, setSortOrder] = useState('desc');
     const [displayCount, setDisplayCount] = useState(10);

     // Process and sort data
     const processedData = Object.values(data.reduce((acc, item) => {
       const key = item[xAxisField];
       if (!acc[key]) {
         acc[key] = { [xAxisField]: key, [yAxisField]: 0 };
       }
       acc[key][yAxisField] += item[yAxisField] || 0;
       return acc;
     }, {})).sort((a, b) => 
       sortOrder === 'desc' ? b[yAxisField] - a[yAxisField] : a[yAxisField] - b[yAxisField]
     ).slice(0, displayCount);

     const toggleSortOrder = () => {
       setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
     };

     const increaseDisplayCount = () => {
       setDisplayCount(prevCount => Math.min(prevCount + 5, data.length));
     };

     return (
       <>
         <Typography variant="h6" align="center" gutterBottom>
           {title}
         </Typography>
         <Button onClick={toggleSortOrder}>
           Sort {sortOrder === 'desc' ? 'Ascending' : 'Descending'}
         </Button>
         <Button onClick={increaseDisplayCount} disabled={displayCount >= data.length}>
           Show More
         </Button>
         <ResponsiveContainer width="100%" height={400}>
           <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey={xAxisField} />
             <YAxis />
             <Tooltip />
             <Legend />
             <Bar dataKey={yAxisField} fill="#8884d8" />
           </BarChart>
         </ResponsiveContainer>
       </>
     );
   };

   export default CustomBarChart;