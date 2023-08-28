import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

function FormikModernField({
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
    <div className={`w-100 ${className}`}>
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
        <>
          {startIcon}
          <input
            {...field}
            {...restProps}
            type={type}
            className={`${textRight ? 'text-right' : ''} ${inputClassName}`}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </>
      )}
      {touched && error && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}

FormikModernField.propTypes = {
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

FormikModernField.defaultProps = {
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

export default FormikModernField;
