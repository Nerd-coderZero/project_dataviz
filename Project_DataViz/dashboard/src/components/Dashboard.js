import React, { useState, useEffect, useMemo } from 'react';
import { CircularProgress, Paper, Typography, Grid } from '@mui/material';
import DashboardLayout from './DashboardLayout';
import FilterForm from './FilterForm';
import CustomBarChart from './CustomBarChart';
import CustomLineChart from './CustomLineChart';
import CustomScatterPlot from './CustomScatterPlot';
import CustomPieChart from './CustomPieChart';
import CustomHeatmap from './CustomHeatmap';
import CustomTreemap from './CustomTreemap';
import SummaryCards from './SummaryCards';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState(null);

  const filters = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country', 'city'];

  useEffect(() => {
    fetchData();
    fetchFilterValues();
    fetchSummaryData();
  }, []);

  const fetchData = async (filterQuery = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/data${filterQuery ? `?${filterQuery}` : ''}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.map(item => ({
        ...item,
        intensity: parseFloat(item.intensity),
        likelihood: parseFloat(item.likelihood),
        relevance: parseFloat(item.relevance),
        start_year: parseInt(item.start_year, 10),
        end_year: parseInt(item.end_year, 10)
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  const fetchFilterValues = async () => {
    try {
      const response = await fetch('http://localhost:5000/filter_values');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setFilterOptions(result);
    } catch (error) {
      console.error('Error fetching filter values:', error);
      setError('Failed to fetch filter options. Please try again later.');
    }
  };

  const fetchSummaryData = async () => {
    try {
      const response = await fetch('http://localhost:5000/summary');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setSummaryData(result);
    } catch (error) {
      console.error('Error fetching summary data:', error);
      setError('Failed to fetch summary data. Please try again later.');
    }
  };

  const handleFilterChange = (filterQuery) => {
    fetchData(filterQuery);
  };

  const pieChartData = useMemo(() => {
    return Object.values(data.reduce((acc, item) => {
      const region = item.region || "Unknown";
      if (!acc[region]) {
        acc[region] = { region, value: 0 };
      }
      acc[region].value += 1;
      return acc;
    }, {}));
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <FilterForm 
              filters={filters} 
              filterOptions={filterOptions} 
              onFilterChange={handleFilterChange} 
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <SummaryCards summaryData={summaryData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomBarChart data={data} xAxisField="topic" yAxisField="intensity" title="Intensity by Topic" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomLineChart data={data} xAxisField="start_year" yAxisField="intensity" title="Intensity over Years" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomScatterPlot data={data} xAxisField="relevance" yAxisField="likelihood" title="Relevance vs Likelihood" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomPieChart data={pieChartData} dataKey="value" nameKey="region" title="Distribution by Region" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomHeatmap data={data} xField="relevance" yField="likelihood" zField="intensity" title="Intensity Heatmap: Likelihood vs Relevance" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTreemap data={data} dataKey="intensity" nameKey="country" title="Intensity by Country" />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;