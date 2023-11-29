import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { Button, Stack } from '@mui/material';
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';

function FormSubmitButton({ submitButtonTitle, clearButtonTitle, clearButtonAction }) {
  const { isSubmitting, resetForm } = useFormikContext();

  return (
    <>
      <ErrorFocus />

      <Stack spacing={2} direction="row">
        <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
          {isSubmitting ? 'Saving...' : submitButtonTitle || 'Save'}
        </Button>

        <Button
          color="secondary"
          onClick={() => {
            if (clearButtonAction) {
              clearButtonAction();
            }
            resetForm();
          }}
          disabled={isSubmitting}
          className="text-capitalize"
        >
          {clearButtonTitle}
        </Button>
      </Stack>
    </>
  );
}
FormSubmitButton.propTypes = {
  submitButtonTitle: PropTypes.string,
  clearButtonTitle: PropTypes.string,
  clearButtonAction: PropTypes.func,
};
FormSubmitButton.defaultProps = {
  submitButtonTitle: null,
  clearButtonTitle: 'Clear',
  clearButtonAction: null,
};
export default FormSubmitButton;
