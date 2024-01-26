import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { Grid, Stack } from '@mui/material';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';

import 'styles/form/form.scss';
import RenderFIlterInput from './RenderFIlterInput';

function RenderCustomInputs({
  updatedInitialValues,
  handleSubmit,
  customInputListValidationSchema,
  customFilterInputs,
  handleSubmitCustomFilter,
  handleClose,
}) {
  return (
    <Stack justifyContent="space-between" className="px-2">
      <Formik
        enableReinitialize
        initialValues={updatedInitialValues}
        onSubmit={handleSubmit}
        validationSchema={
          customInputListValidationSchema ||
          Yup.object({
            duration: Yup.string(),
          })
        }
      >
        {({ values }) => (
          <Form className="form " style={{ height: '100%' }}>
            <Grid height="100%">
              <Grid container item>
                {customFilterInputs.map(input => (
                  <Grid key={input?.name} item xs={input.fullWidth ? 12 : 6} width={100}>
                    <RenderFIlterInput values={values} input={input} />
                  </Grid>
                ))}
              </Grid>

              <FormSubmitButton
                clearButtonAction={({ values: formValues, ...rest }) => {
                  handleSubmitCustomFilter(
                    { duration: 'today' },
                    { ...rest },
                    handleClose,
                    customFilterInputs
                  );
                }}
                clearButtonTitle="Reset"
                showSaveAndContinue={false}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}
RenderCustomInputs.propTypes = {
  updatedInitialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  customInputListValidationSchema: PropTypes.object,
  customFilterInputs: PropTypes.array,
  handleSubmitCustomFilter: PropTypes.func,
  handleClose: PropTypes.func,
};
RenderCustomInputs.defaultProps = {
  updatedInitialValues: {},
  handleSubmit: () => {},
  customInputListValidationSchema: null,
  customFilterInputs: [],
  handleSubmitCustomFilter: () => {},
  handleClose: () => {},
};
export default RenderCustomInputs;
