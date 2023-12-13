import React from 'react';
import { Box } from '@mui/material';
import FormikSelect from 'shared/components/form/FormikSelect';
import { itemFilterOptions } from '../../utilities/filters';
import 'styles/form/form.scss';

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
