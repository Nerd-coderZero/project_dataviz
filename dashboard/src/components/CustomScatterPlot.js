import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomScatterPlot = ({ data = [], xAxisField = '', yAxisField = '', title = '' }) => {
    return (
        <div>
            <h3>{title}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisField} />
                    <YAxis dataKey={yAxisField} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Scatter" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomScatterPlot;
