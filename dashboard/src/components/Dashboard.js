import React, { useState, useEffect } from 'react';
import FilterForm from './FilterForm';
import CustomBarChart from './CustomBarChart';
import CustomLineChart from './CustomLineChart';
import CustomScatterPlot from './CustomScatterPlot';
import CustomPieChart from './CustomPieChart';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({}); // State for filter options
  const filters = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country', 'city'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data'); // Fetch initial data without filters
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Initially, filteredData is the same as data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchFilterValues = async () => {
      try {
        const response = await fetch('http://localhost:5000/filter_values');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        // Ensure each filter has at least one option
        const updatedFilterOptions = Object.keys(result).reduce((acc, filter) => {
          acc[filter] = result[filter].length > 0 ? result[filter] : ['None']; 
          return acc;
        }, {});

        setFilterOptions(updatedFilterOptions); 
      } catch (error) {
        console.error('Error fetching filter values:', error);
      }
    };

    fetchData();
    fetchFilterValues();
  }, []); 

  const handleFilterChange = async (event) => {
    const { id, value } = event.target;
    const params = new URLSearchParams(filters);
    if (value !== '') { // Only add the filter if a value is selected
      params.set(id, value);
    } else {
      params.delete(id); // Remove the filter if "All" is selected
    }

    try {
      const response = await fetch(`http://localhost:5000/data?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setFilteredData(result);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  
 // Data for pie chart (useMemo removed)
  const pieChartData = Object.values(filteredData.reduce((acc, item) => {
    const region = item.region || "Unknown";
    if (!acc[region]) {
      acc[region] = { region, value: 0 };
    }
    acc[region].value += 1;
    return acc;
  }, {}));

 

  return (
    <div>
      <FilterForm filters={filters} filterOptions={filterOptions} handleFilterChange={handleFilterChange} />
      <CustomBarChart data={filteredData} xAxisField="topic" yAxisField="intensity" title="Intensity by Topic" />
      <CustomLineChart data={filteredData} xAxisField="start_year" yAxisField="intensity" title="Intensity over Years" />
      <CustomScatterPlot data={filteredData} xAxisField="relevance" yAxisField="likelihood" title="Relevance vs Likelihood" />
      <CustomPieChart data={pieChartData} dataKey="value" nameKey="region" title="Distribution by Region" />
      
    </div>
  );
};

export default Dashboard;
