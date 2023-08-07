import React from 'react';
import moment from 'moment';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/date-picker.scss';

function DatePickerField({
  touched,
  error,
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
}) {
  const handleChange = (date, e) => {
    e.preventDefault();
    if (date && moment(date).isValid()) onChange(name, moment(date).format('YYYY/MM/DD'));
    else onChange(name, null);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  const selected = value ? moment(value, 'YYYY/MM/DD').toDate() : null;
  return (
    <div className="date-picker">
      <ReactDatePicker
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
    </div>
  );
}
DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  error: PropTypes.string,
  displayFormat: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  highlightDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  disabled: PropTypes.bool,
};
DatePickerField.defaultProps = {
  placeholder: '',
  id: '',
  touched: false,
  error: '',
  value: moment().format('YYYY/MM/DD'),
  minDate: '',
  maxDate: '',
  excludeDates: [],
  highlightDates: [],
  disabled: false,
  displayFormat: 'yyyy/MM/dd',
};

function FormikDatePicker(props) {
  const [field] = useField(props);
  return <DatePickerField {...field} {...props} />;
}
FormikDatePicker.propTypes = {
  error: PropTypes.string,
  displayFormat: PropTypes.string,
};
FormikDatePicker.defaultProps = {
  error: null,
  displayFormat: 'yyyy/MM/dd',
};
export default FormikDatePicker;
