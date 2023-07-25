/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

function RadioButtons({ name, options, onChange, ...restProps }) {
  return (
    <Field name={name}>
      {({
        field: {
          value: fieldValue,
          onChange: onFieldChange,
          ...restFieldProps
        },
      }) => {
        return options.map(option => {
          return (
            <React.Fragment key={option.label}>
              <label className="radio-btn">
                <input
                  className="radio-btn__radio"
                  type="radio"
                  id={option.value}
                  {...restFieldProps}
                  {...restProps}
                  value={option.value}
                  checked={fieldValue === option.value}
                  onChange={e => {
                    onFieldChange(e);
                    onChange(e.target.value);
                  }}
                />
                <span className="radio-btn__radio-custom" />
                <span className="radio-btn__label">{option.label}</span>
              </label>
            </React.Fragment>
          );
        });
      }}
    </Field>
  );
}

RadioButtons.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

RadioButtons.defaultProps = {
  name: '',
  options: [],
  onChange: () => {},
};

export default RadioButtons;
