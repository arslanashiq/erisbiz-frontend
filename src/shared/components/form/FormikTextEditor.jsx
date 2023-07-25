import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import TextEditor from '../text-editor/TextEditor';

function FormikTextEditor(props) {
  const { name, onChange, error, touched, defaultValue, ...rest } = props;

  return (
    <div className="form__form-group-input-wrap">
      <Field name={name} {...rest}>
        {fieldProps => (
          <TextEditor
            name={name}
            onChange={onChange}
            defaultValue={defaultValue}
            {...fieldProps}
          />
        )}
      </Field>
      {touched && error && (
        <span className="form__form-group-error">{error}</span>
      )}
    </div>
  );
}

FormikTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
};

FormikTextEditor.defaultProps = {
  touched: false,
  error: '',
  defaultValue: '',
};

export default FormikTextEditor;
