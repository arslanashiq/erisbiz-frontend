import React from 'react';
import PropTypes from 'prop-types';
import FormikSelect from '../form/FormikSelect';
import FormikDatePicker from '../form/FormikDatePicker';
import FormikField from '../form/FormikField';

function RenderFIlterInput({ input, values }) {
  if (input.options) {
    return <FormikSelect key={input.name} {...input} />;
  }
  if (input.isDate) {
    if (values?.duration === 'custom' && input?.hidden) {
      return <FormikDatePicker key={input.name} {...input} />;
    }
    if (input?.hidden) {
      return '';
    }
    return <FormikDatePicker key={input.name} {...input} />;
  }

  return <FormikField key={input.name} {...input} />;
}

RenderFIlterInput.propTypes = {
  input: PropTypes.object,
  values: PropTypes.object,
};
RenderFIlterInput.defaultProps = {
  input: {},
  values: {},
};
export default RenderFIlterInput;
