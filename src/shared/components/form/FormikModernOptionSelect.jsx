import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { useField, useFormikContext } from 'formik';

// Child
const CheckBoxOption = props => {
  const { isSelected, children } = props;
  return (
    <components.Option {...props}>
      <div className="d-flex align-items-center">
        <input type="checkbox" className="w-auto h-auto" checked={isSelected} />
        <span className="pl-3">{children}</span>
      </div>
    </components.Option>
  );
};

// Child
const OptionSelectContainer = props => {
  const { hasValue, getValue, children } = props;
  const values = getValue();

  // If No Value is selected then default view
  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }

  // If All options are selected
  if (values.find(item => !item.value)) {
    return (
      <components.ValueContainer {...props}>
        <span>All</span>
      </components.ValueContainer>
    );
  }

  const selectedOptionsLabels = values.map(item => item.label);

  return (
    <components.ValueContainer {...props}>
      <div className="w-100 d-flex align-items-center">
        {selectedOptionsLabels.join(', ')}
      </div>
    </components.ValueContainer>
  );
};

const FormikModernOptionSelect = ({
  name,
  options,
  customClass,
  disabled,
  onChange,
  onBlur,
  ...restProps
}) => {
  const [field, meta] = useField(name || '');
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const { value } = field;
  const { touched, error } = meta;

  const handleChange = selectedOptions => {
    // If 'All' Option is checked or no option is selected
    const allOptionsSelected =
      selectedOptions.length === 0 ||
      Boolean(selectedOptions.find(item => !item.value));

    // Empty string if 'All' option is selected else selected options
    const selectedValues = allOptionsSelected
      ? ''
      : selectedOptions.map(item => item.value);
    setFieldValue(name, selectedValues);
    if (onChange) onChange(selectedValues);
  };

  const handleBlur = event => {
    setFieldTouched(name, true);
    if (onBlur) onBlur(name, event.target.value);
  };

  const selectedOptions = value
    ? options.filter(option => value.includes(option.value))
    : [...options];

  return (
    <div
      styles={{ height: 22 }}
      className={`form__form-group-input-wrap ${customClass}`}
      id={name}
    >
      <Select
        {...restProps}
        id="select"
        options={options}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isMulti
        onChange={handleChange}
        onBlur={handleBlur}
        value={selectedOptions}
        classNamePrefix="react-select"
        isDisabled={disabled}
        disabled={disabled}
        components={{
          Option: CheckBoxOption,
          ValueContainer: OptionSelectContainer,
        }}
        isClearable={Boolean(value)}
        styles={{
          valueContainer: styles => ({
            ...styles,
            height: selectedOptions.length > 0 ? '100%' : 'initial',
          }),
        }}
      />
      {touched && error && (
        <span className="form__form-group-error">{error}</span>
      )}
    </div>
  );
};

CheckBoxOption.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

OptionSelectContainer.propTypes = {
  hasValue: PropTypes.bool.isRequired,
  getValue: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

FormikModernOptionSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  customClass: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  menuPosition: PropTypes.string,
  menuPlacement: PropTypes.string,
  menuShouldBlockScroll: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

FormikModernOptionSelect.defaultProps = {
  options: [],
  customClass: '',
  placeholder: '',
  disabled: false,
  menuPosition: 'absolute',
  menuPlacement: 'auto',
  menuShouldBlockScroll: false,
  onChange: () => {},
  onBlur: () => {},
};

export default FormikModernOptionSelect;
