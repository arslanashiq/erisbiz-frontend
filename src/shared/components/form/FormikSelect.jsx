import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';
import 'styles/form/react-select.scss';
import { Box, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const CUSTOM_BUTTON_VALUE = 'custom-menu-button';

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
    fontWeight: 800,
    color: '#00000',
  }),
  option: (styles, { isDisabled }) => ({
    ...styles,
    paddingLeft: '20px !important',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '13px',
    cursor: isDisabled ? 'not-allowed' : 'default',
    color: isDisabled ? '#aaa !important' : '#000',
  }),
};

function FormikSelect({
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
  startIcon,
  label,
  className,
  isRequired,
  addNewButtonAction,
  addNewButtonLabel,
  labelClassName,
  isMulti,
  ...restProps
}) {
  const [field, meta] = useField(name || '');
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const { value } = field;
  const { touched, error } = meta;

  const handleChange = selectedOption => {
    // Do not change anything if custom button is clicked
    if (selectedOption && selectedOption.value === CUSTOM_BUTTON_VALUE) return;
    let fieldValue = '';
    if (isMulti) {
      fieldValue = [];
      selectedOption?.forEach(option => fieldValue.push(option.value));
    } else {
      fieldValue = selectedOption ? selectedOption.value : null;
    }
    setFieldValue(name, fieldValue);
    if (onChange) onChange(fieldValue);
  };

  const handleBlur = event => {
    setFieldTouched(name, true);
    if (onBlur) onBlur(name, event.target.value);
  };

  const allOptions = isGrouped ? options.map(item => item.options).flatMap(item => item) : [...options];
  const selectedOption = useMemo(() => {
    let selectedValue = '';

    if (isMulti) {
      selectedValue = allOptions.filter(option => value.includes(option.value));
    } else {
      selectedValue = allOptions.find(option => value === option.value);
    }

    return selectedValue;
  }, [value, allOptions]);

  const modifiedOptions = useMemo(() => {
    let newValues = [...options];
    if (addNewButtonAction) {
      newValues = [
        ...newValues,
        {
          value: CUSTOM_BUTTON_VALUE,
          label: (
            <Stack width="100%" padding="1px 10px" justifyContent="center">
              <Button size="small" sx={{ width: '100%', fontSize: 12 }} onClick={addNewButtonAction}>
                <AddIcon fontSize="10px" />
                {addNewButtonLabel}
              </Button>
            </Stack>
          ),
        },
      ];
    }
    return newValues;
  }, [options, addNewButtonAction]);

  return (
    <Box className={`form__form-group ${className}`}>
      {label && (
        <span className={`form__form-group-label ${labelClassName} ${isRequired ? 'required' : ''}`}>
          {label}
        </span>
      )}
      <Box className="form__form-group-field">
        {startIcon && <Box className="form__form-group-icon cursor-pointer">{startIcon}</Box>}
        <Box className={`form__form-group-input-wrap ${customClass}`} id={name}>
          <Select
            {...restProps}
            id="select"
            options={modifiedOptions}
            multi
            isMulti={isMulti}
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
        </Box>
      </Box>
    </Box>
  );
}

FormikSelect.propTypes = {
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
  startIcon: PropTypes.element,
  label: PropTypes.string,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  addNewButtonAction: PropTypes.func,
  addNewButtonLabel: PropTypes.string,
  labelClassName: PropTypes.string,
  isMulti: PropTypes.bool,
};

FormikSelect.defaultProps = {
  options: [],
  customClass: '',
  placeholder: '',
  disabled: false,
  menuPosition: 'fixed',
  menuPlacement: 'auto',
  menuShouldBlockScroll: false,
  components: undefined,
  isGrouped: false,
  isClearable: false,
  formatOptionLabel: null,
  className: 'col-md-6',
  isRequired: false,
  onChange: () => {},
  onBlur: () => {},
  onMenuCustomButtonClick: null,
  menuCustomButtonLabel: 'Add New',
  startIcon: null,
  label: '',
  addNewButtonAction: null,
  addNewButtonLabel: '',
  labelClassName: 'col-lg-3',
  isMulti: false,
};

export default FormikSelect;
