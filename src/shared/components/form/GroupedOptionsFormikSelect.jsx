import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const customStyles = {
  option: (styles, { isDisabled }) => ({
    ...styles,
    paddingLeft: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '13px',
    cursor: isDisabled ? 'not-allowed' : 'default',
    color: isDisabled ? '#aaa !important' : '#000',
  }),
  groupHeading: provided => ({
    ...provided,
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#000000',
  }),
  menu: provided => ({
    ...provided,
    minWidth: '200px',
  }),
};

function selectedValue(itemOptions, value) {
  let filtered = itemOptions.find(option => {
    if (typeof option.label === 'object') {
      return false;
    }
    if (option.options) {
      return option.options.find(item => item.value === value);
    }
    return option.value === value;
  });

  if (filtered && filtered.options) {
    filtered = filtered.options.find(item => item.value === value);
  }
  return filtered;
}

class GroupedOptionsFormikSelect extends Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topics
    const { onChange, name } = this.props;
    onChange(name, value.value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topics
    const { onBlur, name } = this.props;
    onBlur(name, true);
  };

  render() {
    const { itemOptions, touched, name, value, error, customClass, placeholder, menuPosition, disabled } =
      this.props;
    return (
      <div
        // styles={{ height: 22 }}
        className={`form__form-group-input-wrap ${customClass}`}
        id={name}
      >
        <Select
          {...this.props}
          id="color"
          options={itemOptions}
          multi
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={selectedValue(itemOptions, value)}
          placeholder={placeholder}
          classNamePrefix="react-select"
          isDisabled={disabled}
          styles={customStyles}
          menuPosition={menuPosition}
        />
        {touched && error && <span className="form__form-group-error">{error}</span>}
      </div>
    );
  }
}

GroupedOptionsFormikSelect.propTypes = {
  itemOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
  customClass: PropTypes.string,
  placeholder: PropTypes.string,
  menuPosition: PropTypes.string,
  disabled: PropTypes.bool,
};

GroupedOptionsFormikSelect.defaultProps = {
  touched: false,
  error: null,
  customClass: null,
  placeholder: null,
  disabled: false,
  menuPosition: 'fixed',
};

export default GroupedOptionsFormikSelect;
