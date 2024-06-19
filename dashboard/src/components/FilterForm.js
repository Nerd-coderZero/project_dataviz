import React from 'react';

const FilterForm = ({ filters, filterOptions, handleFilterChange }) => {
  return (
    <form>
      {Object.keys(filterOptions).map((filterName) => (
        <div key={filterName}>
          <label htmlFor={filterName}>{filterName}</label>
          <select id={filterName} onChange={handleFilterChange}>
            <option value="">All</option>
            {/* Assuming filterOptions[filterName] is an array of strings */}
            {filterOptions[filterName].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </form>
  );
};

export default FilterForm;
