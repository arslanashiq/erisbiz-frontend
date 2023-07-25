import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class FormikMultiSelect extends Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topics
    const { onChange, name } = this.props;
    onChange(
      name,
      value.map(item => item.value)
    );
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topics
    const { onBlur, name } = this.props;
    onBlur(name, true);
  };

  render() {
    const {
      value,
      itemOptions,
      touched,
      error,
      className,
      placeholder,
      disabled,
      menuPosition,
    } = this.props;
    return (
      <div
        styles={{ height: 22 }}
        className={`multi-select-options form__form-group-input-wrap ${className}`}
      >
        <Select
          id="color"
          options={itemOptions}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={itemOptions.filter(option => value.indexOf(option.value) >= 0)}
          placeholder={placeholder}
          classNamePrefix="react-select"
          isDisabled={disabled}
          menuPosition={menuPosition}
        />
        {touched && error && (
          <span className="form__form-group-error">{error}</span>
        )}
      </div>
    );
  }
}

FormikMultiSelect.propTypes = {
  itemOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  error: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  menuPosition: PropTypes.string,
};

FormikMultiSelect.defaultProps = {
  itemOptions: [],
  touched: false,
  error: null,
  className: null,
  placeholder: null,
  disabled: false,
  menuPosition: 'absolute',
};

export default FormikMultiSelect;
