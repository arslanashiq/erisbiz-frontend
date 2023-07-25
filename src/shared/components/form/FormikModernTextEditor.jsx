import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import TextEditor from '../text-editor/ModernTextEditor';

function FormikTextEditor({
  name,
  className = '',
  onChange = null,
  onBlur = null,
  disabled = false,
}) {
  const [field, meta, { setTouched, setValue }] = useField(name || '');

  const { value } = field;
  const { touched, error } = meta;

  const handleChange = editorState => {
    if (onChange) onChange(editorState);
  };

  const handleBlur = editorState => {
    setTouched(true);
    setValue(editorState);
    if (onBlur) onBlur(name, editorState);
  };

  const isErrorField = touched && error;

  return (
    <div className="form__form-group-input-wrap">
      <TextEditor
        wrapperClassName={`${isErrorField ? 'error-field' : ''} ${className}`}
        value={value}
        onChange={disabled ? undefined : handleChange}
        onBlur={handleBlur}
      />
      {touched && error && (
        <span className="form__form-group-error">{error}</span>
      )}
    </div>
  );
}

FormikTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

FormikTextEditor.defaultProps = {
  className: '',
  onChange: null,
  onBlur: null,
  disabled: false,
};

export default FormikTextEditor;
