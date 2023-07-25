import React from 'react';
import DatePicker from 'react-datepicker';
import { isMobileOnly } from 'react-device-detect';
import PropTypes from 'prop-types';
import moment from 'moment';

function DatePickerField(props) {
  const { name, value, id, minDate, maxDate, onChange } = props;
  const selected = value ? moment(value, 'YYYY/MM/DD').toDate() : null;
  const handleChange = (date, e) => {
    e.preventDefault();
    onChange(date);
  };
  return (
    <div className="date-picker">
      <DatePicker
        className="form__form-group-datepicker"
        id={id}
        name={name}
        value={value}
        selected={selected}
        onChange={handleChange}
        showYearDropdown
        dateFormat="dd/MM/yyyy"
        dropDownMode="select"
        popperPlacement="center"
        placeholderText="DD/MM/YYYY"
        withPortal={isMobileOnly}
        minDate={minDate}
        maxDate={maxDate}
        autoComplete="off"
      />
    </div>
  );
}

DatePickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

DatePickerField.defaultProps = {
  id: '',
  minDate: null,
  maxDate: null,
};
export default DatePickerField;
