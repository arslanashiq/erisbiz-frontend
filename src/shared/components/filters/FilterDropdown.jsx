import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterDropdown({ initialValue, filterList, setFilterValue, className }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = event => {
    setValue(event.target.value);
    setFilterValue(event.target.value);
  };

  return (
    <FormControl fullWidth variant="standard" className={className}>
      <InputLabel id="demo-simple-select-label">Filter</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        {filterList.map(filter => (
          <MenuItem value={filter.value}>{filter.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
FilterDropdown.propTypes = {
  initialValue: PropTypes.string,
  filterList: PropTypes.array,
  setFilterValue: PropTypes.func,
  className: PropTypes.string,
};
FilterDropdown.defaultProps = {
  className: '',
  initialValue: '',
  filterList: [],
  setFilterValue: () => {},
};
