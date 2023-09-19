import React from 'react';
import { useFormikContext } from 'formik';
import { Button, Stack } from '@mui/material';
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';

function FormSubmitButton() {
  const { isSubmitting, resetForm } = useFormikContext();

  return (
    <>
      <ErrorFocus />

      <Stack spacing={2} direction="row">
        <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>

        <Button
          color="secondary"
          onClick={() => resetForm()}
          disabled={isSubmitting}
          className="text-capitalize"
        >
          Clear
        </Button>
      </Stack>
    </>
  );
}

export default FormSubmitButton;
