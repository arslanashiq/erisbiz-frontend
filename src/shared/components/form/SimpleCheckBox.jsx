import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckIcon from 'mdi-react/CheckIcon';
import CloseIcon from 'mdi-react/CloseIcon';

const SimpleCheckBox = ({
  className,
  disabled,
  onChange,
  value,
  name,
  color,
  label,
}) => {
  const CheckboxClass = classNames({
    'checkbox-btn': true,
    disabled,
  });

  return (
    <label
      className={`${CheckboxClass} ${
        className ? ` checkbox-btn--${className}` : ''
      }`}
      htmlFor={name}
    >
      <input
        className="checkbox-btn__checkbox"
        type="checkbox"
        id={name}
        name={name}
        onChange={onChange}
        checked={value}
        disabled={disabled}
      />
      <span
        className="checkbox-btn__checkbox-custom"
        style={color ? { background: color, borderColor: color } : {}}
      >
        <CheckIcon />
      </span>
      {className === 'button' ? (
        <span className="checkbox-btn__label-svg">
          <CheckIcon className="checkbox-btn__label-check" />
          <CloseIcon className="checkbox-btn__label-uncheck" />
        </span>
      ) : (
        ''
      )}
      <span className="checkbox-btn__label">{label}</span>
    </label>
  );
};

SimpleCheckBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default SimpleCheckBox;
