import React from 'react';
import PropTypes from 'prop-types';
import FormikField from 'shared/components/form/FormikField';
import 'styles/form/form.scss';
import FormikSelect from '../form/FormikSelect';
import FormikDatePicker from '../form/FormikDatePicker';

function PersonlizedFilter({ filtersList }) {
  filtersList.map(filter => {
    if (filter.options) {
      return (
        <FormikSelect
          key={filter.name}
          name={filter.name}
          placeholder={filter.placeholder}
          options={filter.options}
          label={filter.placeholder}
          labelClassName="col-12"
          className={` ${filter.fullWidth ? 'col-12' : 'col-6'}`}
        />
      );
    } if (filter.date) {
      return (
        <FormikDatePicker
          key={filter.name}
          name={filter.name}
          placeholder={filter.placeholder}
          label={filter.placeholder}
          labelClassName="col-12"
          className={` ${filter.fullWidth ? 'col-12' : 'col-6'}`}
        />
      );
    }
    return (
      <FormikField
        key={filter.name}
        name={filter.name}
        placeholder={filter.placeholder}
        type={filter.type}
        label={filter.placeholder}
        labelClassName="col-12"
        className={` ${filter.fullWidth ? 'col-12' : 'col-6'}`}
      />
    );
  });
}
PersonlizedFilter.propTypes = {
  filterInitialValues: PropTypes.object.isRequired,
  filtersList: PropTypes.array.isRequired,
};
export default PersonlizedFilter;
