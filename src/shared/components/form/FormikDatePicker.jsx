/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/form/date-picker.scss';
import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';

function FormikDatePicker({
  name,
  placeholder,
  id,
  minDate,
  maxDate,
  excludeDates,
  highlightDates,
  disabled,
  displayFormat,
  className,
  startIcon,
  label,
  isRequired,
  labelClassName,
  onChange,
  onBlur,
}) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name || '');
  const { touched, error } = meta;
  const { onBlur: onFieldBlur, value } = field;

  const handleChange = date => {
    if (onChange) onChange(date);
    setFieldValue(name, moment(date).format(DATE_FORMAT));
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
      <Box className="form__form-group-field ">
        {startIcon && <Box className="form__form-group-icon cursor-pointer">{startIcon}</Box>}

        <Box className="date-picker">
          <DatePicker
            id={id}
            name={name}
            className="form__form-group-datepicker"
            selected={value ? moment(value).toDate() : new Date()}
            onChange={handleChange}
            onBlur={handleBlur}
            showYearDropdown
            dateFormat={displayFormat}
            placeholderText={placeholder}
            minDate={minDate}
            maxDate={maxDate}
            excludeDates={excludeDates}
            highlightDates={highlightDates}
            autoComplete="off"
            disabled={disabled}
            dropDownMode="select"
            popperProps={{
              strategy: 'fixed',
            }}
          />

          {touched && error && <span className="form__form-group-error">{error}</span>}
        </Box>
      </Box>
    </Box>
  );
}
FormikDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  displayFormat: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  highlightDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  startIcon: PropTypes.element,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  labelClassName: PropTypes.string,
};
FormikDatePicker.defaultProps = {
  placeholder: '',
  id: '',
  minDate: null,
  maxDate: null,
  excludeDates: [],
  highlightDates: [],
  disabled: false,
  displayFormat: 'yyyy-MM-dd',
  className: 'col-md-6',
  labelClassName: 'col-lg-3',
  startIcon: null,
  label: '',
  isRequired: false,
  onChange: null,
  onBlur: null,
};
export default FormikDatePicker;
