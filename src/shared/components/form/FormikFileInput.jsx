import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';

function FormikFileInput(props) {
  // added accept prop in field
  const { name, fileBase64, onRemoveFile, accept, className, multiple, onChange, ...restProps } = props;
  const [field, meta, helpers] = useField(props);
  const { value, onChange: onFieldValueChange, ...restFieldProps } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const hasPreviewableImage = value && !Array.isArray(value) && value.type.includes('image');

  return (
    <div className="form__form-group-input-wrap">
      <div className="text-center box">
        <input
          {...restProps}
          {...restFieldProps}
          type="file"
          id={name}
          accept={accept}
          multiple={multiple}
          className="inputfile inputfile-4"
          onChange={event => {
            event.preventDefault();
            const target = multiple ? [...event.target.files] : event.target.files[0];
            // eslint-disable-next-line no-param-reassign
            event.target.value = null;
            setValue(target);
            if (onChange) onChange(target);
          }}
        />

        {/* Will preview only single image */}
        {hasPreviewableImage && (
          <div>
            <img className="h-100" src={URL.createObjectURL(value)} alt="" />
            <div className="w-100 d-flex justify-content-between mt-2">
              <label htmlFor={name} className="text-primary cursor-pointer">
                Change Image
              </label>
              <DeleteIcon size={20} className="cursor-pointer" onClick={() => setValue(null)} />
            </div>
          </div>
        )}

        {!hasPreviewableImage && fileBase64 && (
          <div>
            <img className="h-100" src={fileBase64} alt="" />
            <div className="w-100 d-flex justify-content-between mt-2">
              <label htmlFor={name} className="text-primary cursor-pointer">
                Change Image
              </label>
              <DeleteIcon size={20} className="cursor-pointer" onClick={onRemoveFile} />
            </div>
          </div>
        )}

        {!hasPreviewableImage && !fileBase64 && (
          <label htmlFor={name}>
            <figure>
              <InsertDriveFileIcon size={100} />
            </figure>
            <span>{multiple ? 'Choose Files' : (value && value.name) || 'Choose a file'}</span>
          </label>
        )}
      </div>
      {touched && error && <span className="form__form-group-error">{error}</span>}
      {multiple && value.length > 0 && (
        <div className="mt-5 d-flex flex-column">
          <h4 className="font-weight-bold">Selected Files</h4>
          <ul>
            {value.map(item => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

FormikFileInput.propTypes = {
  name: PropTypes.string.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
  fileBase64: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func,
};

FormikFileInput.defaultProps = {
  fileBase64: '',
  disabled: false,
  multiple: false,
  className: '',
  accept: null,
  onChange: null,
};

export default FormikFileInput;
