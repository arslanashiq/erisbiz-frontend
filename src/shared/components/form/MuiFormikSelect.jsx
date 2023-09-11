import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import Select from 'react-select';

import { Stack, Typography } from '@mui/material';

function MuiFormikSelect({
  name,
  textArea,
  textRight,
  className,
  inputClassName,
  startIcon,
  onChange,
  onBlur,
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
      onChange(event.target.value);
    }
  };

  const handleBlur = event => {
    onFieldBlur(event);
    if (onBlur) onBlur(name, event.target.value);
  };
  return (
    <Stack>
      {label && <Typography className={` ${isRequired ? 'required' : ''}`}>{label}</Typography>}
      <Select
        {...field}
        {...restProps}
        select
        required={isRequired}
        className={`${textRight ? 'text-right' : ''} ${inputClassName}`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        options={[
          { label: 'saas', value: '1' },
          { label: 'saas', value: '2' },
        ]}
      />
      {touched && error && <span className="form__form-group-error">{error}</span>}
    </Stack>
  );
}

MuiFormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
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

MuiFormikSelect.defaultProps = {
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

export default MuiFormikSelect;
