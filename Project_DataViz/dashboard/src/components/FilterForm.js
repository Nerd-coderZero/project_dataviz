import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, Box, Button } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterForm = ({ filters, filterOptions, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters(prev => ({
      ...prev,
      [name]: typeof value === 'string' ? value.split(',') : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filterQuery = Object.entries(selectedFilters)
      .filter(([_, value]) => value.length > 0)
      .map(([key, value]) => `${key}=${encodeURIComponent(value.join(','))}`)
      .join('&');
    onFilterChange(filterQuery);
  };

  const handleReset = () => {
    setSelectedFilters({});
    onFilterChange('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="flex-end">
        {filters.map(filter => (
          <Grid item xs={12} sm={6} md={3} key={filter}>
            <FormControl fullWidth>
              <InputLabel id={`${filter}-label`}>{filter.replace('_', ' ').toUpperCase()}</InputLabel>
              <Select
                labelId={`${filter}-label`}
                id={filter}
                multiple
                value={selectedFilters[filter] || []}
                onChange={handleFilterChange}
                input={<OutlinedInput id={`select-multiple-${filter}`} label={filter.replace('_', ' ').toUpperCase()} />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                name={filter}
              >
                {filterOptions[filter] && filterOptions[filter].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
            Apply Filters
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FilterForm;