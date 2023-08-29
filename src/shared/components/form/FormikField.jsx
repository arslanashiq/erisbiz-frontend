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
  ...restProps
}) {
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
    <div className={`form__form-group align-items-center ${className}`}>
      {label && (
        <span className={`form__form-group-label col-lg-3 ${isRequired ? 'required' : ''}`}>{label}</span>
      )}
      <div className="form__form-group-field">
        {startIcon && <div className="form__form-group-icon cursor-pointer">{startIcon}</div>}
        <div className="w-100">
          {textArea && (
            <textarea
              {...field}
              {...restProps}
              className={`${textRight ? 'text-right' : ''} ${inputClassName}`}
              value={value}
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
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {touched && error && <span className="form__form-group-error">{error}</span>}
        </div>
        {endIcon && (
          <Box className="form__form-group-icon cursor-pointer" type="button" onClick={endIconClick}>
            {endIcon}
          </Box>
        )}
      </div>
    </div>
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
};

FormikField.defaultProps = {
  type: 'text',
  textArea: false,
  textRight: false,
  disabled: false,
  className: 'col-md-6',
  inputClassName: '',
  placeholder: '',
  startIcon: null,
  label: '',
  isRequired: false,
  endIcon: null,
  endIconClick: () => {},
  onChange: () => {},
  onBlur: () => {},
};

export default FormikField;
