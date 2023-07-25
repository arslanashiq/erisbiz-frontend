import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import AvTimerIcon from 'mdi-react/AvTimerIcon';
import classNames from 'classnames';
import { useField } from 'formik';

class TimePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    timeMode: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    theme: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    error: PropTypes.string,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    theme: 'theme-light',
    touched: false,
    error: '',
    placeholder: '',
  };

  state = {
    open: false,
  };

  setOpen = ({ open }) => {
    this.setState({ open });
  };

  setClose = ({ open }) => {
    this.setState({ open });
    this.handleBlur();
  };

  toggleOpen = e => {
    e.preventDefault();
    this.setState(prevState => ({ open: !prevState.open }));
  };

  handleChange = time => {
    const { onChange, name } = this.props;
    if (time) onChange(name, time);
    else onChange(name, null);
  };

  handleBlur = () => {
    const { onBlur, name } = this.props;
    onBlur(name, true);
  };

  handleAmPmChange = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      name,
      placeholder,
      timeMode,
      theme,
      error,
      touched,
      value,
      disabled,
    } = this.props;
    const { open } = this.state;
    const btnClass = classNames({
      'form__form-group-button': true,
      active: open,
    });

    return (
      <div className="w-100">
        <div className="form__form-group-field w-100">
          <TimePicker
            open={open}
            onOpen={this.setOpen}
            onClose={this.setClose}
            name={name}
            value={value}
            onChange={this.handleChange}
            onAmPmChange={this.handleAmPmChange}
            showSecond={false}
            popupClassName={
              theme === 'theme-dark' ? 'theme-dark' : 'theme-light'
            }
            use12Hours={timeMode}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
          />
          <button className={btnClass} type="button" onClick={this.toggleOpen}>
            <AvTimerIcon />
          </button>
        </div>
        {touched && error && (
          <span className="form__form-group-error">{error}</span>
        )}
      </div>
    );
  }
}

const FormikTimePicker = props => {
  const { timeMode, theme, disabled } = props;
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field] = useField(props);
  return (
    <TimePickerField
      {...field}
      {...props}
      timeMode={timeMode}
      theme={theme}
      disabled={disabled}
    />
  );
};

FormikTimePicker.propTypes = {
  disabled: PropTypes.bool,
  timeMode: PropTypes.bool,
  theme: PropTypes.string,
};

FormikTimePicker.defaultProps = {
  disabled: false,
  timeMode: false,
  theme: null,
};

export default FormikTimePicker;
