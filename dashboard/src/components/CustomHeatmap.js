import React from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

const CustomHeatmap = ({ data, keys, indexBy, title }) => {
  // Ensure 'data' is an array of objects
  const rowItems = Array.isArray(data) ? data : Object.values(data);

  // Assuming keys and indexBy are already arrays
  const xLabels = keys;
  const yLabels = rowItems.map(d => d[indexBy]);

  return (
    <div>
      <h3>{title}</h3>
      <HeatMapGrid
        data={rowItems}
        xLabels={xLabels}
        yLabels={yLabels}
        // ... (other HeatMapGrid props)
      />
    </div>
  );
};

export default CustomHeatmap;
