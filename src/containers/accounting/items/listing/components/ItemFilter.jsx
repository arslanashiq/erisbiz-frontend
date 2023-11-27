import React from 'react';
import { Box } from '@mui/material';
import 'styles/form/form.scss';
import FormikSelect from 'shared/components/form/FormikSelect';

const itemFilterOptions = [
  { value: '', label: 'All', selectedValue: 'All Items' },
  { value: 'True', label: 'Active', selectedValue: 'Active Items' },
  { value: 'False', label: 'Inactive', selectedValue: 'Inactive Items' },
  { value: 'Goods', label: 'Goods', selectedValue: 'Goods' },
  { value: 'Service', label: 'Services', selectedValue: 'Services' },
];
function ItemFilter() {
  return (
    <Box className="form__form-group">
      <span className="form__form-group-label">Items</span>
      <Box className="form__form-group-field">
        <FormikSelect
          name="filter"
          type="text"
          placeholder="All"
          options={itemFilterOptions}
          className="col-12"
        />
      </Box>
    </Box>
  );
}

export default ItemFilter;
