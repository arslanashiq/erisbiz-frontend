import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Box } from '@mui/material';

function FormikField({
  name,
  textArea,
  textRight,
  className,
  inputClassName,
  startIcon,
  onChange,
  onBlur,
  type,
  label,
  isRequired,
  endIcon,
  endIconClick,
  labelClassName,
  endIconClass,
  ...restProps
}) {
  const [field, meta] = useField(name || '');

  const { onChange: onValueChange, onBlur: onFieldBlur, value, ...restFieldProps } = field;
  const { touched, error } = meta;

  const handleChange = event => {
    onValueChange(event);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleBlur = event => {
    onFieldBlur(event);
    if (onBlur) onBlur(name, event.target.value);
  };

  return (
    <Box className={`form__form-group ${className}`}>
      {label && (
        <span className={`form__form-group-label ${labelClassName} ${isRequired ? 'required' : ''}`}>
          {label}
        </span>
      )}
      <Box className="form__form-group-field">
        {startIcon && <Box className="form__form-group-icon cursor-pointer">{startIcon}</Box>}
        <Box className="w-100">
          {textArea && (
            <textarea
              {...restFieldProps}
              {...restProps}
              className={`${textRight ? 'text-right' : ''} ${inputClassName}`}
              value={value || ''}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {!textArea && (
            <input
              {...field}
              {...restProps}
              type={type}
              className={`${textRight ? 'text-right' : ''} ${inputClassName}`}
              value={value || ''}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {touched && error && <span className="form__form-group-error">{error}</span>}
        </Box>
        {endIcon && (
          <Box className={endIconClass} type="button" onClick={endIconClick}>
            {endIcon}
          </Box>
        )}
      </Box>
    </Box>
  );
}

FormikField.propTypes = {
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
  startIcon: PropTypes.element,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  endIcon: PropTypes.element,
  endIconClick: PropTypes.func,
  labelClassName: PropTypes.string,
  endIconClass: PropTypes.string,
};

FormikField.defaultProps = {
  type: 'text',
  textArea: false,
  textRight: false,
  disabled: false,
  className: 'col-md-6',
  labelClassName: 'col-lg-3',
  inputClassName: '',
  placeholder: '',
  startIcon: null,
  label: '',
  isRequired: false,
  endIcon: null,
  endIconClick: () => {},
  onChange: () => {},
  onBlur: () => {},
  endIconClass: 'form__form-group-icon cursor-pointer',
};

export default FormikField;
