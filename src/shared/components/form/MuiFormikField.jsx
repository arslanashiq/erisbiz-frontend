import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Box, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import palette from 'styles/mui/theme/palette';
import { mainColor } from 'containers/auth/utilities/constant';

function MuiFormikField({
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
    <Grid item xs={12} className={`w-100 ${className}`}>
      {label && <Typography className={` ${isRequired ? 'required' : ''}`}>{label}</Typography>}
      <OutlinedInput
        {...field}
        {...restProps}
        startAdornment={
          startIcon && (
            <InputAdornment position="start">
              <Box sx={{ padding: '3px 5px', boxShadow: '1px 1px 5px silver' }}>{startIcon}</Box>
            </InputAdornment>
          )
        }
        sx={{
          // maxWidth: 400,
          width: '100%',
          backgroundColor: palette.primary.contrastText,
          borderColor: mainColor,
        }}
        endAdornment={endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>}
        type={type}
        required={isRequired}
        className={`${textRight ? 'text-right' : ''} ${inputClassName}`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched && error && <span className="form__form-group-error">{error}</span>}
    </Grid>
  );
}

MuiFormikField.propTypes = {
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

MuiFormikField.defaultProps = {
  type: 'text',
  textArea: false,
  textRight: false,
  disabled: false,
  className: 'mt-3',
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

export default MuiFormikField;
