import React, { useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import 'styles/form/check-box.scss';

function CheckBoxField({
  name,
  defaultChecked,
  disabled,
  color,
  className,
  label,
  onChange,
  onBlur,
  parentClass,
  ...restProps
}) {
  const [field, meta] = useField(name || '');
  const { onChange: onValueChange, onBlur: onFieldBlur, value } = field;
  const { touched, error } = meta;
  const { setFieldValue } = useFormikContext();

  const CheckboxClass = classNames({
    'checkbox-btn': true,
    disabled,
  });
  const handleChange = event => {
    onValueChange(event);
    if (onChange) onChange(event.target.value);
  };
  const handleBlur = event => {
    onFieldBlur(event);
    if (onBlur) onBlur(name, event.target.value);
  };
  useEffect(() => {
    if (defaultChecked || value === true || value === 'true') {
      setFieldValue(name, true);
    } else {
      setFieldValue(name, false);
    }
  }, [defaultChecked]);

  return (
    <div className={`form__form-group-field ${parentClass}`}>
      <label
        className={`align-items-center ${CheckboxClass} ${className ? ` checkbox-btn--${className}` : ''}`}
        htmlFor={name}
      >
        <input
          className="checkbox-btn__checkbox"
          type="checkbox"
          {...field}
          {...restProps}
          id={name}
          name={name}
          onChange={handleChange}
          checked={value}
          disabled={disabled}
          onBlur={handleBlur}
        />
        <span
          className="checkbox-btn__checkbox-custom"
          style={color ? { background: color, borderColor: color } : {}}
        >
          <CheckIcon />
        </span>
        {className === 'button' ? (
          <span className="checkbox-btn__label-svg">
            <CheckIcon className="checkbox-btn__label-check" />
            {/* <CloseIcon className="checkbox-btn__label-uncheck" /> */}
          </span>
        ) : (
          ''
        )}
        <span className="checkbox-btn__label">{label}</span>
      </label>
      {touched && error && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}
CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  parentClass: PropTypes.string,
};
CheckBoxField.defaultProps = {
  parentClass: 'form__form-group-field',
  label: '',
  defaultChecked: false,
  disabled: false,
  className: '',
  color: '',
  onChange: null,
  onBlur: null,
  onClick: null,
};

export { CheckBoxField };
export const test = '';
