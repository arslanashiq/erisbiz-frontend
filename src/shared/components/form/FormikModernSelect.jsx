import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { useField, useFormikContext } from 'formik';

const CUSTOM_BUTTON_VALUE = 'custom-menu-button';

const commonStyles = {
  menu: baseStyles => ({
    ...baseStyles,
    zIndex: 10,
  }),
  option: ({ isDisabled }) => ({
    cursor: isDisabled ? 'not-allowed' : 'default',
    color: isDisabled ? '#aaa !important' : '#000',
  }),
};

const groupedStyles = {
  groupHeading: provided => ({
    ...provided,
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#000000',
  }),
  option: (styles, { isDisabled }) => ({
    ...styles,
    paddingLeft: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '13px',
    cursor: isDisabled ? 'not-allowed' : 'default',
    color: isDisabled ? '#aaa !important' : '#000',
  }),
};

function FormikModernSelect({
  name,
  options,
  customClass,
  disabled,
  onChange,
  onBlur,
  isGrouped,
  isClearable,
  onMenuCustomButtonClick,
  menuCustomButtonLabel,
  ...restProps
}) {
  const [field, meta] = useField(name || '');
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const { value } = field;
  const { touched, error } = meta;

  const handleChange = selectedOption => {
    // Do not change anything if custom button is clicked
    if (selectedOption && selectedOption.value === CUSTOM_BUTTON_VALUE) return;

    const fieldValue = selectedOption ? selectedOption.value : null;
    setFieldValue(name, fieldValue);
    if (onChange) onChange(fieldValue);
  };

  const handleBlur = event => {
    setFieldTouched(name, true);
    if (onBlur) onBlur(name, event.target.value);
  };

  const allOptions = isGrouped ? options.map(item => item.options).flatMap(item => item) : [...options];
  const selectedOption = allOptions.find(option => option.value === value);

  const customButtonOption = {
    label: (
      <Button block color="primary" className="icon-btn" onClick={onMenuCustomButtonClick}>
        {menuCustomButtonLabel}
      </Button>
    ),
    value: CUSTOM_BUTTON_VALUE,
  };

  const modifiedOptions = useMemo(() => [
    ...options,
    ...(onMenuCustomButtonClick ? [customButtonOption] : []),
  ]);

  return (
    <div className={`form__form-group-input-wrap ${customClass}`} id={name}>
      <Select
        {...restProps}
        id="select"
        options={modifiedOptions}
        multi
        onChange={handleChange}
        onBlur={handleBlur}
        value={selectedOption || null}
        classNamePrefix="react-select"
        isDisabled={disabled}
        disabled={disabled}
        isClearable={isClearable}
        styles={{ ...commonStyles, ...(isGrouped ? groupedStyles : {}) }}
      />
      {touched && error && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}

FormikModernSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  customClass: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  menuPosition: PropTypes.string,
  menuPlacement: PropTypes.string,
  menuShouldBlockScroll: PropTypes.bool,
  components: PropTypes.object,
  isGrouped: PropTypes.bool,
  isClearable: PropTypes.bool,
  formatOptionLabel: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onMenuCustomButtonClick: PropTypes.func,
  menuCustomButtonLabel: PropTypes.string,
};

FormikModernSelect.defaultProps = {
  options: [],
  customClass: '',
  placeholder: '',
  disabled: false,
  menuPosition: 'absolute',
  menuPlacement: 'auto',
  menuShouldBlockScroll: false,
  components: undefined,
  isGrouped: false,
  isClearable: false,
  formatOptionLabel: null,
  onChange: () => {},
  onBlur: () => {},
  onMenuCustomButtonClick: null,
  menuCustomButtonLabel: 'Add New',
};

export default FormikModernSelect;
