import React from 'react';
import moment from 'moment';
import { useField, useFormikContext } from 'formik';

import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/form/date-picker.scss';
import { Box } from '@mui/material';
import { DATE_FORMAT } from 'utilities/constants';

function DatePickerField({
  name,
  value,
  minDate,
  maxDate,
  excludeDates,
  highlightDates,
  placeholder,
  id,
  disabled,
  displayFormat,
  onBlur,
  onChange,
  className,
  label,
  startIcon,
  isRequired,
  labelClassName,
  meta,
}) {
  const handleChange = (date, e) => {
    e.preventDefault();
    if (date && moment(date).isValid()) onChange(name, moment(date).format('yyyy-MM-DD'));
    else onChange(name, null);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  const selected = value ? moment(value, 'YYYY/MM/DD').toDate() : null;
  const { error, touched } = meta;
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
          <ReactDatePicker
            popperProps={{
              strategy: 'fixed',
            }}
            className="form__form-group-datepicker"
            id={id}
            name={name}
            selected={selected}
            onChange={handleChange}
            onBlur={handleBlur}
            showYearDropdown
            dateFormat={displayFormat}
            dropDownMode="select"
            // popperPlacement="center"
            placeholderText={placeholder}
            // withPortal={isMobileOnly}
            minDate={minDate}
            maxDate={maxDate}
            excludeDates={excludeDates}
            highlightDates={highlightDates}
            autoComplete="off"
            disabled={disabled}
          />
          {touched && error && <span className="form__form-group-error">{error}</span>}
        </Box>
      </Box>
    </Box>
  );
}
DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,

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
  meta: PropTypes.object,
};
DatePickerField.defaultProps = {
  placeholder: '',
  id: '',
  value: moment().format(DATE_FORMAT),
  minDate: '',
  maxDate: '',
  excludeDates: [],
  highlightDates: [],
  disabled: false,
  displayFormat: 'yyyy-mm-dd',
  className: 'col-md-6',
  startIcon: null,
  label: '',
  isRequired: false,
  labelClassName: 'col-lg-3',
  meta: {},
};

function FormikDatePicker(props) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  const handleOnChange = (key, value) => {
    setFieldValue(key, value);
  };
  return <DatePickerField {...field} meta={meta} onChange={handleOnChange} {...props} />;
}
FormikDatePicker.propTypes = {
  error: PropTypes.string,
  displayFormat: PropTypes.string,
  isRequired: PropTypes.bool,
};
FormikDatePicker.defaultProps = {
  error: null,
  displayFormat: 'yyyy-MM-dd',
  isRequired: false,
};
export default FormikDatePicker;
