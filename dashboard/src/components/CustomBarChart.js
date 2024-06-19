import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data = [], xAxisField = '', yAxisField = '', title = '' }) => {
    return (
        <div>
            <h3>{title}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisField} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={yAxisField} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
