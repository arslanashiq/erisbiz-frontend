import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { Button, Stack } from '@mui/material';
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';
import { useParams } from 'react-router';

function FormSubmitButton({ submitButtonTitle, clearButtonTitle, clearButtonAction }) {
  const { isSubmitting, resetForm, setFieldValue } = useFormikContext();
  const { id } = useParams();
  return (
    <>
      <ErrorFocus />

      <Stack spacing={2} direction="row">
        <Button type="submit" disabled={isSubmitting} color="primary">
          {isSubmitting ? 'Saving...' : submitButtonTitle || 'Save'}
        </Button>
        {!id && (
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => {
              setFieldValue('save_and_continue', true);
            }}
            color="secondary"
          >
            Save and Continue
          </Button>
        )}

        <Button
          color="secondary"
          onClick={() => {
            if (clearButtonAction) {
              clearButtonAction();
            }
            resetForm();
          }}
          disabled={isSubmitting}
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
