import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Box } from '@mui/material';

function FormikFileField(props) {
  // added accept prop in field
  const {
    name,
    fileBase64,
    onRemoveFile,
    accept,
    className,
    multiple,
    onChange,
    label,
    isRequired,
    ...restProps
  } = props;
  const [field, meta, helpers] = useField(props);
  const { value, onChange: onFieldValueChange, ...restFieldProps } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const hasPreviewableImage = value && !Array.isArray(value) && value.type.includes('image');

  return (
    <Box className={`form__form-group ${className}`}>
      <span className={`form__form-group-label col-lg-3 ${isRequired ? 'required' : ''}`}>{label}</span>
      <Box className="form__form-group-field">
        <Box className="form__form-group-input-wrap">
          <Box className="text-center box">
            <input
              {...restProps}
              {...restFieldProps}
              type="file"
              id={name}
              accept={accept}
              multiple={multiple}
              className={`${hasPreviewableImage || fileBase64 ? 'd-none' : 'd-auto'} inputfile inputfile-4`}
              onChange={event => {
                event.preventDefault();
                const target = multiple ? [...event.target.files] : event.target.files[0];
                // eslint-disable-next-line no-param-reassign
                event.target.value = null;
                setValue(target);
                if (onChange) onChange(target);
              }}
            />
            <div className="border border-1"> </div>
            {console.log(value.length, 'aslkjdlksadlkjsadlk')}
          </Box>
          {touched && error && <span className="form__form-group-error">{error}</span>}
        </Box>
      </Box>
    </Box>
  );
}

FormikFileField.propTypes = {
  name: PropTypes.string.isRequired,
  onRemoveFile: PropTypes.func,
  fileBase64: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
};

FormikFileField.defaultProps = {
  fileBase64: '',
  disabled: false,
  multiple: false,
  className: 'col-md-6',
  accept: null,
  onChange: null,
  isRequired: false,
  label: '',
  onRemoveFile: () => {},
};

export default FormikFileField;
