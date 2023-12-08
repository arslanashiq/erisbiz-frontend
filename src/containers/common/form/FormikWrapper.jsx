import React from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import 'styles/form/form.scss';

function FormikWrapper({ initialValues, validationSchema, onSubmit, children }) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form form--horizontal row mt-3">{children}</Form>
    </Formik>
  );
}
FormikWrapper.propTypes = {
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
FormikWrapper.defaultProps = {
  initialValues: {},
  validationSchema: {},
};
export default FormikWrapper;
