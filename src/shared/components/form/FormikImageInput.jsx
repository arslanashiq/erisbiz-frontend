import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

function FormikImageInput(props) {
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
              style={{ height: 150 }}
              {...restProps}
              {...restFieldProps}
              type="file"
              accept="image/*"
              id={name}
              multiple={multiple}
              className={`${hasPreviewableImage || fileBase64 ? 'd-none' : 'd-auto'} inputfile inputfile-4`}
              onChange={event => {
                event.preventDefault();
                const target = multiple ? [...event.target.files] : event.target.files[0];

                setValue(target);
                if (onChange) onChange(target);
              }}
            />

            {/* Will preview only single image */}
            {(hasPreviewableImage || value) && (
              <Box className="border border-1">
                {hasPreviewableImage && (
                  <img
                    className="w-100"
                    src={URL.createObjectURL(value)}
                    alt=""
                    style={{ height: 140, objectFit: 'contain' }}
                  />
                )}
                <Box className="w-100 d-flex justify-content-between mt-2">
                  <label htmlFor={name} className="text-primary cursor-pointer">
                    Change Image
                  </label>
                  <DeleteIcon size={20} className="cursor-pointer" onClick={() => setValue('')} />
                </Box>
              </Box>
            )}

            {!hasPreviewableImage && fileBase64 && (
              <Box>
                <img className="h-100" src={fileBase64} alt="" />
                <Box className="w-100 d-flex justify-content-between mt-2">
                  <label htmlFor={name} className="text-primary cursor-pointer">
                    Change Image
                  </label>
                  <DeleteIcon size={20} className="cursor-pointer" onClick={onRemoveFile} />
                </Box>
              </Box>
            )}

            {!hasPreviewableImage && !fileBase64 && (
              <label className="input-file" htmlFor={name}>
                <figure>
                  <InsertDriveFileIcon className="input-file-icon" />
                </figure>
                <span>{multiple ? 'Choose Files' : (value && value.name) || 'Choose a file'}</span>
              </label>
            )}
          </Box>
          {touched && error && <span className="form__form-group-error">{error}</span>}
          {multiple && value.length > 0 && (
            <Box className="mt-5 d-flex flex-column">
              <h4 className="font-weight-bold">Selected Files</h4>
              <ul>
                {value.map(item => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

FormikImageInput.propTypes = {
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

FormikImageInput.defaultProps = {
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

export default FormikImageInput;
