/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
// import { Form, Formik } from 'formik';
// import { useSnackbar } from 'notistack';
// import { useLocation, useNavigate } from 'react-router';
import FormikField from 'shared/components/form/FormikField';
// import { getsearchQueryOffsetAndLimitParams, handlePersonlizedFilterString } from 'utilities/filters';
import 'styles/form/form.scss';
import FormikSelect from '../form/FormikSelect';
import FormikDatePicker from '../form/FormikDatePicker';

function PersonlizedFilter({ filtersList }) {
  return filtersList.map(filter => (filter.options ? (
    <FormikSelect
      name={filter.name}
      placeholder={filter.placeholder}
      options={filter.options}
      label={filter.placeholder}
      labelClassName="col-12"
      className={` ${filter.fullWidth ? 'col-12' : 'col-6'}`}
    />
  ) : filter.date ? (
    <FormikDatePicker
      name={filter.name}
      placeholder={filter.placeholder}
      label={filter.placeholder}
      labelClassName="col-12"
      className={` ${filter.fullWidth ? 'col-12' : 'col-6'}`}
    />
  ) : (
    <FormikField
      name={filter.name}
      placeholder={filter.placeholder}
      type={filter.type}
      label={filter.placeholder}
      labelClassName="col-12"
      className={` ${filter.fullWidth ? 'col-12' : 'col-6'}`}
    />
  )));
}
PersonlizedFilter.propTypes = {
  filterInitialValues: PropTypes.object.isRequired,
  filtersList: PropTypes.array.isRequired,
};
export default PersonlizedFilter;
