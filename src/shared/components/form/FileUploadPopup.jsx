import React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderFileInputField from './FileInput';

const validate = values => {
  const errors = {};
  if (!values.doc_file)
    errors.doc_file = 'Please select file first then click on upload button';
  else if (values.doc_file.file.size > 1000000) {
    errors.doc_file = 'File should be less than or equal to 1 MB';
  }
  return errors;
};

const FileUploadPopup = props => {
  const { handleSubmit, toggle, valid } = props;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Field name="doc_file" component={renderFileInputField} />
      <ButtonToolbar className="center-align-btn-toolbar">
        <Button
          color="primary"
          type="submit"
          onClick={valid ? toggle : () => {}}
        >
          Upload
        </Button>
        <Button type="reset" onClick={toggle}>
          Cancel
        </Button>
      </ButtonToolbar>
    </form>
  );
};

FileUploadPopup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'FILE_UPLOAD', // a unique identifier for this form
  validate,
})(FileUploadPopup);
