import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/date-picker.scss';

function FormikModernDatePicker({
  name,
  placeholder,
  dateDisplayFormat,
  dateValueFormat,
  onChange,
  onBlur,
  showCalenderIcon,
  ...restProps
}) {
  const [field, meta] = useField(name || '');
  const { setFieldValue } = useFormikContext();

  const { onBlur: onFieldBlur, value } = field;
  const { touched, error } = meta;

  const handleChange = date => {
    if (date && moment(date).isValid()) {
      const selectedDate = moment(date).format(dateValueFormat);
      setFieldValue(name, selectedDate);
      if (onChange) onChange(selectedDate);
    }
  };

  const handleBlur = event => {
    onFieldBlur(event);
    if (onBlur) onBlur(name, event.target.value);
  };

  const selectedDate = value ? moment(value, dateValueFormat).toDate() : null;

  return (
    <div className="date-picker">
      <DatePicker
        {...restProps}
        className="form__form-group-datepicker"
        name={name}
        selected={selectedDate}
        onChange={handleChange}
        onBlur={handleBlur}
        showYearDropdown
        dateFormat={dateDisplayFormat}
        dropDownMode="select"
        popperPlacement="center"
        // withPortal={isMobileOnly}
        placeholderText={placeholder}
        shouldCloseOnSelect
        autoComplete="off"
      />
      {touched && error && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}

FormikModernDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  dateDisplayFormat: PropTypes.string,
  dateValueFormat: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  highlightDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  disabled: PropTypes.bool,
  showCalenderIcon: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

FormikModernDatePicker.defaultProps = {
  placeholder: '',
  id: '',
  minDate: '',
  maxDate: '',
  excludeDates: [],
  highlightDates: [],
  disabled: false,
  dateDisplayFormat: 'yyyy/MM/dd',
  dateValueFormat: 'YYYY-MM-DD',
  showCalenderIcon: false,
  onChange: () => {},
  onBlur: () => {},
};

export default FormikModernDatePicker;
