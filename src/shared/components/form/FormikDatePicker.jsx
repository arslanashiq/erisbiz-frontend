import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { isMobileOnly } from 'react-device-detect';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import moment from 'moment';

class DatePickerField extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    error: PropTypes.string,
    displayFormat: PropTypes.string,
    minDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    maxDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    highlightDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
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

  handleChange = (date, e) => {
    e.preventDefault();
    const { onChange, name } = this.props;
    if (date && moment(date).isValid())
      onChange(name, moment(date).format('YYYY/MM/DD'));
    else onChange(name, null);
  };

  handleBlur = () => {
    const { onBlur, name } = this.props;
    onBlur(name, true);
  };

  render() {
    const {
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
    } = this.props;

    const selected = value ? moment(value, 'YYYY/MM/DD').toDate() : null;

    return (
      <div className="date-picker">
        <DatePicker
          className="form__form-group-datepicker"
          id={id}
          name={name}
          selected={selected}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          showYearDropdown
          dateFormat={displayFormat}
          dropDownMode="select"
          // popperPlacement="center"
          placeholderText={placeholder}
          withPortal={isMobileOnly}
          minDate={minDate}
          maxDate={maxDate}
          excludeDates={excludeDates}
          highlightDates={highlightDates}
          autoComplete="off"
          disabled={disabled}
        />
        {touched && error && (
          <span className="form__form-group-error">{error}</span>
        )}
      </div>
    );
  }
}

const FormikDatePickerField = props => {
  FormikDatePickerField.propTypes = {
    error: PropTypes.string,
    displayFormat: PropTypes.string,
  };
  FormikDatePickerField.defaultProps = {
    error: null,
    displayFormat: 'yyyy/MM/dd',
  };
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field] = useField(props);
  return <DatePickerField {...field} {...props} />;
};

export default FormikDatePickerField;
