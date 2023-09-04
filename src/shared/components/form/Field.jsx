import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

function FormikTextArea({ className, ...props }) {
  FormikTextArea.propTypes = {
    className: PropTypes.string,
  };
  FormikTextArea.defaultProps = {
    className: null,
  };
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field] = useField(props);
  return <textarea {...field} className={className} {...props} />;
}

function FormikField({
  textArea,
  textRight,
  className,
  touched,
  error,
  disabled,
  placeholder,
  type,
  onChange,
  ...props
}) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field] = useField(props);

  const handleChange = e => {
    field.onChange(e);
    if (onChange) onChange(e);
  };

  return (
    <div className={`form__form-group-input-wrap ${className}`}>
      {textArea && <textarea {...field} disabled={disabled} placeholder={placeholder} />}
      {!textArea && (
        <input
          {...field}
          {...props}
          type={type}
          className={textRight ? 'text-right' : ''}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
        />
      )}
      {touched && error && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}

FormikField.propTypes = {
  textArea: PropTypes.bool,
  textRight: PropTypes.bool,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  // inputType: PropTypes.string,
};

FormikField.defaultProps = {
  textArea: false,
  textRight: false,
  touched: false,
  disabled: false,
  className: null,
  placeholder: null,
  error: null,
  onChange: null,
  type: 'text',
  // inputType: null,
};

function renderFormikFieldWithLabel({ label, id, name, className, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  renderFormikFieldWithLabel.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
  };
  renderFormikFieldWithLabel.defaultProps = {
    id: null,
    name: null,
    label: null,
    className: null,
  };
  const [field, meta] = useField(props);
  return (
    <div className={`form__form-group-input-wrap ${className}`}>
      <label htmlFor={id || name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? <span className="form__form-group-error">{meta.error}</span> : null}
    </div>
  );
}

function renderField({
  input,
  // label,
  placeholder,
  type,
  className,
  meta: { touched, error },
  textArea,
  textRight,
  disabled,
}) {
  return (
    <div className={`form__form-group-input-wrap ${className}`}>
      {textArea && <textarea {...input} placeholder={placeholder} type={type} />}
      {!textArea && (
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          className={textRight ? 'text-right' : ''}
          disabled={disabled}
        />
      )}
      {touched && error && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}

renderField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  textArea: PropTypes.bool,
  textRight: PropTypes.bool,
  disabled: PropTypes.bool,
};

renderField.defaultProps = {
  meta: null,
  label: '',
  placeholder: '',
  type: '',
  className: '',
  textArea: false,
  textRight: false,
  disabled: false,
};

export { renderField, FormikField, FormikTextArea, renderFormikFieldWithLabel };
