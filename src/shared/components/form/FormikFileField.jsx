/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { Box, Button, Stack } from '@mui/material';
import FilePopup from 'shared/modals/filePopup';
import { convertURLToFile } from 'utilities/helpers';

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
    startIcon,
    isRequired,
    ...restProps
  } = props;
  const [openModal, setOpenModal] = useState({ open: false, files: [] });
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(name || '');
  const { value, onChange: onFieldValueChange, ...restFieldProps } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;
  const handleOpenModal = () => {
    setOpenModal({ ...openModal, open: true, files: value });
  };
  const handleCloseModal = () => {
    setOpenModal({ ...openModal, open: false });
  };

  const handleUploadFile = async file => {
    if (!file) return;
    const newFile = {
      doc_file: file,
      doc_type: file.type,
      doc_name: file.name,
      doc_size_bytes: file.size,
    };
    const newValues = [...value, newFile];
    setValue(newValues);
    setFieldValue('filesList', [...newValues]);
  };
  const handleConvertLinkToFile = async () => {
    if (!value) return;
    const valuesList = [...value];
    for (let i = 0; i < valuesList.length; i += 1) {
      const currentFile = { ...value[i] };
      if (currentFile.doc_file && typeof currentFile.doc_file === 'string') {
        const file = await convertURLToFile(currentFile.doc_file);
        const newValue = { ...currentFile, doc_file: file };
        valuesList[i] = newValue;
        setFieldValue('filesList', [...valuesList]);
      }
    }
  };
  const handleDeleteFile = (deleteFile, index) => {
    const newList = [...value];
    newList.splice(index, 1);
    setValue([...newList]);
  };
  useEffect(() => {
    handleConvertLinkToFile();
  }, [value]);

  return (
    <Box className={`form__form-group ${className}`}>
      <FilePopup
        open={openModal.open}
        handleClose={handleCloseModal}
        files={value}
        handleUploadFile={handleUploadFile}
        handleDeleteFile={handleDeleteFile}
      />
      <span className={`form__form-group-label col-lg-3 ${isRequired ? 'required' : ''}`}>{label}</span>
      <Box className="form__form-group-field">
        {startIcon && <div className="form__form-group-icon cursor-pointer">{startIcon}</div>}
        <Box className="form__form-group-input-wrap">
          <Box className="text-center box">
            <input
              {...restProps}
              {...restFieldProps}
              type="file"
              id={name}
              accept={accept}
              multiple
              className={`${value && value.length > 0 ? 'd-none' : 'd-auto'} inputfile inputfile-4`}
              onChange={event => {
                event.preventDefault();
                const target = [...event.target.files];
                setValue(target);
                handleUploadFile(target[0]);
                if (onChange) onChange(target);
                // eslint-disable-next-line no-param-reassign
                event.target.value = null;
              }}
            />
            {value && value.length > 0 && (
              <Stack className="border border-1" sx={{ height: 34, width: '100%', textAlign: 'start' }}>
                <Button variant="text" onClick={handleOpenModal}>
                  View Files
                </Button>
              </Stack>
            )}
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
  startIcon: PropTypes.element,
};

FormikFileField.defaultProps = {
  fileBase64: '',
  disabled: false,
  multiple: true,
  className: 'col-md-6',
  accept: null,
  onChange: null,
  isRequired: false,
  label: '',
  startIcon: null,
  onRemoveFile: () => {},
};

export default FormikFileField;
