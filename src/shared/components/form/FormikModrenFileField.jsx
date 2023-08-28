/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

function FormikModrenFileField({
  name,
  textArea,
  textRight,
  className,
  inputClassName,
  startIcon,
  onChange,
  onBlur,
  type,
  ...restProps
}) {
  const inputRef = useRef();
  const [field, meta] = useField(name || '');

  const { onChange: onValueChange, onBlur: onFieldBlur, value } = field;
  const { touched, error } = meta;

  const handleChange = event => {
    onValueChange(event);
    if (onChange) {
      if (type === 'file') onChange(event.target.files);
      else onChange(event.target.value);
    }
  };

  const handleBlur = event => {
    onFieldBlur(event);
    if (onBlur) onBlur(name, event.target.value);
  };
  return (
    <div className={`w-100 p-relative ${className}`}>
      {value && (
        <div className="h-100 border border-2 col-lg-8" style={{ position: 'absolute' }}>
          {value}
        </div>
      )}
      <input
        ref={inputRef}
        {...field}
        {...restProps}
        type={type}
        style={{ opacity: value ? 0 : 1 }}
        className={`${textRight ? 'text-right' : ''}  ${inputClassName}`}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {touched && error && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}

FormikModrenFileField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  textArea: PropTypes.bool,
  textRight: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  startIcon: PropTypes.string,
};

FormikModrenFileField.defaultProps = {
  type: 'text',
  textArea: false,
  textRight: false,
  disabled: false,
  className: '',
  inputClassName: '',
  placeholder: '',
  startIcon: '',
  onChange: () => {},
  onBlur: () => {},
};

export default FormikModrenFileField;
