/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { Button, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import FormikField from 'shared/components/form/FormikField';
import { getsearchQueryOffsetAndLimitParams, handlePersonlizedFilterString } from 'utilities/filters';
import 'styles/form/form.scss';
import FormikSelect from '../form/FormikSelect';
import FormikDatePicker from '../form/FormikDatePicker';

function PersonlizedFilter({ filterInitialValues, filtersList }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = {
    offset: getsearchQueryOffsetAndLimitParams(location).offset,
    limit: getsearchQueryOffsetAndLimitParams(location).limit,
    ...filterInitialValues,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async values => {
        try {
          navigate({
            pathname: `${window.location.pathname}`,
            search: handlePersonlizedFilterString(values),
          });
        } catch (err) {
          enqueueSnackbar(err.message, { variant: 'error' });
        }
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form className="form personlized-search-form row pt-3 align-items-end">
          {/* Supplier Name */}
          {filtersList.map(filter => (filter.options ? (
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
          )))}

          <Stack spacing={2} direction="row">
            <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
              Filter
            </Button>

            <Button
              color="secondary"
              onClick={() => resetForm()}
              //   disabled={!touched || isSubmitting}
              className="text-capitalize"
            >
              Reset
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
PersonlizedFilter.propTypes = {
  filterInitialValues: PropTypes.object.isRequired,
  filtersList: PropTypes.array.isRequired,
};
export default PersonlizedFilter;
