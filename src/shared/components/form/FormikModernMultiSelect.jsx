import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

const FormikModernMultiSelect = ({
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
    const fieldValues = selectedOptions.map(item => item.value);
    setFieldValue(name, fieldValues);
    if (onChange) onChange(fieldValues);
  };

  const handleBlur = event => {
    setFieldTouched(name, true);
    if (onBlur) onBlur(name, event.target.value);
  };

  const selectedOptions = options.filter(option =>
    value.includes(option.value)
  );

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
        isMulti
        onChange={handleChange}
        onBlur={handleBlur}
        value={selectedOptions}
        classNamePrefix="react-select"
        isDisabled={disabled}
        disabled={disabled}
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

FormikModernMultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  customClass: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  menuPosition: PropTypes.string,
  menuPlacement: PropTypes.string,
  menuShouldBlockScroll: PropTypes.bool,
  formatOptionLabel: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

FormikModernMultiSelect.defaultProps = {
  options: [],
  customClass: '',
  placeholder: '',
  disabled: false,
  menuPosition: 'absolute',
  menuPlacement: 'auto',
  menuShouldBlockScroll: false,
  formatOptionLabel: null,
  onChange: () => {},
  onBlur: () => {},
};

export default FormikModernMultiSelect;
